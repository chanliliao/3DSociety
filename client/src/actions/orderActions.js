import axios from 'axios';
import {
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_SUCCESS,
} from '../constants/orderTypes';
import { CART_CLEAR_ITEMS } from '../constants/cartTypes';
import { logout } from './userActions';

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    // grab user token
    const {
      userStates: { userCurrent },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userCurrent.token}`,
      },
    };

    // request data with token
    const { data } = await axios.post(`/api/orders/`, order, config);

    // send the data and clear cart
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    dispatch({ type: CART_CLEAR_ITEMS });
    localStorage.removeItem('cartItems');
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
    // grab user token
    const {
      userStates: { userCurrent },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userCurrent.token}`,
      },
    };
    // request data with token
    const { data } = await axios.get(`/api/orders/${id}`, config);

    // send data
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      // grab user token
      const {
        userStates: { userCurrent },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userCurrent.token}`,
        },
      };
      // request data
      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );
      // send data
      dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    // grab user token
    const {
      userStates: { userCurrent },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userCurrent.token}`,
      },
    };
    // request data
    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver`,
      // not sending data
      {},
      config
    );
    // send data
    dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    // grab user token
    const {
      userStates: { userCurrent },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userCurrent.token}`,
      },
    };
    // request data
    const { data } = await axios.get(`/api/orders/myorders`, config);
    // send data
    dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listOrders = () => async (dispatch, getState) => {
  try {
    // grab user token
    const {
      userStates: { userCurrent },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userCurrent.token}`,
      },
    };
    // request data
    const { data } = await axios.get('/api/orders', config);
    // send data
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
