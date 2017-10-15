import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MealList, SearchBar, MealForm, MealSummary, ProfileDetails, ProfileCaloriesForm } from 'user';
import { setActiveProfile, deleteMeal, selectMeal, fetchMeals, fetchSummary, fetchDayDetails, cleanDayDetails } from '../actions';
import { Pagination, Modal, Card, CardHeader } from 'commons';

class Profile extends Component {
  componentWillMount() {
    this.props.setActiveProfile(this.props.params.id, { page: 0, size: 10 });
  }

  componentWillReceiveProps(nextProps) {
    // Route may have changed
    if(nextProps.params.id !== this.props.params.id) {
      this.props.setActiveProfile(nextProps.params.id, { page: 0, size: 10 });
    }
  }

  render() {
    const { profile, summary, summaryDetail, page } = this.props;
    return (
      <div className="flex-container">
        <div className="row">
          <div className="col s12">
            <ProfileDetails profile={profile}>
              <ProfileCaloriesForm initialValues={profile}/>
            </ProfileDetails>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <Card>
              <CardHeader title="Summary">
                <a className="btn-floating btn right red" onClick={ () => { this.props.selectMeal({}) } }>
                  <i className="material-icons">add</i>
                </a>
              </CardHeader>
              <SearchBar onSearch={this.search.bind(this)}/>
              <MealSummary summary={summary}
                limit={profile.calories}
                summaryDetail={summaryDetail}
                onExpand={this.toggleDayDetails.bind(this)}
                onUpdate={this.props.selectMeal}
                onDelete={this.deleteMeal.bind(this)}/>
              <Pagination page={page} onPaginate={ this.search.bind(this) }/>
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
    this.props.fetchSummary(this.props.profile.id, { ...this.props.filter, ...filter});
  }

  toggleDayDetails(day) {
    if(this.props.summaryDetail.hasOwnProperty(day.consumedDate)) {
      this.props.cleanDayDetails(day.consumedDate);
    } else {
      this.props.fetchDayDetails(this.props.profile.id, day.consumedDate);
    }

  }

  closeModal(date) {
    this.props.selectMeal(null);
    this.props.fetchSummary(this.props.profile.id, this.props.filter);
    this.props.fetchDayDetails(this.props.profile.id, date);
  }

  deleteMeal(meal) {
    this.props.deleteMeal(meal, this.props.profile, (date) => {
      this.props.fetchSummary(this.props.profile.id, this.props.filter);
      this.props.fetchDayDetails(this.props.profile.id, date);
    }) ;

  }
}

export default connect(
  (state) => { return {
    profile: state.profile, meal: state.meal, page: state.page, filter: state.filter,
    summary: state.summary, summaryDetail: state.summaryDetail }  },
  { setActiveProfile, deleteMeal, selectMeal, fetchMeals, fetchSummary, fetchDayDetails, cleanDayDetails } )(Profile);
