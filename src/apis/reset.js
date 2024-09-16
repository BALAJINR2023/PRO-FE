import axios from 'axios';
import { Url } from './constants';

export const resetPassword = async (token, newPassword) => {
    try {
        const response = await axios.post(`${Url}/reset-password`, { token, newPassword });
        return response.data;
    } catch (error) {
        console.error('Reset password error:', error.response?.data || error.message);
        return { error: error.response?.data || 'Reset password failed. Please try again.' };
    }
};