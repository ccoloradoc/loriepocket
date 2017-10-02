import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MealList } from 'user';
import { setActiveProfile, deleteMeal, selectMeal, fetchMeals } from '../actions';
import { Pagination, Modal, Card, CardHeader } from 'commons';
import { SearchBar, MealForm } from 'user';

class Profile extends Component {
  componentWillMount() {
    this.props.setActiveProfile(this.props.params.id, this.props.filter);
  }

  renderHeader() {
    const profile  = this.props.profile;
    if(profile.username)
      return (<h4>{ `${profile.firstname} ${profile.lastname} (@${profile.username}) `}</h4>);
  }

  render() {
    const { meals, page } = this.props;
    return (
      <div className="flex-container">
        <div className="row">
          <div className="col s12">
            { this.renderHeader() }
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <Card>
              <CardHeader title="MealList">
                <a className="btn-floating btn right red" onClick={ () => { this.props.selectMeal({}) } }>
                  <i className="material-icons">add</i>
                </a>
              </CardHeader>
              <SearchBar onSearch={this.search.bind(this)}/>
              <MealList meals={meals} onUpdate={this.props.selectMeal} onDelete={this.props.deleteMeal} >
                <Pagination page={page} onPaginate={ this.search.bind(this) }/>
              </MealList>
            </Card>
            { this.renderForm() }
          </div>
        </div>
      </div>
    );
  }

  renderForm() {
    if(this.props.meal !== null) {
      return (
        <Modal>
          <MealForm onComplete={ this.closeModal.bind(this) }/>
        </Modal>
      );
    }
  }

  search(filter) {
    this.props.fetchMeals(this.props.profile, { ...this.props.filter, ...filter});
  }

  closeModal() {
    this.props.selectMeal(null);
  }
}

export default connect(
  (state) => { return { profile: state.profile, meals: state.meals, meal: state.meal, page: state.page, filter: state.filter }  },
  { setActiveProfile, deleteMeal, selectMeal, fetchMeals } )(Profile);
