import axios from 'axios';
import { Url } from './constants';
const addCar = async (carData) => {
    try {
      const response = await axios.post(`${Url}/cars`, carData);
      return response.data;
    } catch (error) {
      throw new Error('Error adding car: ' + error.message);
    }
  };
 const listCar = async () => {
    try {
      const response = await axios.get(`${Url}/cars`);
      return response.data;
    } catch (error) {
      throw new Error('Error adding car: ' + error.message);
    }
  };
  const hostCar = async (useremail) => {
    try {
      const response = await axios.post(`${Url}/cars/host`, { useremail });
      return response.data;
    } catch (error) {
      throw new Error('Error adding car: ' + error.message);
    }
  };
  const deleteCar = async (carId) => {
    try {
      const response = await axios.delete(`${Url}/cars/${carId}`);
      return response.data; // Return the response message
    } catch (error) {
      throw new Error('Error deleting car: ' + error.message);
    }
  };
  export { addCar,listCar,deleteCar,hostCar};
 
