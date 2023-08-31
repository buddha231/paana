import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:8000/api/',
    // baseURL: 'https://webapp231.pythonanywhere.com/api/',
    baseURL: 'http://localhost:8000/',
});

export default axiosInstance
