import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://goalsmanager-api.onrender.com/',
});

