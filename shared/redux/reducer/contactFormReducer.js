import * as ActionTypes from '../constants/constants';

const initialState = {
  showContactForm: false,
  messages: [],
}

const contactFormReducer = (state = initialState, action) => {
switch (action.type) {
  case ActionTypes.TOGGLE_CONTACT_FORM :
    return {
      ...state,
      showContactForm: !state.showContactForm,
    };

  case ActionTypes.SEND_CONTACT_FORM :
    return {
      ...state,
      message: action.message,
      title: action.title,
      emailFrom: action.emailFrom,
    };

  case ActionTypes.ADD_MESSAGES :
    return {
      messages: action.messages,
    };

  default:
    return state;
  }
};

export const getShowContactForm = state => state.contactFormReducer.showContactForm;

export default contactFormReducer;
