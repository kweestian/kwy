import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

class LoginForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
      const {email, password} = this.refs;
      this.props.handleLogin(email.value, password.value);
      email.value = password.value = '';
      browserHistory.push('/admin');
  }

  render() {
    return (
      <div className="form-horizontal inline-form">
        <h2 className="form-group inline-form__input">Login</h2>
        <input placeholder="Email address" type="email" className="form-control inline-form__input" ref="email" />
        <input placeholder="Password" type="password" className="form-control inline-form__input" ref="password" />
        <button className="btn btn-default" onClick={this.handleLogin}>Login</button>
      </div>
    )
  }
}

LoginForm.contextTypes = {
  router: React.PropTypes.object
};

LoginForm.PropTypes = {
  handleLogin: PropTypes.func.isRequired
};

export default LoginForm;
