import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_RESET,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_RESET,
  // ORDER_LIST_FAIL,
  // ORDER_LIST_SUCCESS,
  // ORDER_LIST_REQUEST,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_RESET,
  ORDER_CREATE_RESET,
} from '../constants/orderTypes';

const initialState = {
  order: [],
  orderlist: [],
  orderError: null,
  orderCreated: false,
  orderPaid: false,
  orderDelivered: false,
  orderLoading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // create order
    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        orderLoading: false,
        orderCreated: true,
        order: action.payload,
      };
    case ORDER_CREATE_FAIL:
      return {
        orderLoading: false,
        orderError: action.payload,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        orderLoading: false,
        order: action.payload,
      };
    case ORDER_DETAILS_FAIL:
      return {
        orderLoading: false,
        orderError: action.payload,
      };
    case ORDER_PAY_SUCCESS:
      return {
        ...state,
        orderLoading: false,
        orderPaid: true,
      };
    case ORDER_PAY_FAIL:
      return {
        orderLoading: false,
        orderError: action.payload,
      };
    // case ORDER_PAY_RESET:
    //   return {};
    // get order list
    case ORDER_LIST_MY_SUCCESS:
      return {
        ...state,
        orderLoading: false,
        orders: action.payload,
      };
    case ORDER_LIST_MY_FAIL:
      return {
        orderLoading: false,
        orderError: action.payload,
      };
    // deliver orders
    case ORDER_DELIVER_SUCCESS:
      return {
        ...state,
        orderLoading: false,
        orderDelivered: true,
      };
    case ORDER_DELIVER_FAIL:
      return {
        orderLoading: false,
        orderError: action.payload,
      };

    default:
      return state;
  }
};
