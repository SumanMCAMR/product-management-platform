import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    withXSRFToken: true
});

api.interceptors.request.use(async (config) => {
    const needsCSRF = ['post', 'put', 'delete'].includes(config.method ?? '');
    if (needsCSRF) {
        await api.get('/sanctum/csrf-cookie');
    }
    return config;
});


export default api
