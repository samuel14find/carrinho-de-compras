export const ADD_TO_CART = 'ADD_TO_CART';
//Action Creator
export const addToCart = product => ({
  type: ADD_TO_CART,
  product
});