import React, { Component } from 'react';
import moment from 'moment';
import MealSummaryItem from './meal_summary_item';
import MealSummaryItemDetails from './meal_summary_item_details';

export default function(props) {
  const { limit, summary, summaryDetail, onExpand, onUpdate, onDelete } = props;

  const items = summary.map(item => {
    const date = item.consumedDate;
    const details = summaryDetail.hasOwnProperty(date) ? summaryDetail[date] : [];
    const collapseIcon = summaryDetail.hasOwnProperty(date) ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
    return (
      <li key={item.consumedDate}>
        <MealSummaryItem item={item} limit={limit} onExpand={onExpand}>
          <a className="action" onClick={ () => onExpand(item) }>
            <i className="material-icons">{collapseIcon}</i>
          </a>
        </MealSummaryItem>
        <MealSummaryItemDetails details={details} onUpdate={onUpdate} onDelete={onDelete}/>
      </li>
    );
  });

  return (
    <ul className="summary">
      { items }
    </ul>
  );
}
