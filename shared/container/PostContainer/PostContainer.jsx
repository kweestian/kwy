import React, { PropTypes, Component } from 'react';
import PostListView from '../PostListView/PostListView';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';
import Config from '../../../server/config';


const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${Config.port}`) : '';

class PostContainer extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.dispatch(Actions.getTodaysPosts());
  }

  componentDidUpdate() {
    const that = this;


    if (!!window.EventSource) {
      const source = new EventSource(`${baseURL}/stream`);

      source.addEventListener('message', function(e) {
           if (JSON.parse(e.data)) {
             that.props.dispatch(Actions.getTodaysPosts());
           }

           this.close();
           console.log('closed');
        }, false)

      source.addEventListener('open', function(e) {
        console.log('coneected');
      }, false)

      source.addEventListener('error', function(e) {
        if (e.target.readyState == EventSource.CLOSED) {
          console.log('disconnected');
        }
        else if (e.target.readyState == EventSource.CONNECTING) {
          console.log('Connecting ...')
        }
      }, false)
    } else{
      console.log("Your browser doesn't support SSE")
    }
  }

  render() {
    return (
        <div className="container donation-list__container">
          <div className="container text-center">
            <div className="row">
              <h1>
                ${ this.props.sum }
              </h1>
              <h5>
                Donated so far <br /> <span className="text-default">THANK YOU !!! </span>
              </h5>
            </div>
          </div>
          <div className="row">
            <PostListView posts={this.props.posts} />
          </div>
      </div>
    );
  }
}

PostContainer.need = [() => { return Actions.fetchPosts(); }];
PostContainer.contextTypes = {
  router: React.PropTypes.object,
};

function mapStateToProps(store) {
  return {
    posts: store.post.posts,
    sum: store.post.sum,
  };
}

PostContainer.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    anonymous: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
  })).isRequired,
  sum: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(PostContainer);
