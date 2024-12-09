import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your backend's base URL
  timeout: 10000, // Optional: Set a timeout for requests (10 seconds)
});

// Add a request interceptor (optional)
api.interceptors.request.use(
  (config) => {
    // You can add authorization headers or modify the config here
    // Example: Add a token to headers if needed
    // config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor (optional)
api.interceptors.response.use(
  (response) => {
    return response.data; // Return only the data from the response
  },
  (error) => {
    // Handle errors globally
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
