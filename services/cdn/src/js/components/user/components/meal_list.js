import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { MealForm } from 'user';
import { fetchMeals, deleteMeal, selectMeal } from '../actions';

class MealList extends Component {
  componentWillReceiveProps(nextProps) {
    if(nextProps.user && nextProps.meals.empty) {
      this.props.fetchMeals(nextProps.user);
    }
  }

  renderHead() {
    return (
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Calories</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
    );
  }

  renderUsers() {
    let _self = this;
    if(this.props.meals.empty)
      return;

    return _.map(this.props.meals, meal => {
      return (
        <tr key={meal.id} >
          <td> {meal.id}</td>
          <td>{meal.name}</td>
          <td>{meal.calories}</td>
          <td>{ moment(new Date(meal.consumedDate)).format('ddd, MMMM Do YYYY, h:mm a') }</td>
          <td>
            <a className="btn-transparent" onClick={ () => { _self.props.selectMeal(meal) } }><i className="material-icons">edit</i></a> &nbsp;
            <a className="btn-transparent red-text" onClick={ () => { _self.props.deleteMeal(meal, _self.props.activeProfile) } }><i className="material-icons">delete</i></a>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="card">
        <div className="card-content">
          <div className="card-title">
            <span>Calories List</span>
            <a className="btn-floating btn right red" onClick={ () => { this.props.selectMeal({}) } }>
              <i className="material-icons">add</i>
            </a>
          </div>
          <table className="striped">
           { this.renderHead() }
           <tbody>
             { this.renderUsers() }
           </tbody>
         </table>
        </div>
        { this.renderForm() }
      </div>
    );
  }

  renderForm() {
    if(this.props.meal !== null) {
      return (
        <div className="overlay-modal">
          <div>
            <MealForm onComplete={ this.closeModal.bind(this) }/>
          </div>
        </div>
      );
    }
  }

  closeModal() {
    console.log('closemodal')
    this.props.selectMeal(null);
  }
}

export default connect(
  (state) => { return { meals: state.meals, meal: state.meal, activeProfile: state.activeProfile }  }, // , me: state.me
  { fetchMeals, deleteMeal, selectMeal } )(MealList);
