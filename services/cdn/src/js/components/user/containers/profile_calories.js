import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { PlainInputField } from 'form';
import { updateUser } from '../actions';

class ProfileCaloriesForm extends Component {
  constructor(props) {
    super(props);
    this.state = { edit: false };

    this.toggle = this.toggle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    const { initialValues, handleSubmit } = this.props;
    if(this.state.edit) {
      return (
        <form className="inline-form" onSubmit={handleSubmit(this.onSubmit)}>
          <Field name="calories" component={PlainInputField}/>
          <button className="btn-transparent red-text" type="submit"><i className="material-icons">save</i></button>
        </form>
      );
    } else {
      return (
        <div className="inline-form">
          <h5>{ initialValues.calories }</h5>
          <button className="btn-transparent red-text" type="button" onClick={ this.toggle }><i className="material-icons">edit</i></button>
        </div>
      );
    }
  }

  toggle() {
    this.setState({ edit: !this.state.edit });
  }

  onSubmit(values) {
    this.props.updateUser(values, () => {
      this.toggle();
    });
  }
}

function validate(values) {
  const errors = {};
  // Validate the inputs from 'values'
  if (!values.calories) {
    errors.calories = 'Field calories is mandatory.';
  }
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default connect(null ,{ updateUser })
  (reduxForm({ validate, form: 'ProfileCaloriesForm', enableReinitialize: true })(ProfileCaloriesForm));
