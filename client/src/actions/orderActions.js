import axios from 'axios';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  // ORDER_PAY_REQUEST,
  // ORDER_PAY_FAIL,
  // ORDER_PAY_SUCCESS,
  // ORDER_LIST_MY_REQUEST,
  // ORDER_LIST_MY_SUCCESS,
  // ORDER_LIST_MY_FAIL,
  // ORDER_LIST_FAIL,
  // ORDER_LIST_SUCCESS,
  // ORDER_LIST_REQUEST,
  // ORDER_DELIVER_FAIL,
  // ORDER_DELIVER_SUCCESS,
  // ORDER_DELIVER_REQUEST,
  // ORDER_DELIVER_RESET,
  // ORDER_CREATE_RESET,
} from '../constants/orderTypes';

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const {
      users: { userCurrent },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userCurrent.token}`,
      },
    };

    const { data } = await axios.post(`/api/orders/`, order, config);

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const {
      users: { userCurrent },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userCurrent.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};