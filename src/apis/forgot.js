import axios from 'axios';
import { Url } from './constants';

export const forgotPassword = async (email) => {
    try {
        const response = await axios.post(`${Url}/forgot-password`, { email });
        return response.data;
    } catch (error) {
        console.error('Forgot password error:', error.response?.data || error.message);
        return { error: error.response?.data || 'Forgot password failed. Please try again.' };
    }
};