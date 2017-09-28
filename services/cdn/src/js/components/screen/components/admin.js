import React, { Component } from 'react';
import { UserList, UserForm, InviteList } from 'admin';


class AdminScreen extends Component {
  render() {
    return (
      <div className="flex-container">
        <div className="row">
          <div className="col s12">
            <UserList/>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <InviteList/>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminScreen;
