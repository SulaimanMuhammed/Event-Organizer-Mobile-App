import { combineReducers } from "redux";
import {
  LOGIN,
  REGISTER,
  ADD_ARRAY,
  UPDATE_ORDER,
  LOGOUT,
  CANCEL_ORDER,
} from "./Types";

export const login = (username, password) => ({
  type: LOGIN,
  payload: { username, password },
});
export const logout = (username, email, phone) => ({
  type: LOGOUT,
  payload: { username, email, phone },
});

export const register = (username, email, phone) => ({
  type: REGISTER,
  payload: { username, email, phone },
});
export const addArray = (array) => {
  return {
    type: ADD_ARRAY,
    payload: array,
  };
};

export const addOrder = (order) => {
  return {
    type: UPDATE_ORDER,
    payload: order,
  };
};
export const cancelOrder = () => ({
  type: CANCEL_ORDER,
});

const initialState = {
  cart: [],
  userInfo: null,
  arrayOfArrays: [],
  order: null,
};

const userReducer = (state = initialState.userInfo, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        username: action.payload.username,
        email: action.payload.email,
        //password: action.payload.password,
        phone: action.payload.phone,
      };
    case LOGOUT:
      return null;
    case REGISTER:
      // console.log("User data successfully stored in Redux:", state);
      return {
        ...state,
        username: action.payload.username,
        email: action.payload.email,
        // password: action.payload.password,
        phone: action.payload.phone,
      };
    default:
      return state;
  }
};
const orderReducer = (state = initialState.order, action) => {
  switch (action.type) {
    case UPDATE_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case CANCEL_ORDER:
      return null;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  order: orderReducer,
  userInfo: userReducer,
});

export default rootReducer;
