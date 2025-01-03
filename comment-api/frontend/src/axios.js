import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000'
});

// 요청 인터셉터
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터 (토큰 만료 처리)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // 토큰이 만료되었고, 재시도하지 않았던 요청인 경우
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axios.post('/api/token/refresh/', {
                    refresh: refreshToken
                });

                const { access } = response.data;
                localStorage.setItem('accessToken', access);

                // 새로운 토큰으로 원래 요청 재시도
                originalRequest.headers.Authorization = `Bearer ${access}`;
                return api(originalRequest);
            } catch (error) {
                // 리프레시 토큰도 만료된 경우
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default api;