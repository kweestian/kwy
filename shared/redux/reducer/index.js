import { combineReducers } from 'redux';
import post from './apiReducer';
import auth from './authReducer';
import notificationReducer from './notifReducer';
import chargeReducer from './chargeReducer';
import cart, * as fromCart from './cartReducer';
import products, * as fromProducts from './productReducer';
import contactFormReducer from './contactFormReducer';

export default combineReducers({
  post,
  auth,
  chargeReducer,
  notificationReducer,
  contactFormReducer,
  products,
  cart,
})


function getAddedIds(state) {
  return fromCart.getAddedIds(state.cart)
}

function getQuantity(state, id) {
  return fromCart.getQuantity(state.cart, id)
}

function getProduct(state, id) {
  return fromProducts.getProduct(state.products, id)
}

export function getTotal(state) {
  return getAddedIds(state).reduce((total, id) =>
    total + getProduct(state, id).price * getQuantity(state, id),
    0
  ).toFixed(2)
}

export function getCartProducts(state) {
  return getAddedIds(state).map(id => Object.assign(
    {},
    getProduct(state, id),
    {
      quantity: getQuantity(state, id)
    }
  ))
}
