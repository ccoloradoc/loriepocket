import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { InputField, HiddenField, CheckboxField, DatePicker, TimePicker } from 'form';
import { updateMeal, saveMeal, updateConsumedDate, updateConsumedDateTime, selectMeal } from '../actions';

class MealForm extends Component {
  componentDidUpdate() {
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: false, // Close upon selecting a date,
      onSet: this.onUpdateDate.bind(this)
    });

    let now = new Date();

    $('.timepicker').timepicker({
        timeFormat: 'h:mm p',
        interval: 30,
        defaultTime: `${now.getHours()}`,
        startTime: `${now.getHours() - 4 > 0 ? now.getHours() - 2 : now.getHours() + 22 }:00`,
        dynamic: false,
        dropdown: true,
        scrollbar: true,
        change: this.onUpdateHour.bind(this)
    });
  }

  onUpdateHour(time) {
    let date = new Date(((time.getUTCHours() * 60) + time.getUTCMinutes()) * 60000);
    this.props.updateConsumedDateTime(date);
  }

  onUpdateDate({select}) {
    this.props.updateConsumedDate(new Date(select));
  }

  onSubmit(values) {
    //Fixing datetime mess
    values.consumedDate = values.consumedDateDate;
    values.consumedDate.setHours(values.consumedDateTime.getHours());
    values.consumedDate.setMinutes(values.consumedDateTime.getMinutes());
    delete values['consumedDateDate'];
    delete values['consumedDateTime'];

    console.log('values', values);
    if(values.id) {
      this.props.updateMeal(values, this.onComplete.bind(this));
    } else {
      this.props.saveMeal(values, this.onComplete.bind(this));
    }

  }

  onComplete() {
    this.props.selectMeal(undefined);
  }

  render() {
    const { handleSubmit } = this.props;
    if(!this.props.initialValues)
     return (<span></span>);

    return (
      <div className="card">
        <div className="card-content">
          <span className="card-title">Meal</span>
          <form className="row" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field name="id"  type="hidden" component={ HiddenField }/>
            <Field name="userId"  type="hidden" component={ HiddenField }/>
            <Field label="Meal:" name="name" type="text" component={ InputField }/>
            <Field label="Calories:" name="calories" type="text" component={ InputField }/>
            <Field label="Date:" name="consumedDatePlaceholder" component={ DatePicker }/>
            <Field label="Hour:" name="consumedDateHour" component={ TimePicker }/>
            <div className="input-field col s12 right-align">
              <button type="submit" className="waves-effect waves-light btn right-align">Save</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  // Validate the inputs from 'values'
  if (!values.name) {
    errors.name = 'Field name is mandatory.';
  }
  if (!values.calories) {
    errors.calories = 'Field calories is mandatory.';
  }
  if (!values.consumedDate) {
    errors.consumedDate = 'Field consumedDate is mandatory.';
  }
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default connect(
  (state) => ({ initialValues: state.meal }) ,
  { updateMeal, saveMeal, updateConsumedDate, updateConsumedDateTime, selectMeal })
  (reduxForm({ validate, form: 'MealForm', enableReinitialize: true })(MealForm));
