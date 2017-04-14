import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AaronBody from '../../components/Aaron/AaronBody';

class AaronContainer extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <AaronBody />
    );
  }

}

export default connect()(AaronContainer);
