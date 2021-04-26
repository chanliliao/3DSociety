import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  // USER_DETAILS_REQUEST,
  // USER_DETAILS_SUCCESS,
  // USER_DETAILS_FAIL,
  // USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  // USER_LIST_REQUEST,
  // USER_LIST_SUCCESS,
  // USER_LIST_FAIL,
  // USER_LIST_RESET,
  // USER_DELETE_REQUEST,
  // USER_DELETE_SUCCESS,
  // USER_DELETE_FAIL,
  // USER_UPDATE_REQUEST,
  // USER_UPDATE_SUCCESS,
  // USER_UPDATE_FAIL,
} from '../constants/userTypes';
// import { ORDER_LIST_MY_RESET } from '../constants/orderTypes';
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  try {
    // send data type
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/login',
      {
        email,
        password,
      },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userCurrent', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem('userCurrent');
  dispatch({ type: USER_LOGOUT });
  // dispatch({ type: USER_DETAILS_RESET });
  // dispatch({ type: USER_LIST_RESET });
  // dispatch({ type: ORDER_LIST_MY_RESET });
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users',
      {
        name,
        email,
        password,
      },
      config
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userCurrent', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    const {
      users: { userCurrent },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userCurrent.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });

    localStorage.setItem('userCurrent', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const getUserDetails = (id) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: USER_DETAILS_REQUEST });

//     const {
//       userLogin: { userCurrent },
//     } = getState();

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${userCurrent.token}`,
//       },
//     };

//     const { data } = await axios.get(`/api/users/${id}`, config);

//     dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: USER_DETAILS_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };
