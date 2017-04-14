import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/Header/Navbar';
import Footer from '../components/Footer/Footer';
import NotificationContainer from '../container/NotificationContainer/NotificationContainer'
import * as Actions from '../redux/actions/actions';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      children: this.props.children
    }
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      children: nextProps.children
    })
  }

  render() {
    return (
      <div>
        <Navbar />
        { this.state.children }
        <NotificationContainer />
        <Footer />
      </div>
    );
  }
}

App.need = [() => { return Actions.fetchPosts() }]

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default connect()(App);
