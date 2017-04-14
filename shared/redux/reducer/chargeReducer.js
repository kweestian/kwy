import * as ActionTypes from '../constants/constants';

const initialState = {
  isFetchingStripe: false,
  hasSucceeded: false,
}

const chargeReducer = (state = initialState, action) => {
switch (action.type) {
  case ActionTypes.CHARGE_REQUEST :
    return {
      ...state,
      isFetchingStripe: action.isFetchingStripe,
      hasSucceeded: action.hasSucceeded,
    };

  case ActionTypes.CHARGE_FAILURE :
    return {
      ...state,
      isFetchingStripe: false,
      hasSucceeded: false,
    };

  case ActionTypes.CHARGE_SUCCESS :
    return {
      ...state,
      isFetchingStripe: false,
      hasSucceeded: true,
    };

  default:
    return state;
  }
};

export default chargeReducer;
