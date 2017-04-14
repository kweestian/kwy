import React, { Component, PropTypes } from 'react'

export default class CartProduct extends Component {
  render() {
    const { price, quantity, itemType } = this.props
    return (
      <div>
        {itemType} - &#36;{price}
        {quantity ? `x ${quantity}` : null}

      </div>
    )
  }
}

CartProduct.propTypes = {
  price: PropTypes.number,
  quantity: PropTypes.number,
  itemType: PropTypes.string,
}
