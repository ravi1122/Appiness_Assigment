import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class App extends Component {
  state = {
    formError: null,
    flash: null,
    gotoDashboard: false
  };

  static getDerivedStateFromProps(props, state) {
    const { isLoggedIn, error } = props;

    if (error) {
      return { formError: 'Username and password combination is incorrect.', flash: null };
    } 
    
    if (isLoggedIn) {
      return { formError: null, flash: 'You are successfully logged in.', gotoDashboard: true };
    }

    return null;
  }

  // componentWillReceiveProps(nextProps) {
  //   const { isLoggedIn, error } = nextProps;

  //   if (error) {
  //     this.setState({ formError: 'Username and password combination is incorrect.', flash: null });
  //   } else if (isLoggedIn) {
  //     this.setState({ formError: null, flash: 'You are successfully logged in.' }, () => {
  //       setTimeout(() => {
  //         this.setState({ gotoDashboard: true });
  //       }, 2000);
  //     });
  //   } 
  // }

  onSubmit = e => {
    e.preventDefault();
    const { username, password } = e.currentTarget;

    this.props.login({ email: username.value, name: 'Ravi', password: password.value });
  }

  render() {
    const { flash, formError, gotoDashboard } = this.state;

    if (gotoDashboard) {
      return (<Redirect to="/" />);
    }

    return (
      <div className="login-form">
        <form onSubmit={this.onSubmit}>
          {flash && (
            <div className="form-field">
              <span className="form-flash success">{flash}</span>
            </div>
          )}
          <div className="form-field">
            <span className="form-title">Login</span>
          </div>
          <div className="form-field">
            <span className="form-field__label">Email:</span>
            <input
              className="form-field__input"
              type="text" name="username" placeholder="Enter Email" required
              pattern="^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$"
            ></input>
          </div>
          <div className="form-field">
            <span className="form-field__label">Password:</span>
            <input
              className="form-field__input"
              type="password" name="password" placeholder="Enter password" required
              pattern="^(?=.*\d).{4,10}$"
            ></input>
          </div>
          <div className="form-field">
            <input type="submit" value="Login" className="form-field__input btn"></input>
          </div>
          {formError && (
            <div className="form-field">
              <span className="form-flash error">{formError}</span>
            </div>
          )}
        </form>
      </div>
    );
  }
}