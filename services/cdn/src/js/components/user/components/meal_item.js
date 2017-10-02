import React from 'react';

export default function(props) {
  const { meal } = props;
  const date = new Date(meal.consumedDate);
  return (
    <tr>
      <td> {meal.id}</td>
      <td>{meal.name}</td>
      <td>{meal.calories}</td>
      <td>{ date.toLocaleString() }</td>
      <td>
        { props.children }
      </td>
    </tr>
  );
}
