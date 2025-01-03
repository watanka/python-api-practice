import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from './posts';

const PostCreate = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',  
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createPost(formData);
            navigate('/');
        } catch (error) {
            console.error('Failed to create post:', error);
        }
    };

    return (
        <div>
            <h1>게시글 작성</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">제목</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="content">내용</label>
                    <textarea id="content" name="content" value={formData.content} onChange={handleChange} required />
                </div>
                <div className="form-actions">
                    <button type="submit">게시글 작성</button>
                    <button type="button" onClick={() => navigate('/')}>취소</button>
                </div>
            </form>
        </div>
    );
};

export default PostCreate;