import * as ActionTypes from '../constants/constants';

const notificationReducer = (state = {}, action) => {
  // console.log(action.type);
  switch (action.type) {
    case ActionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        message: action.message,
        level: action.level,
      };

    default:
      // console.log('notification reducer :: hit default', action.type);
      return state;
  }
}

export default notificationReducer;
