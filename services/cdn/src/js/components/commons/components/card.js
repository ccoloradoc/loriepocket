import React from 'react';

export default function(props) {
  return (
    <div className="card">
      <div className="card-content">
        { props.children }
      </div>
    </div>
  );
}
