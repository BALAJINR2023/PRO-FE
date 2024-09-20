import axios from 'axios';
import { Url } from './constants';
// Function to update user data
export const updateUser = async (userEmail, data) => {
  try {
    const response = await axios.put(`${Url}/users/${userEmail}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'), // Assuming you're using token-based auth
      },
    });

    if (response.status !== 200 && response.status !== 204) {
      throw new Error('Failed to update user');
    }

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
};
export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${Url}/users/profile`, {
      headers: {
        'Authorization': localStorage.getItem('token'), // Assuming you're using token-based auth
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to fetch user profile');
    }

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
};