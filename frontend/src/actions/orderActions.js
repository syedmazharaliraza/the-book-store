import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  MYORDERS_DETAILS_REQUEST,
  MYORDERS_DETAILS_SUCCESS,
  MYORDERS_DETAILS_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
} from "../constants/orderConstants";
import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });
    const resp = await axios.post("/api/orders", order, {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: resp.data });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const resp = await axios.get(`/api/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: resp.data });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST });
    const resp = await axios.put(`/api/orders/${id}/pay`, paymentResult, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_PAY_SUCCESS, payload: resp.data });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const getMyOrderDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MYORDERS_DETAILS_REQUEST });
    const resp = await axios.get(`/api/orders/myorders`, {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    });
    dispatch({ type: MYORDERS_DETAILS_SUCCESS, payload: resp.data });
  } catch (error) {
    dispatch({
      type: MYORDERS_DETAILS_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const resp = await axios.get(`/api/orders/`, {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_LIST_SUCCESS, payload: resp.data });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const deliverOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELIVER_REQUEST });
    await axios.put(
      `/api/orders/${id}/deliver`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      }
    );
    dispatch({ type: ORDER_DELIVER_SUCCESS });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
