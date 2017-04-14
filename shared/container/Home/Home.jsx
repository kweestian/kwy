import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Intro from '../../components/Home/Intro';
import Story from '../../components/Home/Story';
import Pagination from '../../components/Home/Pagination';
import PostListView from '../PostListView/PostListView';
import Mission from '../../components/Home/Mission';
import * as Actions from '../../redux/actions/actions';

import { getShowContactForm } from '../../redux/reducer/contactFormReducer';


class Home extends Component {
  constructor(props, context) {
    super(props, context);

    this.changePage = this.changePage.bind(this);
    this.getCurrentPage = this.getCurrentPage.bind(this);
    this.toggleContactForm = this.toggleContactForm.bind(this);
    this.sendContactForm = this.sendContactForm.bind(this);

    this.state = {
      pages: 1,
      currentPageNumber: 1,
      posts: [],
    };

  }

  componentDidMount() {
    this.getCurrentPage(this.state.currentPageNumber);
  }


  getCurrentPage(pageNumber) {
    if (this.props.posts.length > 0) {

      let page, lastPage, currentPage, currentPages, totalPosts, allPosts, currentPosts, currentIndex;

      totalPosts = this.props.posts.length;

      if (totalPosts % 10 === 0) {
        this.setState({pages: totalPosts/10});
        lastPage = 10;
      } else {
        currentPages = ((totalPosts - (totalPosts % 10))/10) + 1;
        this.setState({pages: currentPages});
        lastPage = totalPosts % 10;
      }

      if (totalPosts <= 10) {

        currentPosts = this.props.posts.slice(0, totalPosts);

      } else if (pageNumber === this.state.currentPages && totalPosts > 10) {

        currentPosts = this.props.posts.slice(totalPosts - lastPage, totalPosts);

      } else {

        currentIndex = (pageNumber * 10) - 1;

        currentPosts = this.props.posts.slice(currentIndex-9, currentIndex);
      }
      this.setState({posts: currentPosts});
    } else {
      this.setState({posts: this.props.posts});
    }

  }

  changePage(side) {
    switch(side){
      case 'left':
        this.setState({currentPageNumber: this.state.currentPageNumber - 1}, function(){
          this.getCurrentPage(this.state.currentPageNumber);
        }.bind(this));
        break;
      case 'right':
        this.setState({currentPageNumber: this.state.currentPageNumber + 1}, function(){
          this.getCurrentPage(this.state.currentPageNumber);
        }.bind(this));
        break;
      }
  }

  toggleContactForm() {
    this.props.dispatch(Actions.toggleContactForm())
  }

  sendContactForm(emailFrom, title, message) {
    const data = {
      emailFrom: emailFrom,
      title: title,
      message: message,
    }
    this.props.dispatch(Actions.addMessage(data));
  }

  render() {

    const donationJsx =
      <div className="container donation-list__container text-center">
        <h2> Thank you to all <span className="text-default">our donors <i className="fa fa-heart" aria-hidden="true"> !!! </i> </span></h2>
        <div className="row">
          <PostListView posts={this.state.posts} />
        </div>
        <div className="donation-list__footer">
          {
            this.state.currentPageNumber !== 1 ? <Pagination handleClick={this.changePage.bind(null, 'left')} arrowDirection='left'/> : null
          }

          { this.state.currentPageNumber} / {this.state.pages }

          {
            this.state.currentPageNumber !== this.state.pages ? <Pagination handleClick={this.changePage.bind(null, 'right')} arrowDirection='right' /> : null
          }
        </div>
      </div>;


    return (
      <div>
        <Intro />
        <Mission showContactForm={this.props.showContactForm} toggleContactForm={this.toggleContactForm} sendContactForm={this.sendContactForm} />
        {
          donationJsx
        }
      </div>
    );
  }
}

Home.contextTypes = {
  router: React.PropTypes.object,
};

function mapStateToProps(state) {
  return {
    posts: state.post.posts,
    post: state.post.post,
    sum: state.post.sum,
    showContactForm: getShowContactForm(state),
  };
}

Home.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    amount: PropTypes.string,
    message: PropTypes.string,
    anonymous: PropTypes.boolean,
  })).isRequired,
  sum: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  showContactForm: PropTypes.bool.isRequired,
};


export default connect(mapStateToProps)(Home);
