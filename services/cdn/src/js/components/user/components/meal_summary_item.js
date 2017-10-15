import React from 'react';
import moment from 'moment';

export default function(props) {
  const { item, limit } = props;
  const date = moment(item.consumedDate);
  const iconClass = limit < item.calories ? 'material-icons red-text' : 'material-icons green-text';
  return (
    <div className="item">
      <span className="day">{date.format("dddd")}</span>
      <span className="date">{date.format("MMMM Do YYYY")}</span>
      <span className="calories">{item.calories}<i className={iconClass}>fiber_manual_record</i></span>
      { props.children }
    </div>
  );
}
