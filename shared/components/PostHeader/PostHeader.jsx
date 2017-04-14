import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function PostHeader(props, context) {
  return (
      <div className="container">
        {
          context.router.isActive('/donate', true) ? <a className="add-post-button" href="#" onClick={props.onClick}>Add Post</a> : null
        }
      </div>
  );
}

PostHeader.contextTypes = {
  router: React.PropTypes.object,
};

PostHeader.propTypes = {
  onClick: PropTypes.func.isRequired,
  handleLogoClick: PropTypes.func,
};

export default PostHeader;
