import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import MealItem from './meal_item';

class MealList extends Component {
  renderUsers() {
    let _self = this;
    return _.map(this.props.meals, meal => {
      return (
        <MealItem key={meal.id} meal={meal}>
          <a className="btn-transparent" onClick={ () => { _self.props.onUpdate(meal) } }><i className="material-icons">edit</i></a> &nbsp;
          <a className="btn-transparent red-text" onClick={ () => { _self.props.onDelete(meal, _self.props.profile) } }><i className="material-icons">delete</i></a>
        </MealItem>
      );
    });
  }

  render() {
    return (
      <div>
        <table className="striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Calories</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
           { this.renderUsers() }
          </tbody>
       </table>
       { this.props.children }
      </div>
    );
  }
}

export default MealList;
