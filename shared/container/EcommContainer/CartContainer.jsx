import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { checkoutRequest, removeFromCart } from '../../redux/actions/actions'
import { getTotal, getCartProducts } from '../../redux/reducer/index'
import Cart from '../../components/Ecomm/Cart'
import Config from '../../../server/config';

const stripePubKey = process.env.stripePubKey || Config.stripePubKey;

class CartContainer extends Component {

  constructor(props, context) {
    super(props, context);

    this.removeFromCart = this.removeFromCart.bind(this);
    this.chargeCart = this.chargeCart.bind(this);

  }

  chargeCart(params) {
    console.log(params);
  }

  removeFromCart(e) {
    // weird hack to get around weird redux things i need to understand

    const {productId, quantity} = JSON.parse(e.target.value)
    this.props.dispatch(removeFromCart(productId, parseInt(quantity)))
  }

  render() {
    const { products, total } = this.props

    return (

      <Cart
        products={products}
        total={total}
        stripePubKey={stripePubKey}
        charge={this.chargeCart}
        isProceedCheckout={this.props.isProceedCheckout}
        removeFromCart={this.removeFromCart} />
    )
  }
}

CartContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    itemType: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  })).isRequired,
  total: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    products: getCartProducts(state),
    total: getTotal(state),
    isProceedCheckout: state.cart.isProceedCheckout,
  }
}

export default connect(mapStateToProps)(CartContainer)
