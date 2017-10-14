import React from 'react';
import SummaryDetailItem from './meal_summary_item_details_item';

export default function(props) {
  const { details, onUpdate, onDelete } = props;

  if(details !== undefined && details.length == 0)
    return (<span></span>);

  const items = details.map((item) => {
    return (
      <SummaryDetailItem key={item.id} item={item}>
        <a className="action" onClick={ () => onUpdate(item)}><i className="material-icons">edit</i></a>
        <a className="action red-text" onClick={ () => onDelete(item)}><i className="material-icons">delete</i></a>
      </SummaryDetailItem>
    )
  });

  return (
    <ul className="details">
      { items }
    </ul>
  );

}
