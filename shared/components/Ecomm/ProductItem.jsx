import React, { Component, PropTypes } from 'react'
import Product from './Product'

export default class ProductItem extends Component {
  render() {
    const { product } = this.props

    return (
      <div
        style={{ marginBottom: 20 }}>
        <Product
          itemType={product.itemType}
          price={product.price}
          imageUrl={product.image} />
        <button className="btn btn-primary"
          onClick={this.props.onAddToCartClicked}>
          Add to cart
        </button>
      </div>
    )
  }
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    itemType: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
  }).isRequired,
  onAddToCartClicked: PropTypes.func.isRequired
}
