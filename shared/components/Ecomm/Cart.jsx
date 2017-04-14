import React, { Component, PropTypes } from 'react'
import CartProduct from './CartProduct'
import StripeCheckout from 'react-stripe-checkout'

export default class Cart extends Component {
  constructor(props, context) {
    super(props, context);
    this.onToken = this.onToken.bind(this);

    // this.remove = this.remove.bind(this);
  }

  onToken(token) {
    this.props.charge(token);
  }

  // remove(e) {
  //   console.log(e)
  // }

  render() {
    const { products, total } = this.props
    let totalQuantity = 0;
    products.forEach(product => totalQuantity += product.quantity);
    let nodes, showProductCls;
    const hasProducts = totalQuantity > 0;
    if (hasProducts) {
      nodes =
        products.map(product =>
          <div className="animated fadeInDown">
            <CartProduct
              itemType={product.itemType}
              price={product.price}
              quantity={product.quantity}
              key={product._id}
              imageUrl={product.image}/>
              <button className="btn btn-primary" onClick={this.props.removeFromCart} value={`{"productId": "${product._id}", "quantity": "${product.quantity}"}`}>
                Remove From Cart
              </button>
          </div>

        )
    } else {
      nodes = <em> Please add some products </em>
    }

    return (
      <div>
        <div>
          <h3><i className="fa fa-shopping-cart"></i><span className="badge">{totalQuantity}</span>Your Cart</h3>
          <div>{nodes}</div>
          <p>subTotal: &#36;{total}</p>
        </div>
        <div className='form-group'>
          <StripeCheckout
            name="Kids Without Yachts"
            description={"CAD$ " + total}
            image="img/favicon.ico"
            componentClass="div"
            className="form-group"
            panelLabel="Finalize Order"
            currency="CAD"
            token={this.onToken}
            stripeKey={this.props.stripePubKey}
            locale="en"
            shippingAddress={true}
            billingAddress={true}
            zipCode={true}
            alipay={true}
            bitcoin={true}
            allowRememberMe={true}
            reconfigureOnUpdate={false}
          >
          <button className={`btn btn-default btn-sm`} disabled={hasProducts ? '' : 'disabled'}>
            Proceed to Secure Checkout
          </button>
          </StripeCheckout>
        </div>
      </div>
    )
  }
}

Cart.propTypes = {
  products: PropTypes.array,
  charge: PropTypes.func.isRequired,
  total: PropTypes.string,
  removeFromCart: PropTypes.func.isRequired,
  isProceedCheckout: PropTypes.bool,
  stripePubKey: PropTypes.string,
}
