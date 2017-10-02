import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

export default function(props) {
    const { size, totalElements, number, totalPages } = props.page;
    const itemsDisplayed = number == (totalPages - 1) ? (totalElements - number * size) : size;
    const backClass = number > 0 ? 'waves-effect' : 'disabled';
    const backEvn = number > 0 ? () => props.onPaginate({page: number - 1}) : () => {} ;
    const nextClass = number !== (totalPages - 1) ? 'waves-effect' : 'disabled';
    const nextEvn = number !== (totalPages - 1) ? () => props.onPaginate({page: number + 1}) : () => {} ;
    const pages = [];

    // Pages
    for(var i = 0; i < totalPages; i++) {
      if(number == i ) {
        pages.push(<li key={i} className="active"><a>{i + 1}</a></li>);
      } else {
        pages.push(<li key={i} className="disabled"><a>{i + 1}</a></li>);
      }
    }

    return (
      <div className="right-align">
        <ul className="pagination">
          <li className="waves-effect"><a>{ itemsDisplayed } of { totalElements }</a></li>
          <li className="waves-effect"><a onClick={ () => props.onPaginate({ page: 0 }) }><i className="material-icons">skip_previous</i></a></li>
          <li className={backClass}><a onClick={ backEvn }><i className="material-icons">chevron_left</i></a></li>
          { pages }
          <li className={nextClass}><a onClick={ nextEvn }><i className="material-icons">chevron_right</i></a></li>
          <li className="waves-effect"><a onClick={ () => props.onPaginate({ page: totalPages - 1}) }><i className="material-icons">skip_next</i></a></li>
        </ul>
      </div>
    );
}
