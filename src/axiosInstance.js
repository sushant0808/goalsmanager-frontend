

const axiosInstance = axios.create({
    baseURL: 'https://goalsmanager-api.onrender.com/',
});

module.exports = {
    axiosInstance,
}