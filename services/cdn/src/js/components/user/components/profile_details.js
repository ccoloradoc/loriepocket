import React from 'react';

export default function(props) {
  const profile  = props.profile;

  if(!profile.username)
    return (<div></div>);

  return (
    <div>
      <div className="profile-header">
        <h4>{ `@${profile.username}`}</h4>
        { props.children }
      </div>
      <h5>{ `${profile.firstname} ${profile.lastname}` }</h5>
    </div>
  );
}
