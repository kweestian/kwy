import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function PostListItem(props) {
  return (
    <div className="single-post">
      <h3 className="post-title ">
        <Link to={`/post/${props.post.slug}-${props.post.cuid}`} onClick={props.onClick}>

          {
            props.post.anonymous ? <p className="author-name"> Anonymous </p> : <p className="author-name"> {props.post.firstName} {props.post.lastName}</p>
          }
          <p className="post-desc">{props.post.message}</p>
          <p className="post-desc">Donation: {props.post.amount}</p>

        </Link>
      </h3>
      <hr className="divider"/>
    </div>
  );
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    message: PropTypes.string,
    amount: PropTypes.string,
    anonymous: PropTypes.bool.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,

  onClick: PropTypes.func.isRequired,
};

export default PostListItem;
