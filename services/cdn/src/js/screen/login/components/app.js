import React, { Component } from 'react';
import { Header } from 'screen';
import { LoginForm } from 'authentication';

class Application extends Component {
  render() {
    return (
      <div className="application">
        <Header/>
        { this.props.children }
      </div>
    );
  }
}

export default Application;
