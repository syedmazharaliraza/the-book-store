import {
  PRODUCT_LIST_FAILED,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILED,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_FAILED,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILED,
  PRODUCT_ADD_REVIEW_REQUEST,
  PRODUCT_ADD_REVIEW_SUCCESS,
  PRODUCT_ADD_REVIEW_FAILED,
} from "../constants/productConstants";

import {
  PRODUCT_DETAILS_FAILED,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
} from "../constants/productConstants";

import axios from "axios";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const resp = await axios.get("/api/products");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: resp.data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAILED,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const listProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const resp = await axios.get(`/api/products/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: resp.data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAILED,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    await axios.delete(`/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    });
    dispatch({ type: DELETE_PRODUCT_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAILED,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    const resp = await axios.post(
      `/api/products/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      }
    );
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: resp.data });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAILED,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const updateProduct = (id, product) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    const resp = await axios.put(`/api/products/${id}`, product, {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    });
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: resp.data });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAILED,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const addReviewToProduct =
  (id, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_ADD_REVIEW_REQUEST });
      await axios.put(`/api/products/${id}/review`, review, {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      });
      dispatch({ type: PRODUCT_ADD_REVIEW_SUCCESS });
    } catch (error) {
      dispatch({
        type: PRODUCT_ADD_REVIEW_FAILED,
        payload: error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };
