import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import addToCart, * as Action from '../../redux/actions/actions'
import { getVisibleProducts } from '../../redux/reducer/productReducer'
import ProductItem from '../../components/Ecomm/ProductItem'
import ProductsList from '../../components/Ecomm/ProductsList'

class ProductsContainer extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { products } = this.props

    return (
      <ProductsList>
        {products.map(product =>
          <ProductItem
            product={product}
            onAddToCartClicked={() => this.props.dispatch(Action.addToCart(product._id))}
          />
        )}
      </ProductsList>
    )
  }
}

ProductsContainer.need = [() => { return Action.fetchProducts(); }];

ProductsContainer.contextTypes = {
  router: React.PropTypes.object,
};

ProductsContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    cuid: PropTypes.string.isRequired,
    itemType: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
}
//
function mapStateToProps(state) {
  return {
    products: getVisibleProducts(state.products),
  }
}




export default connect(mapStateToProps)(ProductsContainer)
