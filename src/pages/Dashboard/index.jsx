import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchUsersList } from '../../store/actions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchUsersList();
  }

  render() {
    const { userList = [] } = this.props.data || {};

    return (
      <div className="page dashboard">
        <span className="page--heading">List of Users</span>
        {userList.length > 0 && (
          <div className="list-container">
            <table>
              <thead>
                <tr><th>Id</th><th>Name</th><th>Age</th><th>Gender</th><th>Email</th><th>Phone No.</th></tr>
              </thead>
              <tbody>
                {userList.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td><td>{user.name}</td><td>{user.age}</td>
                    <td>{user.gender}</td><td>{user.email}</td><td>{user.phoneNo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

const mapStatesToProps = state => state;

const mapDispatchToProps = dispatch => bindActionCreators({ fetchUsersList }, dispatch);

export default connect(mapStatesToProps, mapDispatchToProps)(Dashboard);