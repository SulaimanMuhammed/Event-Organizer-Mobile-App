import { combineReducers } from "redux";
import {
  INCREASE_COUNTER,
  DECREASE_COUNTER,
  SHOW_INTRO,
  SET_CHECKED_ITEM,
  SET_TOTAL,
  LOGIN,
  REGISTER,
  ADD_ARRAY,
  CLEAR_ARRAYS,
} from "./Types";

export const increaseCounter = () => {
  return { type: INCREASE_COUNTER };
};

export const decreaseCounter = () => {
  return { type: DECREASE_COUNTER };
};

export const showIntro = () => ({
  type: SHOW_INTRO,
});

// export const setCheckedItem = (item) => ({
//   type: SET_CHECKED_ITEM,
//   payload:  item ,
// });

export const setTotal = (itemId, quantity) => ({
  type: SET_TOTAL,
  payload: { itemId, quantity },
});

export const login = (username, password) => ({
  type: LOGIN,
  payload: { username, password },
});

export const register = (username, email, password) => ({
  type: REGISTER,
  payload: { username, email, password },
});
export const addArray = (array) => {
  return {
    type: ADD_ARRAY,
    payload: array,
  };
};

export const clearArrays = () => {
  return {
    type: CLEAR_ARRAYS,
  };
};

const initialState = {
  currentPage: "Home",
  cartItems: [],
  totalPrice: 0,
  counter: 0,
  showIntro: false,
  checkedItems: [],
  cart: [],
  userInfo: null,
  arrayOfArrays: [],
};

const currentPageReducer = (state = initialState.currentPage, action) => {
  switch (action.type) {
    case "SET_CURRENT_PAGE":
      return action.payload;
    default:
      return state;
  }
};

const cartItemsReducer = (state = initialState.cartItems, action) => {
  switch (action.type) {
    case "CART_ITEM":
      const { itemId, quantity, price, name } = action.payload;
      const newCheckedItems = {
        ...state.checkedItems,
        [itemId]: { quantity, price, name },
      };
      return { ...state, checkedItems: newCheckedItems };
    default:
      return state;
  }
};

const totalPriceReducer = (state = initialState.totalPrice, action) => {
  switch (action.type) {
    case SET_TOTAL:
      const { itemId, quantity } = action.payload;
      const itemPrice = state[itemId].price;
      return { ...state, totalPrice: state.totalPrice + itemPrice * quantity };
    default:
      return state;
  }
};

const counterReducer = (state = initialState.counter, action) => {
  switch (action.type) {
    case INCREASE_COUNTER:
      return state + 1;
    case DECREASE_COUNTER:
      return state - 1;
    default:
      return state;
  }
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
        return {
          ...state,
          total: state.total + item.price,
        };
      } else {
        const newItem = {
          ...item,
          quantity: 1,
        };
        return {
          ...state,
          items: [...state.items, newItem],
          total: state.total + item.price,
        };
      }
    case "REMOVE_FROM_CART":
      const itemId = action.payload;
      const itemToRemove = state.items.find((i) => i.id === itemId);
      if (itemToRemove.quantity === 1) {
        return {
          ...state,
          items: state.items.filter((i) => i.id !== itemId),
          total: state.total - itemToRemove.price,
        };
      } else {
        itemToRemove.quantity -= 1;
        return {
          ...state,
          items: [...state.items],
          total: state.total - itemToRemove.price,
        };
      }
    default:
      return state;
  }
};

const showIntroReducer = (state = initialState.showIntro, action) => {
  switch (action.type) {
    case SHOW_INTRO:
      return !state;
    default:
      return state;
  }
};

const checkedItemsReducer = (state = initialState.checkedItems, action) => {
  switch (action.type) {
    case SET_CHECKED_ITEM:
      const { itemId, quantity, price, name } = action.payload;
      const newCheckedItems = { ...state, [itemId]: { quantity, price, name } };
      return newCheckedItems;
    default:
      return state;
  }
};

const userReducer = (state = initialState.userInfo, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
      };
    case "LOGOUT":
      return {
        ...state,
        username: null,
        password: null,
      };
    case REGISTER:
      // console.log("User data successfully stored in Redux:", state);
      return {
        ...state,
        username: action.payload.username,
        email: action.payload.email,
        password: action.payload.password,
      };
    default:
      return state;
  }
};
const setCheckedItem = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ARRAY:
      const newArray = action.payload;
      const newArrayOfArrays = [...state.arrayOfArrays, newArray];
      // console.log("added", newArrayOfArrays)
      return {
        ...state,
        arrayOfArrays: newArrayOfArrays,
      };
    case CLEAR_ARRAYS:
      return {
        ...state,
        arrayOfArrays: [],
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  currentPage: currentPageReducer,
  cartItems: cartItemsReducer,
  totalPrice: totalPriceReducer,
  counter: counterReducer,
  cart: cartReducer,
  showIntro: showIntroReducer,
  checkedItems: checkedItemsReducer,
  userInfo: userReducer,
  arrayOfArrays: setCheckedItem,
});

export default rootReducer;
