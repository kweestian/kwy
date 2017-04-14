import React, { Component, PropTypes } from 'react'

export default class ProductsList extends Component {
  render() {
    return (
      <div>
        { this.props.children }
      </div>
    )
  }
}

ProductsList.propTypes = {
  children: PropTypes.node
}
