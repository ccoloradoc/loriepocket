import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Pagination extends Component {
  renderPages() {
    const { number, totalPages } = this.props.page;
    const pages = [];

    // Back
    if(number > 0) {
      pages.push(<li key={100} className="waves-effect"><a onClick={ () => this.props.move(number - 1) }><i className="material-icons">chevron_left</i></a></li>);
    } else {
      pages.push(<li key={101} className="disabled"><a><i className="material-icons">chevron_left</i></a></li>);
    }

    // Pages
    for(var i = 0; i < this.props.page.totalPages; i++) {
      if(this.props.page.number == i ) {
        pages.push(<li key={i} className="active"><a>{i + 1}</a></li>);
      } else {
        pages.push(<li key={i} className="disabled"><a>{i + 1}</a></li>);
      }
    }

    // Next
    if(number !== (totalPages - 1))
      pages.push(<li key={102} className="waves-effect"><a onClick={ () => this.props.move(number + 1) }><i className="material-icons">chevron_right</i></a></li>);
    else
      pages.push(<li key={103} className="disabled"><a><i className="material-icons">chevron_right</i></a></li>);

    return pages;
  }

  render() {
    const { size, totalElements, number, totalPages } = this.props.page;
    const itemsDisplayed = number == (totalPages - 1) ? (totalElements - number * size) : size;
    return (
      <div className="right-align">
        <ul className="pagination">
          <li className="waves-effect"><a>{ itemsDisplayed } of { totalElements }</a></li>
          <li className="waves-effect"><a onClick={ () => this.props.move(0) }><i className="material-icons">skip_previous</i></a></li>
          { this.renderPages() }
          <li className="waves-effect"><a onClick={ () => this.props.move(totalPages - 1) }><i className="material-icons">skip_next</i></a></li>
        </ul>
      </div>
    );
  }
}

// <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_left</i></a></li>

export default connect((state) => { return { page: state.page } })(Pagination);
