import { combineReducers } from 'redux'
import { ADD_PRODUCTS, ADD_TO_CART } from '../constants/constants'
import _ from 'underscore'

function products(state, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        products: action.products
      }
    default:
      return state
  }
}

function byId(state = {}, action) {
  switch (action.type) {
    case ADD_PRODUCTS:
      return {
        ...state,
        products: action.products
      }
    default:
      return state
  }
}

function visibleIds(state = [], action) {
  switch (action.type) {
    case ADD_PRODUCTS:
      return action.products.map(product => product._id)
    default:
      return state
  }
}

export default combineReducers({
  byId,
  visibleIds
})

export function getProduct(state, id) {
  return _.findWhere(state.byId.products, {_id: id})
}

export function getVisibleProducts(state) {
  return state.visibleIds.map(id => getProduct(state, id))
}
