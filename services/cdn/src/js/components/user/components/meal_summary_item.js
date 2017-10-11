import React from 'react';
import moment from 'moment';

export default function(props) {
  const { item } = props;
  const date = moment(item.consumedDate);
  return (
    <div className="item">
      <span className="day">{date.format("dddd")}</span>
      <span className="date">{date.format("MMMM Do YYYY")}</span>
      <span className="calories">{item.calories}</span>
      { props.children }
    </div>
  );
}
