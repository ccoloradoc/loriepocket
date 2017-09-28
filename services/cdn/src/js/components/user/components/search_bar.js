import moment from 'moment';
import  React , { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { DatePicker } from 'form';
import { updateDate, fetchMeals } from '../actions';

class SearchBar extends Component {
  componentDidMount() {
    const properties = {
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: false
    }
    $("input[name='startDateHelper']").pickadate({...properties, onSet: this.onUpdateStarDate.bind(this)});
    $("input[name='endDateHelper']").pickadate({...properties, onSet: this.onUpdateEndDate.bind(this)});
  }

  onUpdateStarDate({ select }) {
    this.props.updateDate({ startDate: select });
  }

  onUpdateEndDate({ select }) {
    this.props.updateDate({ endDate: select });
  }

  onSubmit(values) {
    this.props.fetchMeals(this.props.activeProfile, {
      startDate: new Date(values.startDate),
      endDate: new Date(values.endDate),
      page: 0,
      size: this.props.page.size
    })
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form className="searchbar" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field label="Date:" placeholder="From" name="startDateHelper" component={ DatePicker }/>
        <Field label="Date:" placeholder="To" name="endDateHelper" component={ DatePicker }/>
        <button className="btn" type="submit"><i className="material-icons">search</i></button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  // Validate the inputs from 'values'
  if (!values.startDate) {
    errors.startDate = 'Field From is mandatory.';
  }
  if (!values.endDate) {
    errors.endDate = 'Field To is mandatory.';
  }
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}


export default connect(
  (state) => ({ initialValues: state.filter, page: state.page, activeProfile: state.activeProfile }) ,
  { updateDate, fetchMeals })
  (reduxForm({ validate, form: 'SearchBar', enableReinitialize: true })(SearchBar));
