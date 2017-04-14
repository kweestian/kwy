import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';

class PostDetailView extends Component {

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.props.dispatch(Actions.fetchPosts());
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="single-post post-detail">
            <h3 className="post-title"></h3>
            {
              this.props.post.anonymous ? <p className="author-name"> Anonymous </p> : <p className="author-name"> {this.props.post.firstName} {this.props.post.lastName}</p>
            }

            <p className="post-desc">{this.props.post.message}</p>

            <p className="post-desc">{this.props.post.amount}</p>
          </div>
        </div>
      </div>
    );
  }
}

PostDetailView.need = [(params) => {
  return Actions.getPostRequest.bind(null, params.slug)();
}];

PostDetailView.contextTypes = {
  router: React.PropTypes.object,
};

PostDetailView.propTypes = {
  post: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    message: PropTypes.string,
    amount: PropTypes.string,
    anonymous: PropTypes.bool,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(store) {
  return {
    post: (store.post.post),
  };
}

export default connect(mapStateToProps)(PostDetailView);
