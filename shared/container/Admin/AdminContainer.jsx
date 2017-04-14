import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';
import MessagesView from '../../components/Admin/Messages';
import PurchaseOrdersView from '../../components/Admin/PurchaseOrders';

class AdminContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.props.dispatch(Actions.fetchMessages());
  }

  render() {

    const { messages } = this.props

    return (
      <div>
        <PurchaseOrdersView />
        <MessagesView messages={messages} />
      </div>
    );
  }

}

AdminContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(PropTypes.shape({
    emailFrom: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    dateAdded: PropTypes.string.isRequired
  })).isRequired,
}

AdminContainer.need = [() => { return Actions.fetchMessages(); }];

function mapStateToProps(state) {
  return {
    messages: state.contactFormReducer.messages
  }
}

export default connect(mapStateToProps)(AdminContainer);
