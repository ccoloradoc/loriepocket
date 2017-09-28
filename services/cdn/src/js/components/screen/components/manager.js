import React, { Component } from 'react';
import { SimpleUserList } from 'admin';


class ManagerScreen extends Component {
  render() {
    return (
      <div className="flex-container">
        <div className="row">
          <div className="col s12">
            <SimpleUserList/>
          </div>
        </div>
      </div>
    );
  }
}

export default ManagerScreen;
