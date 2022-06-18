import {
  CREATE_PRODUCT_FAILED,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_RESET,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILED,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  PRODUCT_ADD_REVIEW_FAILED,
  PRODUCT_ADD_REVIEW_REQUEST,
  PRODUCT_ADD_REVIEW_RESET,
  PRODUCT_ADD_REVIEW_SUCCESS,
  PRODUCT_LIST_FAILED,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  UPDATE_PRODUCT_FAILED,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_SUCCESS,
} from "../constants/productConstants";

import {
  PRODUCT_DETAILS_FAILED,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
} from "../constants/productConstants";

export const productListReducer = (
  state = { loading: false, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };

    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };

    case PRODUCT_LIST_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { loading: true, product: {} },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };

    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };

    case PRODUCT_DETAILS_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return { loading: true };

    case DELETE_PRODUCT_SUCCESS:
      return { loading: false, success: true };

    case DELETE_PRODUCT_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return { loading: true };

    case CREATE_PRODUCT_SUCCESS:
      return { loading: false, success: true, product: action.payload };

    case CREATE_PRODUCT_FAILED:
      return { loading: false, error: action.payload };

    case CREATE_PRODUCT_RESET:
      return {};

    default:
      return state;
  }
};

export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return { loading: true };

    case UPDATE_PRODUCT_SUCCESS:
      return { loading: false, success: true, product: action.payload };

    case UPDATE_PRODUCT_FAILED:
      return { loading: false, error: action.payload };

    case UPDATE_PRODUCT_RESET:
      return {};

    default:
      return state;
  }
};

export const productAddReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_ADD_REVIEW_REQUEST:
      return { loading: true };

    case PRODUCT_ADD_REVIEW_SUCCESS:
      return { loading: false, success: true };

    case PRODUCT_ADD_REVIEW_FAILED:
      return { loading: false, error: action.payload };

    case PRODUCT_ADD_REVIEW_RESET:
      return {};

    default:
      return state;
  }
};
