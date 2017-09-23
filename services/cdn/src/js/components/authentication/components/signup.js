import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { InputField } from 'form';
import { signup, clearAuthError } from '../actions';

class Signup extends Component {
  componentWillMount() {
    this.props.clearAuthError();
  }

  onSubmit(values) {
    this.props.signup(values);
  }

  displayErrorMessage() {
    const { message } = this.props.auth;
    if(message) {
      const color = message.type == 'danger' ? 'red' : 'green';
      return (
        <div className={`card-panel ${color} lighten-4`}>
          <h5 className={`${color}-text text-darken-4`}>{ message.text }</h5>
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="row">
        <div className="col s12 offset-m2 m8 offset-l3 l6">
          { this.displayErrorMessage() }
          <div className="card">
            <div className="card-image">
              <img src="https://lorempixel.com/600/300/nature/5"/>
              <span className="card-title">Sign Up</span>
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <form className="row" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                  <Field label="Username:" name="username" type="text" component={ InputField }/>
                  <Field label="First Name:" name="firstname" type="text" component={ InputField }/>
                  <Field label="Last Name:" name="lastname" type="text" component={ InputField }/>
                  <Field label="Password:" name="password" type="password" component={ InputField }/>
                  <Field label="Type password again:" name="validatedPassword" type="password" component={ InputField }/>
                  <div className="input-field col s12 right-align">
                    <button type="submit" className="waves-effect waves-light btn right-align">Sign Up</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


function validate(values) {
  const errors = {};
  // Validate the inputs from 'values'
  if (!values.username) {
    errors.username = 'Field [username] is mandatory.';
  }

  if (!values.firstname) {
    errors.firstname = 'Field [firstname] is mandatory.';
  }

  if (!values.lastname) {
    errors.lastname = 'Field [lastname] is mandatory.';
  }

  if (!values.password) {
    errors.password = 'You need to validate your password.';
  }

  if (!values.validatedPassword) {
    errors.validatedPassword = 'You need to validate your password.';
  }

  if(values.password != values.validatedPassword) {
    errors.validatedPassword = 'Password does not match.';
  }

  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'Signup'
})(
  connect(state => ({ auth: state.auth }), { signup, clearAuthError })(Signup)
);
