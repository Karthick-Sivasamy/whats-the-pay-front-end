import axios from 'axios';
import Cookies from 'universal-cookie';

export const ApiService = () => {
  const token = new Cookies().get('whats-the-pay-token');
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${token || undefined}`
    }
  });
};
