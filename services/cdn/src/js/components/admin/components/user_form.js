import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { InputField, HiddenField, CheckboxField } from 'form';
import { updateUser, updateRole, fetchRoles } from '../actions';

class UserForm extends Component {
  componentWillMount() {
      this.props.fetchRoles();
  }

  onSubmit(values) {
    this.props.updateUser(values);
  }

  render() {
    const { handleSubmit } = this.props;
    if(!this.props.initialValues)
     return (<span></span>);

    return (
      <div className="card">
        <div className="card-content">
          <span className="card-title">Update</span>
          <form className="row" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field name="id"  type="hidden" component={ HiddenField }/>
            <Field label="Username:" name="username" type="text" component={ InputField }/>
            <Field label="First Name:" name="firstname" type="text" component={ InputField }/>
            <Field label="Last Name:" name="lastname" type="text" component={ InputField }/>
            <Field name="authorities" type="hidden" component={ HiddenField }/>
            { this.renderRoles() }
            <div className="input-field col s12 right-align">
              <button type="submit" className="waves-effect waves-light btn right-align">Save</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  renderRoles() {
    const options = this.props.roles;
    // [
    //     { id: '1', name: 'ROLE_USER' },
    //     { id: '2', name: 'ROLE_ADMIN' },
    //     { id: '3', name: 'ROLE_MANAGER' }
    // ];
    const formAutorities = this.props.stateForm.values.authorities;

    return _.map(options, (option) => {
      const selected = option.selected = formAutorities.some((role) => {
        return role.name == option.name;
      });

      let _self = this;
      return (
        <span
          key={option.id}
          className={`chip ${ selected ? 'blue white-text' : '' }`}
          onClick={ () => { _self.props.updateRole({userId:  _self.props.initialValues.id, role: option }); } }
          >{ option.name }</span>
      );
    });
  }
}

function validate(values) {
  const errors = {};
  // Validate the inputs from 'values'
  if (!values.username) {
    errors.username = 'Campo username es necesario.';
  }
  if (!values.firstname) {
    errors.firstname = 'Campo firstname es necesario.';
  }
  if (!values.lastname) {
    errors.lastname = 'Campo lastname es necesario.';
  }
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default connect(
  (state) => ({ initialValues: state.user, stateForm: state.form.UserForm, roles: state.roles }) ,
  { updateUser, updateRole, fetchRoles })
  (reduxForm({ validate, form: 'UserForm', enableReinitialize: true, keepDirtyOnReinitialize: true })(UserForm));
