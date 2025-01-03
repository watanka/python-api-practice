import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const getPosts = async () => {
    try {
        const response = await axios.get(`${API_URL}/posts/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

export const getPost = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/posts/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching post:', error);
        throw error;
    }
};

export const createPost = async (postData) => {
    try {
        const response = await axios.post(`${API_URL}/posts/`, postData);
        return response.data;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};
