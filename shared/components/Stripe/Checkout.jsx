import React, {Component, PropTypes } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Config from '../../../server/config';
import {Router, browserHistory} from 'react-router';


const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${Config.port}`) : '';

const stripePubKey = process.env.stripePubKey || Config.stripePubKey;


class Checkout extends Component {

  constructor(props, context) {
    super(props, context);

    // not implicit binding of function in react

    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.onToken = this.onToken.bind(this);
    this.addPost = this.addPost.bind(this);
    this.handleAnonymousChange = this.handleAnonymousChange.bind(this);

    this.state = {
      preTotal: 0,
      disabled: false,
      validationErrorMessage: "",
      finalTotal: 0,
      stripePubKey: Config.stripePubKey,
      anonymous: false,
      isLoading: false,
    }
  }

  calculateTotal(preTotal) {
    const result = (preTotal + 0.30)/(1-0.029);
    return result;
  }

  handleAmountChange(event) {
    const preTotal = parseInt(event.target.value);
    const finalTotal = this.calculateTotal(preTotal);

    this.setState({preTotal: preTotal, finalTotal: finalTotal});
  }

  handleAnonymousChange(e) {
    this.setState({anonymous: !this.state.anonymous})
  }

  addPost() {
    const firstName = this.refs.firstName.value || "";
    const lastName = this.refs.lastName.value || "";
    const message = this.refs.message.value || "";
    const amount = this.refs.amount.value || "";
    const anonymous = this.refs.anonymous.value;

    this.props.addPost(firstName, lastName, amount, message, anonymous);
  }

  onToken(token) {
    this.setState({isLoading: !this.state.isLoading});
    const that = this;
    const params = {
      chargeTokenId: token.id,
      email: token.email,
      amount: (this.state.finalTotal).toFixed(2) * 100,
    };
    $.ajax({
      type: "POST",
      url: `${baseURL}/api/addCharge`,
      data: params,
      success: function(data, textStatus) {
        that.addPost();
        that.setState({isLoading: !that.state.isLoading}, function() {
          browserHistory.push('/success');
        }.bind(that));
      },
      error: function(err) {
        that.setState({isLoading: !that.state.isLoading}, function() {
          browserHistory.push('/error');
        }.bind(that));
      }
    })
  }

  render() {
    const anonymousCls = this.state.anonymous ? 'text-default' : '';
    const loadingCls = this.state.isLoading ? 'appear'  : 'hidden';
    const blurrCls = this.state.isLoading ? 'blurr'  : '';

    return (
      <div>
        <div className={` ${loadingCls} donation-form__loading-spinner text-center`}>
          <i className="fa fa-cog fa-spin fa-3x"></i>
          <div>Waiting for Stripe</div>
        </div>
        <div className={blurrCls}>
          <div className="container content-section text-center">
              <p>Please note that there is a <a href="https://stripe.com/ca/pricing" target="_blank" className="btn btn-default">2.9% + $0.30</a> processing fee with every donation.</p>
              <p>Other than that, every dollar is going straight to KWY, which is currently funding The Lukas Project.</p>
            <div className="form-horizontal inline-form">
              <div className="form-group">

                <input
                  ref="firstName"
                  type="string"
                  className="form-control inline-form__input"
                  placeholder="First Name"
                />

                <input
                  ref="lastName"
                  type="string"
                  className="form-control inline-form__input"
                  placeholder="Last Name"
                />
                <div className={`donation-form__input-anonymous-box ${anonymousCls}` }>
                  Remain anonymous
                </div>
                <div className="inline-form__input-anonymous-radio slideTwo">

                 <input ref="anonymous" type="checkbox" checked={this.state.anonymous} value={this.state.anonymous} id="slideTwo" name="check" onChange={this.handleAnonymousChange} />
                 <label htmlFor="slideTwo"></label>
                </div>

                <textarea
                  ref="message"
                  type="text"
                  className="form-control inline-form__input"
                  placeholder="Message"
                />

                <input
                  ref="amount"
                  type="number"
                  className="form-control inline-form__input"
                  placeholder="Donation Amount"
                  onChange={this.handleAmountChange}
                />
              </div>
              <div className="form-group">
                <StripeCheckout
                  name="Kids Without Yachts"
                  description={"CAD$ " + this.state.preTotal + " + " + (this.state.finalTotal - this.state.preTotal).toFixed(2)}
                  image="img/favicon.ico"
                  componentClass="div"
                  className="form-group"
                  panelLabel={"Give $" + this.state.finalTotal.toFixed(2) +  " to Lukas"}
                  currency="CAD"
                  token={this.onToken}
                  stripeKey={stripePubKey}
                  locale="en"
                  shippingAddress={false}
                  billingAddress={false}
                  zipCode={false}
                  alipay={true}
                  bitcoin={true}
                  allowRememberMe={true}
                  reconfigureOnUpdate={false}
                >
                  <button className="btn btn-default" disabled={this.state.disabled}>
                    DONATE
                  </button>
                </StripeCheckout>
                <p className="alert alert-default donation-print__small">
                  Please note that we are not, as of yet, an official charity registered with the CRA. As such, we cannot issue charitable tax receipts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

Checkout.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default Checkout;
