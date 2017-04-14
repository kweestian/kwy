import React, { Component, PropTypes } from 'react'

export default class CartProduct extends Component {

  render() {
    const { price, quantity, itemType, imageUrl } = this.props
    return (
      <div>
        <div className="row">
          <img id="image" className="cart-product__image" src={imageUrl} onClick={this.toggleImage} />
        </div>
        {itemType} - &#36;{price} {quantity ? `x ${quantity}` : null}
      </div>
    )
  }
}

CartProduct.propTypes = {
  price: PropTypes.number,
  quantity: PropTypes.number,
  imageUrl: PropTypes.string,
  itemType: PropTypes.string,
}
