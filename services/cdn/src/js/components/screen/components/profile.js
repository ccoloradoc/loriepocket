import React, { Component } from 'react';
import { MealList, MealForm } from 'user';

class Profile extends Component {
  render() {
    return (
      <div className="flex-container">
        <div className="row">
          <div className="col s8">
            <MealList/>
          </div>
          <div className="col s4">
            <MealForm/>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
