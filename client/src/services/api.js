// services/api.js
const API_URL = 'http://thehomehobby.cresqqqksbzc.us-east-2.rds.amazonaws.com:3306';

export const getProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/your-endpoint-for-products`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
