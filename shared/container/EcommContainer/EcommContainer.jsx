import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ProductsContainer from './ProductsContainer'
import CartContainer from './CartContainer'
import * as Action from '../../redux/actions/actions'

class EcommContainer extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      isProceedCheckout: props.isProceedCheckout
    }

    this.props.dispatch(Action.fetchProducts())
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      isProceedCheckout: newProps.isProceedCheckout,
    })
  }


  render() {

    return (
      <div>
        <div className="text-center">
          <h2>Merchandise</h2>
          <hr/>
          <CartContainer />
          <hr/>
          <ProductsContainer />
        </div>
      </div>
    )
  }
}

EcommContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
}



export default connect()(EcommContainer)

// <Checkout isProceedCheckout={this.state.isProceedCheckout} total={this.props.cartTotal} quantity={this.props.productsQuantity} stripePubKey={stripePubKey} />
