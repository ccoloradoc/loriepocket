import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchUsers } from '../actions';

class UserList extends Component {
  componentWillMount() {
      this.props.fetchUsers();
  }

  renderHead() {
    return (
      <thead>
        <tr>
            <th>User Name</th>
            <th>Name</th>
            <th>Roles</th>
        </tr>
      </thead>
    );
  }

  renderUsers() {
    let _self = this;
    return _.map(this.props.users, user => {
      return (
        <tr key={user.id}>
          <td> <Link to={`/user/${user.id}`}>{ user.username }</Link></td>
          <td>{ `${user.firstname} ${user.lastname}`}</td>
          <td>{ _self.renderRoles(user) }</td>
        </tr>
      );
    });
  }

  renderRoles(user) {
    return user.authorities.map((item, index) => {
      return (<span key={index} className="chip">{ item.authority }</span>);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="card">
            <div className="card-content">
              <span className="card-title">User List</span>
              <table className="striped">
               { this.renderHead() }
               <tbody>
                 { this.renderUsers() }
               </tbody>
             </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => { return { users: state.users }  }, { fetchUsers } )(UserList);
