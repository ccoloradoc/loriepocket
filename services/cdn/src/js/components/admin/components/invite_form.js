import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { SimpleInputField } from 'form';
import { sendInvite } from '../actions';

class InviteForm extends Component {
  onSubmit(invite){
    this.props.sendInvite(invite, this.props.onComplete);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="row">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className="input-field input-group">
            <Field name="email" component={SimpleInputField}/>

            <button type="submit" className="btn red">
              <i className="material-icons">send</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

// <input type="text" placeholder="robert@smith.com" className="validate"/>

function validate(values) {
  const errors = {};
  // Validate the inputs from 'values'
  if (!values.email) {
    errors.email = 'Field email is mandatory.';
  }
  return errors;
}

export default connect(null,{ sendInvite })
  (reduxForm({ validate, form: 'InviteForm'})(InviteForm));
