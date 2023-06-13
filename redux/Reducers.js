// import { combineReducers } from 'redux';

// const initialState = {
//   currentPage: 'Home',
//   cartItems: [],
//   totalPrice: 0,
// };

// const currentPageReducer = (state = initialState.currentPage, action) => {
//   switch (action.type) {
//     case 'SET_CURRENT_PAGE':
//       return action.payload;
//     default:
//       return state;
//   }
// };

// const cartItemsReducer = (state = initialState.cartItems, action) => {
//   switch (action.type) {
//     case 'ADD_TO_CART':
//       return [...state, action.payload];
//     case 'REMOVE_FROM_CART':
//       return state.filter(item => item.id !== action.payload.id);
//     default:
//       return state;
//   }
// };

// const totalPriceReducer = (state = initialState.totalPrice, action) => {
//   switch (action.type) {
//     case 'ADD_TO_CART':
//       return state + action.payload.price;
//     case 'REMOVE_FROM_CART':
//       return state - action.payload.price;
//     default:
//       return state;
//   }
// };

// const rootReducer = combineReducers({
//   currentPage: currentPageReducer,
//   cartItems: cartItemsReducer,
//   totalPrice: totalPriceReducer,
// });

// export default rootReducer;

