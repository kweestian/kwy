import React, {Component, PropTypes } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Config from '../../../server/config';
import { Router, browserHistory } from 'react-router';


const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${Config.port}`) : '';


class DonateCheckout extends Component {


  constructor(props, context) {
    super(props, context);


    // not implicit binding of function in react

    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.onToken = this.onToken.bind(this);
    this.addPost = this.addPost.bind(this);
    this.handleAnonymousChange = this.handleAnonymousChange.bind(this);
    this.onTokenMonthly = this.onTokenMonthly.bind(this);

    this.state = {
      preTotal: 0,
      disabled: false,
      validationErrorMessage: "",
      finalTotal: 0,
      anonymous: false,
      isLoading: props.isFetching,
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      isLoading: newProps.isFetching,
    })
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
    const params = {
      chargeTokenId: token.id,
      email: token.email,
      amount: (this.state.finalTotal).toFixed(2) * 100,
      type: 'once',
      post: {
        firstName: this.refs.firstName.value || "",
        lastName: this.refs.lastName.value || "",
        message: this.refs.message.value || "",
        amount: this.refs.amount.value || "",
        anonymous: this.refs.anonymous.value,
      },
    };
    this.props.charge(params);
  }

  onTokenMonthly(token) {
    const params = {
      chargeTokenId: token.id,
      email: token.email,
      amount: (this.state.finalTotal).toFixed(2) * 100,
      type: 'monthly',
      post: {
        firstName: this.refs.firstName.value || "",
        lastName: this.refs.lastName.value || "",
        message: this.refs.message.value || "",
        amount: this.refs.amount.value || "",
        anonymous: this.refs.anonymous.value,
      },
    };
    this.props.charge(params);
  }

  render() {
    const anonymousCls = this.state.anonymous ? 'text-default' : '';
    const loadingCls = this.state.isLoading ? 'appear' : 'hidden';
    const blurrCls = this.state.isLoading ? 'blurr' : '';

    return (
      <div className="row">
        <div className={` ${loadingCls} donation-form__loading-spinner text-center`}>
          <i className="fa fa-cog fa-spin fa-3x"></i>
          <div>Waiting for Stripe</div>
        </div>
        <div className={blurrCls}>
          <div className="container content-section text-center">
            {this.props.htmlNode}

            <p>Please note that there is a <a href="https://stripe.com/ca/pricing" target="_blank" className="btn-sm btn-primary">2.9% + $0.30</a> processing fee with every donation.</p>
            <p> Other than that every donation is going straight to low-income families affected by cancer.</p>

            <div className="form-horizontal inline-form">
              <div className="form-group">

                <input
                  ref="firstName"
                  type="string"
                  className="form-control inline-form__input"
                  placeholder="First Name"
                  disabled={this.state.anonymous}
                />

                <input
                  ref="lastName"
                  type="string"
                  className="form-control inline-form__input"
                  placeholder="Last Name"
                  disabled={this.state.anonymous}
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
                  placeholder="Message (Optional)"
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
                  panelLabel={"Donate $" + this.state.finalTotal.toFixed(2)}
                  currency="CAD"
                  token={this.onToken}
                  stripeKey={this.props.stripePubKey}
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
                    DONATE ONCE
                  </button>
                </StripeCheckout>
                <StripeCheckout
                  name="Kids Without Yachts"
                  description={"CAD$ " + this.state.preTotal + " + " + (this.state.finalTotal - this.state.preTotal).toFixed(2)}
                  image="img/favicon.ico"
                  componentClass="div"
                  className="form-group"
                  panelLabel={"Donate $" + this.state.finalTotal.toFixed(2)}
                  currency="CAD"
                  token={this.onTokenMonthly}
                  stripeKey={this.props.stripePubKey}
                  locale="en"
                  shippingAddress={false}
                  billingAddress={false}
                  zipCode={false}
                  alipay={true}
                  bitcoin={true}
                  allowRememberMe={true}
                  reconfigureOnUpdate={false}
                >
                  <button className="btn btn-primary" disabled={this.state.disabled}>
                    DONATE MONTHLY
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

DonateCheckout.propTypes = {
  addPost: PropTypes.func.isRequired,
  charge: PropTypes.func.isRequired,
  stripePubKey: PropTypes.string.isRequired,
  isFetching: PropTypes.string.isRequired,
};

export default DonateCheckout;
