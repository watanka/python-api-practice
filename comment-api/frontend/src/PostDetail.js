import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from './posts';

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try{
                const data = await getPost(id);
                setPost(data);
            } catch (error) {
                console.error('Failed to fetch post:', error);
            }
        };
        fetchPost();
    }, [id]);
    if (!post) return <div>Loading...</div>;

    return (
        <div>
            <h1>{post.title}</h1>
            <div>
                <p>{post.content}</p>
            </div>
        </div>
    );
}

export default PostDetail;