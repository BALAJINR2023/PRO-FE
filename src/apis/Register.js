import axios from 'axios';
import { Url } from './constants'; // Make sure this is correctly defined

const userSignup = async (userData) => {
    try {
        const response = await axios.post(`${Url}/register`, userData, {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error during user signup:', error.response?.data || error.message);
        return { error: error.response?.data?.error || error.message }; // Return error for the frontend
    }
};

export { userSignup };
