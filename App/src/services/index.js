import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://34.204.116.162:3050/'
    baseURL: 'http://192.168.1.6:3000/'
});

export default api;