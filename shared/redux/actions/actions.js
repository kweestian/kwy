import { browserHistory } from 'react-router';

import * as ActionTypes from '../constants/constants';
import Config from '../../../server/config';
import fetch from 'isomorphic-fetch';

const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${Config.port}`) : '';

export function addPost(post) {
  return {
    type: ActionTypes.ADD_POST,
    firstName: post.firstName,
    lastName: post.lastName,
    message: post.message,
    amount: post.amount,
    anonymous: post.anonymous,
    slug: post.slug,
    cuid: post.cuid,
    _id: post._id,
  };
}

export function changeSelectedPost(slug) {
  return {
    type: ActionTypes.CHANGE_SELECTED_POST,
    slug,
  };
}

export function addPostRequest(post) {
  return (dispatch) => {
    fetch(`${baseURL}/api/addPost`, {
      method: 'post',
      body: JSON.stringify({
        post: {
          firstName: post.firstName,
          lastName: post.lastName,
          anonymous: post.anonymous,
          message: post.message,
          amount: post.amount,
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((res) => res.json()).then(res => dispatch(addPost(res.post)));
  };
}

export function addSelectedPost(post) {
  return {
    type: ActionTypes.ADD_SELECTED_POST,
    post,
  };
}

export function getPostRequest(post) {
  return (dispatch) => {
    return fetch(`${baseURL}/api/getPost?slug=${post}`, {
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((response) => response.json()).then(res => dispatch(addSelectedPost(res.post)));
  };
}

export function deletePost(post) {
  return {
    type: ActionTypes.DELETE_POST,
    post,
  };
}

export function getPosts(posts) {
  return {
    type: ActionTypes.GET_POSTS,
    posts,
  };
}

export function fetchPosts() {
  return (dispatch) => {
    return fetch(`${baseURL}/api/getPosts`).
      then((response) => response.json()).
      then((response) => dispatch(getPosts(response.posts)));
  };
}

export function getTodaysPosts() {
  return (dispatch) => {
    return fetch(`${baseURL}/api/getTodaysPosts`).
      then((response) => response.json()).
      then((response) => dispatch(getPosts(response.posts)));
  };
}

export function deletePostRequest(post) {
  return (dispatch) => {
    fetch(`${baseURL}/api/deletePost`, {
      method: 'post',
      body: JSON.stringify({
        postId: post._id,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then(() => dispatch(deletePost(post)));
  };
}

export function addPurchaseOrder(purchaseOrder) {
  return {
    type: ActionTypes.ADD_PURCHASE_ORDER,
    itemType: purchaseOrder.itemType,
    customerEmail: purchaseOrder.customerEmail,
    charge: purchaseOrder.charge,
    shirtSize: purchaseOrder.shirtSize,
    message: purchaseOrder.message,
    delivery: purchaseOrder.delivery,
    address: purchaseOrder.address,
    slug: purchaseOrder.slug,
    cuid: purchaseOrder.cuid,
    _id: purchaseOrder._id,
  };
}

export function addPurchaseOrderRequest(purchaseOrder) {
  return (dispatch) => {
    fetch(`${baseURL}/api/addPurchaseOrder`, {
      method: 'post',
      body: JSON.stringify({
        purchaseOrder: {
          itemType: purchaseOrder.itemType,
          customerEmail: purchaseOrder.customerEmail,
          charge: purchaseOrder.charge,
          shirtSize: purchaseOrder.shirtSize,
          message: purchaseOrder.message,
          delivery: purchaseOrder.delivery,
          address: purchaseOrder.address,
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((res) => res.json()).then(res => dispatch(addPurchaseOrder(res.post)));
  };
}

export function getPurchaseOrders(posts) {
  return {
    type: ActionTypes.GET_PURCHASE_ORDER,
    posts,
  };
}

export function fetchPurchaseOrders() {
  return (dispatch) => {
    return fetch(`${baseURL}/api/getPurchaseOrders`).
      then((response) => response.json()).
      then((response) => dispatch(getPurchaseOrders(response.posts)));
  };
}

export function addCharge(data) {
  return (dispatch) => {
    dispatch(requestCharge(data));
    fetch(`${baseURL}/api/addCharge`, {
      method: 'post',
      body: JSON.stringify({
        chargeTokenId: data.chargeTokenId,
        email: data.email,
        amount: data.amount,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
    .then((res) => {
      if (res.status !== 200) {
        dispatch(chargeFailure(res.statusText));
        browserHistory.push('/error');
        return Promise.reject();
      } else {
        dispatch(addPostRequest(data.post));
        dispatch(chargeSuccess(res.statusText));
        browserHistory.push('/success');
        return Promise.resolve()
      }
    })
    .catch((err) => {
      console.log(err) // eslint-disable-line
    })
  }
}

export function addMonthlyCharge(data) {
  return (dispatch) => {
    dispatch(requestCharge(data));
    fetch(`${baseURL}/api/addMonthlyCharge`, {
      method: 'post',
      body: JSON.stringify({
        chargeTokenId: data.chargeTokenId,
        email: data.email,
        amount: data.amount,
        fname: data.post.firstName,
        lname: data.post.lastName
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
    .then((res) => {
      if (res.status !== 200) {
        dispatch(chargeFailure(res.statusText));
        browserHistory.push('/error');
        return Promise.reject();
      } else {
        dispatch(addPostRequest(data.post));
        dispatch(chargeSuccess(res.statusText));
        browserHistory.push('/success');
        return Promise.resolve()
      }
    })
    .catch((err) => {
      console.log(err) // eslint-disable-line
    })
  }
}


export function requestCharge(data) {
  return {
    type: ActionTypes.CHARGE_REQUEST,
    isFetchingStripe: true,
    hasSucceeded: false,
    data,
  };
}

export function chargeSuccess(message) {
  return {
    type: ActionTypes.CHARGE_SUCCESS,
    isFetchingStripe: false,
    hasSucceeded: true,
    message,
  };
}

export function chargeFailure(message) {
  return {
    type: ActionTypes.CHARGE_FAILURE,
    isFetchingStripe: false,
    hasSucceeded: false,
    message,
  };
}

export function requestLogin(creds) {
  return {
    type: ActionTypes.REQUEST_LOGIN,
    isFetching: true,
    isAuthenticated: false,
    creds,
  };
}

export function loginSuccess(user) {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    token: user.token,
  };
}

export function loginFailure(message) {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message,
  };
}

export function requestCheckToken() {
  return {
    type: ActionTypes.REQUEST_CHECK_TOKEN,
    isFetching: true,
    isAuthenticated: false
  };
}

export function tokenValid() {
  return {
    type: ActionTypes.TOKEN_VALID,
    isFetching: false,
    isAuthenticated: true
  };
}

export function tokenInvalid() {
  return {
    type: ActionTypes.TOKEN_INVALID,
    isFetching: false,
    isAuthenticated: false
  };
}

export function checkToken(sToken) {
  return (dispatch) => {
    const token = typeof window === 'undefined' ? sToken : localStorage.getItem('token');


    if (!token) {
      return Promise.resolve(dispatch(tokenInvalid()));
    }

    dispatch(requestCheckToken());
    return fetch(`${baseURL}/auth/me`, {
      method: 'GET',
      credentials: 'same-origin',
      headers: new Headers({
        'Authorization': `JWT ${token}`
      })
    })
    .then((response) => {
      // CLEAR YOUR SESSION
      if (response.status === 401) {
        dispatch(tokenInvalid());
        return Promise.reject();
      }
      return response.json()
    })
    .then((response) => {
      const { user } = response;
      if (!user.ok) {
        dispatch(tokenInvalid());
        dispatch(addNotification('Requires admin priviledges', 'error'));
        return Promise.reject();
      }

      dispatch(tokenValid());
      dispatch(addNotification('Session authenticated', 'success'));
    })
    .catch((err) => {
      console.log(err); //eslint-disable-line
    })
  }
}

export function loginUser(creds) {
  return (dispatch) => {
    dispatch(requestLogin(creds));
    return fetch(`${baseURL}/auth/login`, {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(creds),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
    .then((response) => response.json())
    .then((response) => {
      const { user, message } = response;
      if (!user.ok) {
        dispatch(loginFailure(message));
        dispatch(addNotification(message, 'error'));
        return Promise.reject(message);
      } else {
        localStorage.setItem('token', user.token);
        dispatch(loginSuccess(user));
        dispatch(addNotification(message, 'success'));
      }


    })
    .catch((err) => {
      console.log(err); //eslint-disable-line
    });
  };
}

// Notifications

export function addNotification(message, level) {
  return {
    type: ActionTypes.ADD_NOTIFICATION,
    message,
    level,
  };
}

// Shopping cart

export function addProducts(products) {
  return {
    type: ActionTypes.ADD_PRODUCTS,
    products,
  }
}

export function fetchProducts() {
  return (dispatch) => {
    return fetch(`${baseURL}/api/getProducts`).
      then((response) => response.json()).
      then((response) => dispatch(addProducts(response.products)));
  }
}

export function addSelectedProduct(product) {
  return {
    type: ActionTypes.ADD_SELECTED_POST,
    product,
  };
}

export function getProductRequest(product) {
  return (dispatch) => {
    return fetch(`${baseURL}/api/getProduct?slug=${post}`, {
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((response) => response.json()).then(res => dispatch(addSelectedProduct(res.post)));
  };
}

function addToCartUnsafe(productId) {
  return {
    type: ActionTypes.ADD_TO_CART,
    productId
  }
}

export function addToCart(productId) {
  return (dispatch) => {
    dispatch(addToCartUnsafe(productId))
  }
}

function removeFromCartUnsafe(productId, quantity) {
  return {
    type: ActionTypes.REMOVE_FROM_CART,
    productId,
    quantity
  }
}

export function removeFromCart(productId, quantity) {
  return (dispatch) => {
    dispatch(removeFromCartUnsafe(productId, quantity))
  }
}

export function checkoutRequest(products) {
  return (dispatch, getState) => {
    const cart = getState().cart

    dispatch({
      type: ActionTypes.CHECKOUT_REQUEST
    })

    // create purshase order
    // shop.buyProducts(products, () => {
    //   dispatch({
    //     type: types.CHECKOUT_SUCCESS,
    //     cart
    //   })
    //   // Replace the line above with line below to rollback on failure:
    //   // dispatch({ type: types.CHECKOUT_FAILURE, cart })
    // })
  }
}


// Contact Form

export function toggleContactForm() {
  return {
    type: ActionTypes.TOGGLE_CONTACT_FORM,
  }
}

export function sendContactForm(message) {
  return (dispatch) => {
    return fetch(`${baseURL}/api/sendContactForm`, {
      method: 'post',
      body: JSON.stringify({
        emailFrom: message.emailFrom,
        title: message.title,
        message: message.message,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
    .then((res) => {
      if (res.ok) {
        dispatch(addNotification('Message was put in a bottle mate!', 'success'))
      } else {
        dispatch(addNotification('There was an error sending your message =(', 'error'))
      }
    })
  }
}

export function addMessage(message) {
  return (dispatch) => {
    return fetch(`${baseURL}/api/addMessage`, {
      method: 'post',
      body: JSON.stringify({
        emailFrom: message.emailFrom,
        title: message.title,
        message: message.message,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    })
    .then((res) => res.json())
    .then((response) => {
      dispatch(sendContactForm(response.message))
    })
    .catch((err) => console.log(err)) //eslint-disable-line
  }
}

export function addMessages(messages) {
  return {
    type: ActionTypes.ADD_MESSAGES,
    messages,
  };
}

export function fetchMessages() {
  return (dispatch) => {
    return fetch(`${baseURL}/api/getMessages`, {
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    })
    .then((res) => res.json())
    .then((res) => {
      dispatch(addMessages(res.messages))
    })
  }
}
