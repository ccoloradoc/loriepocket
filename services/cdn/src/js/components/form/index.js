import React, { Component } from 'react';
import Select from 'react-select';

export function TimePicker(field) {
  const { meta: { active, touched, error, valid } } = field;
  const className = `text-help ${touched && error ? 'red-text' : ''}`;
  // console.log('meta', field.meta);

  return (
    <div className="input-field col s12">
      <input {...field.input} type={ field.type || 'text' } className="validate timepicker"/>
      <label htmlFor="username" className={ active || touched || valid ? 'active' : ''}>{field.label}</label>
      <div className={className}>
        {touched ? error : ''}
      </div>
    </div>
  );
}

export function DatePicker(field) {
  const { meta: { active, touched, error, valid } } = field;
  const className = `text-help ${touched && error ? 'red-text' : ''}`;

  return (
    <div className="input-field col s12">
      <input {...field.input} type={ field.type || 'text' } className="validate datepicker"/>
      <label htmlFor="username" className={ active || touched || valid ? 'active' : ''}>{field.label}</label>
      <div className={className}>
        {touched ? error : ''}
      </div>
    </div>
  );
}

export function InputField(field) {
  const { meta: { active, touched, error, valid } } = field;
  const className = `text-help ${touched && error ? 'red-text' : ''}`;

  return (
    <div className="input-field col s12">
      <input {...field.input} type={ field.type || 'text' } className="validate"/>
      <label htmlFor="username" className={ active || touched || valid ? 'active' : ''}>{field.label}</label>
      <div className={className}>
        {touched ? error : ''}
      </div>
    </div>
  );
};

export function SimpleInputField(field) {
  const { meta: { active, touched, error, valid } } = field;
  const className = `text-help ${touched && error ? 'red-text' : ''}`;

  return (
    <div className="input">
      <input {...field.input} type={ field.type || 'text' } className="validate"/>
      <div className={className}>
        {touched ? error : ''}
      </div>
    </div>
  );
};


export function HiddenField(field) {
  return (
    <input {...field.input} type={ field.type || 'text' } />
  );
}

export function CheckboxField(field) {
  return (
    <input {...field.input} type="checkbox" />
  );
}

export function MultipleSelect(field) {
  return (
    <Select
      {...field.input}
      onChange={(value) => {return field.input.onChange(value.map(p => p.value))}}
      onBlur={() => field.input.onBlur([...field.input.value])}
      options={field.options}
      multi={true}
    />
  );
}
