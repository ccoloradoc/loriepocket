import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { InputField } from 'form';
import { singin, clearAuthError } from '../actions';

class Signin extends Component {
  componentWillMount() {
    console.log('Props', this.props.location.query.success);
    if(!this.props.location.query.success) {
      this.props.clearAuthError();
    }
  }

  onSubmit(values) {
    this.props.singin(values);
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
              <img src="https://lorempixel.com/600/300/nature/3"/>
              <span className="card-title">Sign In</span>
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <form className="row" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                  <Field label="Username:" id="username" name="username" type="text" component={ InputField }/>
                  <Field label="Password:" id="password" name="password" type="password" component={ InputField }/>
                  <div className="input-field col s12 right-align">
                    <button type="submit" className="waves-effect waves-light btn right-align">Sign In</button>
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
    errors.username = 'Campo username es necesario.';
  }
  if (!values.password) {
    errors.password = 'Campo password es necesario.';
  }
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'Signin'
})(
  connect(state => ({ auth: state.auth }), { singin, clearAuthError })(Signin)
);
