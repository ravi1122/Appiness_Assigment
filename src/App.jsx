import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Link, Redirect, Switch, withRouter } from 'react-router-dom';

import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';
import NotFoundPage from './pages/NotFound';
import { login, logout } from './store/actions';

import './style.scss';

class App extends Component {
  onClickLogOut = e => {
    e.preventDefault();

    this.props.logout();
  }

  render() {
    const { data: { isLoggedIn }, error, location } = this.props || {};

    return (
      <div className="app">
        <header className="app--header">
          <span className="logo">Ravi Ranjan</span>
          {location.pathname !== '/login' && (isLoggedIn 
            ? <Link onClick={this.onClickLogOut} to="/logout" className="link link--logout">Log Out</Link> 
            : <Link to="login" className="link link--login">Log In</Link>)}
        </header>
        <section className="app--body">
          <Switch>
            <Route exact path="/login" render={_props => {
              return (
                <LoginPage 
                  {..._props}
                  login={this.props.login} 
                  isLoggedIn={isLoggedIn} 
                  error={error}
                />
              )}} 
            />
            <Route exact path="/" render={_props => {
              if (isLoggedIn) {
                return (<DashboardPage />);
              }

              return (<Redirect to="/login" />);
            }} />
            <Route component={NotFoundPage}/>
          </Switch>
        </section>
      </div>
    );
  }
}

const mapStatesToProps = state => state;

const mapDispatchToProps = dispatch => bindActionCreators({ login, logout }, dispatch);

export default  connect(mapStatesToProps, mapDispatchToProps)(withRouter(App));