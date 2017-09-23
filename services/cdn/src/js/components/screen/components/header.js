import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
  renderMenu() {
    if(this.props.auth.authenticated) {
      return [
        <li key={1}><Link to="/profile"><i className="material-icons small">account_circle</i></Link></li>,
        <li key={2}><Link to="/"><i className="material-icons small">settings</i></Link></li>,
        <li key={3}><Link to="/signout"><i className="material-icons small">input</i></Link></li>
      ];
    } else {
      return [
        <li key={1}><Link to="/signin"><i className="material-icons small">input</i></Link></li>,
        <li key={2}><Link to="/signup"><i className="material-icons small">input</i></Link></li>
      ];
    }
  }

  renderMenuMobile() {
    if(this.props.auth.authenticated) {
      return [
        <li key={1} className="bold"><Link to="/profile" className="waves-effect waves-teal"><i className="material-icons small">account_circle</i>Me</Link></li>,
        <li key={2} className="bold"><Link href="/" className="waves-effect waves-teal"><i className="material-icons small">settings</i>Admin</Link></li>
      ];
    } else {
      return [
        <li key={1} className="bold"><Link href="/signin" className="waves-effect waves-teal"><i className="material-icons small">input</i>Sign In</Link></li>,
        <li key={2} className="bold"><Link href="/signup" className="waves-effect waves-teal"><i className="material-icons small">input</i>Sign Out</Link></li>
      ];
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
            <a href="#" className="brand-logo">
                <img src="/images/logo_linear_trans.png" alt=""/>
            </a>
            <a href="#" data-activates="mobile-demo" className="button-collapse">
                <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down">
              { this.renderMenu() }
            </ul>
            <ul className="side-nav" id="mobile-demo">
              <li className="logo">
                  <a id="logo-container" href="#!/" className="brand-logo">
                      <img className="responsive-img" src="/images/logo.png" alt=""/>
                  </a>
              </li>
              { this.renderMenuMobile() }
            </ul>
        </div>
      </nav>
    );
  }
}

export default connect((state) => {
  return {
    auth: state.auth
  };
}, { })(Header);
