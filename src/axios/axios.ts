import axios from 'axios';

const path = axios.create({
    baseURL: import.meta.env.VITE_NEST_API_URL,
});

path.interceptors.request.use(
    function(config) {
        config.headers['Content-Type'] = 'multipart/form-data';
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    function(err) {
        return Promise.reject(err);
    }
);

export default path;