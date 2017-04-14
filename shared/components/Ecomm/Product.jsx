import React, { Component, PropTypes } from 'react'

export default class Product extends Component {

  constructor(props, context) {
    super(props, context)

    this.toggleImage = this.toggleImage.bind(this)
  }

  toggleImage() {
    let el = $('#myImage')
    el.css('height') === "0px" ? el.css('height', '100%') : el.css('height', '0')
  }

  render() {
    const { price, quantity, itemType, imageUrl } = this.props
    return (
      <div>
        <div className="row">
          <img id="image" className="product__image clicky" src={imageUrl} onClick={this.toggleImage} />
        </div>
        {itemType} - &#36;{price} {quantity ? `x ${quantity}` : null}
        <div className="overlay" id="myImage">
          <a href="javascript:void(0)" className="closebtn" onClick={this.toggleImage}>&times;</a>
          <div className="overlay-content">
            <img src={imageUrl} />
          </div>
        </div>
      </div>
    )
  }
}

Product.propTypes = {
  price: PropTypes.number,
  quantity: PropTypes.number,
  imageUrl: PropTypes.string,
  itemType: PropTypes.string,
}
