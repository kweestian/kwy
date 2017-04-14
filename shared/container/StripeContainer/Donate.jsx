import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Config from '../../../server/config';
import DonateCheckout from '../../components/Donate/Checkout';
import * as Actions from '../../redux/actions/actions';

const stripePubKey = process.env.stripePubKey || Config.stripePubKey;

class DonateView extends Component {
  constructor(props, context) {
    super(props, context);
    this.add = this.add.bind(this);
    this.charge = this.charge.bind(this);
  }

  add(firstName, lastName, amount, message, anonymous) {
    this.props.dispatch(Actions.addPostRequest({ firstName, lastName, amount, message, anonymous }));
  }

  charge(token) {
    if (token.type === 'monthly') {
      this.props.dispatch(Actions.addMonthlyCharge(token));
    } else {
      this.props.dispatch(Actions.addCharge(token));
    }
  }
  render() {

    return (
      <div className="container">
        <DonateCheckout addPost={this.add} charge={this.charge} chargeLocation="kwyGeneral" config={Config} stripePubKey={stripePubKey} isFetching={this.props.isFetching} />
      </div>
    );
  }

}

DonateView.PropTypes = {
  token: PropTypes.string.isRequired,
  stripeKey: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.string.isRequired,
};

function mapStateToProps(store) {
  return {
    isFetching: store.chargeReducer.isFetchingStripe,
  }
}

export default connect(mapStateToProps)(DonateView);
