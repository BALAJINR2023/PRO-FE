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
  export { addCar, listCar};
 
