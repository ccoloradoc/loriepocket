import React from 'react';

export default function(props) {
  return (
    <div className="card-title">
      <span>{ props.title }</span>
      { props.children }
    </div>
  );
}
