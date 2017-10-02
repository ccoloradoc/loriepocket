import React from 'react';

export default function(props) {
  return (
    <div className="overlay-modal">
      <div>
        { props.children }
      </div>
    </div>
  )
}
