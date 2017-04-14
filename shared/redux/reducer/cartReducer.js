import { combineReducers } from 'redux'
import { RECEIVE_PRODUCTS, ADD_TO_CART, CHECKOUT_REQUEST, CHECKOUT_SUCCESS, CHECKOUT_FAILURE, REMOVE_FROM_CART, CLEAR_CART } from '../constants/constants'

const initialState = {
  addedIds: [],
  quantityById: {},
  isProceedCheckout: false,
}

function addedIds(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      if (state.indexOf(action.productId) !== -1) {
        return state
      }
      return [ ...state, action.productId ]
    case REMOVE_FROM_CART:
      if (action.quantity === 1) {
        const indexOfProductId = state.indexOf(action.productId)
        return [
          ...state.slice(0, indexOfProductId),
          ...state.slice(indexOfProductId+1)
        ]
      }
      return state
    case CLEAR_CART:
      return []
    default:
      return state
  }
}

function quantityById(state = initialState.quantityById, action) {
  const { productId } = action
  switch (action.type) {
    case ADD_TO_CART:
      return Object.assign({}, state, {
        [productId]: (state[productId] || 0) + 1
      })
    case REMOVE_FROM_CART:
      return Object.assign({}, state, {
        [productId]: (state[productId] || 0) - 1
      })
    case CLEAR_CART:
      return []
    default:
      return state
  }
}

export default function cart(state = initialState, action) {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return {
        ...state,
        isProceedCheckout: true,
      }
    case CHECKOUT_FAILURE:
      return action.cart
    default:
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action)
      }
  }
}

export function getQuantity(state, productId) {
  return state.quantityById[productId] || 0
}

export function getAddedIds(state) {
  return state.addedIds
}
