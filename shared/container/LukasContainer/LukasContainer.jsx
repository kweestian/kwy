import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import LukasBody from '../../components/Lukas/LukasBody';

class LukasContainer extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <LukasBody />
    );
  }

}

export default connect()(LukasContainer);
