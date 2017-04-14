import React, { PropTypes } from 'react';
import PostListItem from '../../components/PostListItem/PostListItem';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';

function PostListView(props) {
  return (
    <div className="listView">
      {
        props.posts.map((post, i) => (
          <PostListItem post={post} key={i}
          onClick={function handleClick() {
              props.dispatch(Actions.addSelectedPost(post));
          }}
        />
        ))
      }
    </div>
  );
}

PostListView.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    message: PropTypes.string,
    amount: PropTypes.string,
    anonymous: PropTypes.bool.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(PostListView);
