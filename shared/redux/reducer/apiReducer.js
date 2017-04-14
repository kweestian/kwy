import * as ActionTypes from '../constants/constants';

const initialState = { posts: [], selectedPost: null, purchaseOrders: [], selectedPurchaseOrder: null };

const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_POST :
      return {
        posts: [{
          firstName: action.firstName,
          lastName: action.lastName,
          message: action.message,
          amount: action.amount,
          anonymous: action.anonymous,
          slug: action.slug,
          cuid: action.cuid,
          _id: action._id,
        }].concat(state.posts),
        post: state.post,
      };

    case ActionTypes.CHANGE_SELECTED_POST :
      return {
        posts: state.posts,
        post: action.slug,
      };

    case ActionTypes.GET_POSTS :
      let sum = 0;
      action.posts.forEach((val) => {
        sum += parseInt(val.amount, 10);
      });
      return {
        posts: action.posts,
        post: state.post,
        sum,
      };

    case ActionTypes.ADD_SELECTED_POST :
      return {
        post: action.post,
        posts: state.posts,
      };

    case ActionTypes.DELETE_POST :
      return {
        posts: state.posts.filter((post) => post._id !== action.post._id),
      };

    case ActionTypes.ADD_PURCHASE_ORDER :
      return {
        purchaseOrders: [{
          itemType: action.itemType,
          customerEmail: action.customerEmail,
          message: action.message,
          charge: action.charge,
          shirtSize: action.shirtSize,
          delivery: action.delivery,
          address: action.address,
          slug: action.slug,
          cuid: action.cuid,
          _id: action._id,
        }].concat(state.purchaseOrders),
        purchaseOrder: state.purchaseOrder,
      };


    case ActionTypes.GET_PURCHASE_ORDERS :
      return {
        purchaseOrders: action.purchaseOrders,
      };

    default:
      return state;
  }
};

export default apiReducer;
