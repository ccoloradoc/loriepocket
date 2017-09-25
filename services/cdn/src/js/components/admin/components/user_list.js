import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchUsers, selectUser, deleteUser } from '../actions';

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
            <th>Actions</th>
        </tr>
      </thead>
    );
  }

  renderUsers() {
    let _self = this;
    return _.map(this.props.users, user => {
      return (
        <tr key={user.id} >
          <td> <Link to={`/user/${user.id}`}>{ user.username }</Link></td>
          <td>{ `${user.firstname} ${user.lastname}`}</td>
          <td><ul className="pipe">{ _self.renderRoles(user) }</ul></td>
          <td>
            <a className="btn-transparent" onClick={ () =>  _self.props.selectUser(user)} ><i className="material-icons">edit</i></a> &nbsp;
            <a className="btn-transparent red-text" onClick={ () =>  _self.props.deleteUser(user)} ><i className="material-icons">delete</i></a>
          </td>
        </tr>
      );
    });
  }

  renderRoles(user) {
    return user.authorities.map((item, index) => {
      return (<li key={index}>{ item.name }</li>);
    });
  }

  renderInvite() {
    if(this.state.invite)
      return <InviteForm/>;
  }

  render() {
    return (
      <div className="card">
        <div className="card-content">
          <div className="card-title">
            <span>User List</span>
          </div>
          <table className="striped">
           { this.renderHead() }
           <tbody>
             { this.renderUsers() }
           </tbody>
         </table>
        </div>
      </div>
    );
  }
}

export default connect((state) => { return { users: state.users }  }, { fetchUsers, selectUser, deleteUser } )(UserList);
