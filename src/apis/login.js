import axios from 'axios';
import { Url } from './constants'; // Ensure 'Url' is set to your backend API URL

// Login function
const userSignIn = async (userData) => {
    try {
        // Make the login request
        const response = await axios.post(`${Url}/login`, userData, {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
        });

        // If login is successful and token is received
        if (response.data.token) {
            // Store the token in localStorage
            localStorage.setItem('token', response.data.token);  
        }

        return response.data;  // Return success data (e.g., user info, token) to the frontend
    } catch (error) {
        console.error('Error during user login:', error.response?.data || error.message);
        return { error: error.response?.data?.error || error.message };  // Return error message
    }
};

// Function to get token from localStorage and set it in Axios headers for future requests
const setAuthToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
        // Set the Authorization header for future Axios requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        // If no token exists, remove the Authorization header
        delete axios.defaults.headers.common['Authorization'];
    }
};

export { userSignIn, setAuthToken };