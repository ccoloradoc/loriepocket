import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signout } from '../actions';

class Signout extends Component {
  componentWillMount() {
    this.props.signout();
  }
  render() {
    return (
      <div className="row">
        <div className="col offset-m2 m8">
          <div className="card-panel blue lighten-2">
            <h5 className="white-text">Thank you for visiting!</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { signout })(Signout);
