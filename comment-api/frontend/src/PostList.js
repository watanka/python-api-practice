import React, { useState, useEffect } from 'react';
import { getPosts } from './posts';
import { Link, useNavigate } from 'react-router-dom';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    }

    const fetchPosts = async () => {
        
        try {
        const data = await getPosts();
        console.log('API 응답 데이터', data);
        setPosts(Array.isArray(data) ? data : []);
        } catch (error) {
        console.error('Failed to fetch posts:', error);
        setPosts([]);
        } 
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div>
        <h1>게시글 목록</h1>
        <div className="posts-container">
            <Link to="/posts/create" className="create-post-button">게시글 작성</Link>
            {posts && posts.length > 0 ? (
                posts.map((post) => (
                <div key={post.id} className="post-card">
                    <div className="post-header">
                        <p className="post-title"><a href={`/posts/${post.id}`}>{post.title}</a></p>
                        <span className="post-date">{formatDate(post.created_at)}</span>
                    </div>
                </div>
                ))
            ) : (
                <p>게시글이 없습니다.</p>
            )}
            </div>
        </div>
    );
    };

export default PostList;