import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://task-manager-api-r6zi.onrender.com/',
    baseURL: 'http://localhost:5000/',
});

