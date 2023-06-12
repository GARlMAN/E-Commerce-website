import axios from "axios";
const apiBaseUrl = 'https://your-backend-api-url.com'; // Replace with the correct base URL for your backend API

const instance = axios.create({
    url : apiBaseUrl,
});

export default instance;