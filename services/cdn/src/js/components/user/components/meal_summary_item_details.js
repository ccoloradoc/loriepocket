import React from 'react';
import SummaryDetailItem from './meal_summary_item_details_item';

export default function(props) {
  const { details } = props;

  if(details !== undefined && details.length == 0)
    return (<span></span>);

  const items = details.map((item) => {
    return (<SummaryDetailItem key={item.id} item={item} />)
  });

  return (
    <ul className="details">
      { items }
    </ul>
  );

}
