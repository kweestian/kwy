import { Router, Route, IndexRoute } from 'react-router';
import React from 'react';
import App from './container/App';
import Home from './container/Home/Home';
import Donate from './container/StripeContainer/Donate';
import Success from './components/Donate/Success';
import ErrorView from './components/Donate/Error';
import LukasContainer from './container/LukasContainer/LukasContainer';
import AdminContainer from './container/Admin/AdminContainer';
import PostDetailView from './container/PostDetailView/PostDetailView';
import Team from './components/Home/Team';
import Story from './components/Home/Story';
import LoginContainer from './container/Login/LoginContainer';
import EcommContainer from './container/EcommContainer/EcommContainer';
import AaronContainer from './container/AaronContainer/AaronContainer';
import * as Actions from './redux/actions/actions';


export default (store, req) => {

  let token = null;

  if (req && req.session.token) {
      token = req.session.token;
  }

  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { isAuthenticated }} = store.getState();
      if (!isAuthenticated) {
        replace('/login');
      }
      cb();
    }

    const { auth: { loaded }} = store.getState();

    if (!loaded) {
      store.dispatch(Actions.checkToken(token)).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  return(
    <Router name="home" path="/" component={App}>
      <IndexRoute component={Home} />
      <Route name="donate" path="/donate" component={Donate} />
      <Route path="/success" component={Success} />
      <Route path="/lukasproject" component={LukasContainer} />
      <Route path="/admin" component={AdminContainer} onEnter={requireLogin} />
      <Route path="/post/:slug" component={PostDetailView} />
      <Route path="/story" component={Story} />
      <Route path="/lukas" component={LukasContainer} />
      <Route path="/team" component={Team} />
      <Route path="/shop" component={EcommContainer} />
      <Route path="/error" component={ErrorView} />
      <Route path="/login" component={LoginContainer} />
      <Route path="/aaron" component={AaronContainer} />
    </Router>
  );
};
