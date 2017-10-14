import React from 'react';
import moment from 'moment';

export default function(props) {
  const { item } = props;
  return (
    <li>
      <span className="time">{moment(item.consumedDate).format("h:mm:ss a")}</span>
      <span className="name">{item.name}</span>
      <span className="calories">{item.calories}</span>
      { props.children }
    </li>
  );
}
