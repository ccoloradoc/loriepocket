import React, { Component } from 'react';

export function InputField(field) {
  const { meta: { active, touched, error } } = field;
  const className = `text-help ${touched && error ? 'red-text' : ''}`;

  return (
    <div className="input-field col s12">
      <input {...field.input} type={ field.type || 'text' } className="validate"/>
      <label htmlFor="username" className={ active || touched ? 'active' : ''}>{field.label}</label>
      <div className={className}>
        {touched ? error : ''}
      </div>
    </div>
  );
};
