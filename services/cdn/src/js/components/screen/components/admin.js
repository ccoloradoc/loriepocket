import React, { Component } from 'react';
import { UserList, UserForm } from 'admin';


class AdminScreen extends Component {
  render() {
    return (
      <div className="flex-container">
        <div className="row">
          <div className="col s8">
            <UserList/>
          </div>
          <div className="col s4">
            <UserForm/>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminScreen;
