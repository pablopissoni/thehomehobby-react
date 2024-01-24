// actions/productActions.js
import { getProducts } from '../components/services/api';

export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';

export const fetchProducts = () => async (dispatch) => {
  try {
    const products = await getProducts();
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: products });
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};
