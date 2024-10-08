import axios from 'axios';

const axiosClient = axios.create({
     baseURL:`http://localhost:8080/`
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('TOKEN');
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('TOKEN');
            window.location.href = '/login';
        }
        
        return Promise.reject(error);
    }
);

export default axiosClient;