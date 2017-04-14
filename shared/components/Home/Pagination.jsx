import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

function Pagination(props, context) {
  return (
    <i className={"donation-list__footer-arrows fa fa-arrow-" + props.arrowDirection} onClick={props.handleClick}>
    </i>
  );
}

Pagination.contextTypes = {
  router: React.PropTypes.object,
};

Pagination.propTypes = {
  handleClick: PropTypes.func.isRequired,
  arrowDirection: PropTypes.string.isRequired,
};

export default Pagination;
