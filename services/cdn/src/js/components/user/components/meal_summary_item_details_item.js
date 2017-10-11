import React from 'react';
import moment from 'moment';

export default function(props) {
  const { item } = props;
  return (
    <li>
      <span className="time">{moment(item.consumedDate).format("h:mm:ss a")}</span>
      <span className="name">{item.name}</span>
      <span className="calories">{item.calories}</span>
      <a className="action"><i className="material-icons">edit</i></a>
      <a className="action red-text"><i className="material-icons">delete</i></a>
    </li>
  );
}
