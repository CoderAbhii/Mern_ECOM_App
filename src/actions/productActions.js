import axios from 'axios'
import {
    ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstants'

const BASE_URL = "http://localhost:6550"
export const getProducts = (keyword = "", currentPage = 1, price = [0, 10000000], category, ratings = 0) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });

        const siteURL = category.length === 0 ? await axios.get(`${BASE_URL}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings=${ratings}`) : await axios.get(`${BASE_URL}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings=${ratings}`)

        const { data } = siteURL;
        console.log(data);
        
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.errorMessage
        })
    }
};

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        const { data } = await axios.get(`${BASE_URL}/api/v1/product/detail/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })
    } catch (error) {
        console.log(error.response.data.errorMessage);
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.errorMessage
        })
    }
};

/**
 * @DESC For clearing errors
 */
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}