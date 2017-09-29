import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { MealForm, SearchBar } from 'user';
import { Pagination } from 'commons';
import { fetchMeals, deleteMeal, selectMeal } from '../actions';

class MealList extends Component {
  componentWillReceiveProps(nextProps) {
    if(nextProps.user.links && nextProps.meals == null) {
      this.props.fetchMeals(nextProps.user, { size: 10 });
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
    if(this.props.meals == null)
      return;

    return _.map(this.props.meals, meal => {
      const date = new Date(meal.consumedDate);
      return (
        <tr key={meal.id} >
          <td> {meal.id}</td>
          <td>{meal.name}</td>
          <td>{meal.calories}</td>
          <td>{ date.toLocaleString() }</td>
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
          <SearchBar/>
          <table className="striped">
           { this.renderHead() }
           <tbody>
             { this.renderUsers() }
           </tbody>
         </table>
         <Pagination move={this.move.bind(this)}/>
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

  move(page) {
    let filter = {};

    if(this.props.filter.startDate)
      filter.startDate = new Date(this.props.filter.startDate);

      if(this.props.filter.endDate)
        filter.endDate = new Date(this.props.filter.endDate);

    this.props.fetchMeals(this.props.user, { ...filter, page, size: this.props.page.size });
  }

  closeModal() {
    this.props.selectMeal(null);
  }
}

export default connect(
  (state) => { return { meals: state.meals, meal: state.meal,
                        activeProfile: state.activeProfile,
                        page: state.page,
                        filter: state.form.SearchBar ? state.form.SearchBar.values || {} : {} }  }, // , me: state.me
  { fetchMeals, deleteMeal, selectMeal } )(MealList);
