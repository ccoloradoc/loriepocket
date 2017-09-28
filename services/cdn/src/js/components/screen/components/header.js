import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
  renderMenu() {
    if(this.props.auth.authenticated) {
      const menuItems = [];
      const roles = localStorage.getItem('authorities');
      menuItems.push(<li key={1}><Link to="/profile" activeClassName="active"><i className="material-icons small">account_circle</i></Link></li>);
      if(roles.indexOf('ROLE_ADMIN') != -1) {
        menuItems.push(<li key={2}><Link to="/admin" activeClassName="active"><i className="material-icons small">supervisor_account</i></Link></li>);
      } else if(roles.indexOf('ROLE_MANAGER') != -1) {
        menuItems.push(<li key={2}><Link to="/manager" activeClassName="active"><i className="material-icons small">supervisor_account</i></Link></li>);
      }
      menuItems.push(<li key={3}><Link to="/signout" activeClassName="active"><i className="material-icons small">power_settings_new</i></Link></li>);
      return menuItems;
    } else {
      return [
        <li key={1}><Link to="/signin"><i className="material-icons small">input</i></Link></li>,
        <li key={2}><Link to="/signup"><i className="material-icons small">mode_edit</i></Link></li>
      ];
    }
  }

  renderMenuMobile() {
    if(this.props.auth.authenticated) {
      const menuItems = [];
      const roles = localStorage.getItem('authorities');
      menuItems.push(<li key={1} className="bold"><Link to="/profile"  activeClassName="active" className="waves-effect waves-teal"><i className="material-icons small">account_circle</i>Me</Link></li>);
      if(roles.indexOf('ROLE_ADMIN') != -1) {
        menuItems.push(<li key={2} className="bold"><Link href="/admin"  activeClassName="active" className="waves-effect waves-teal"><i className="material-icons small">supervisor_account</i>Admin</Link></li>);
      } else if(roles.indexOf('ROLE_MANAGER') != -1) {
        menuItems.push(<li key={2} className="bold"><Link href="/manager"  activeClassName="active" className="waves-effect waves-teal"><i className="material-icons small">supervisor_account</i>Manager</Link></li>);
      }
      menuItems.push(<li key={3} className="bold"><Link href="/signout"  activeClassName="active" className="waves-effect waves-teal"><i className="material-icons small">power_settings_new</i>Exit</Link></li>);
      return menuItems;
    } else {
      return [
        <li key={1} className="bold"><Link href="/signin" className="waves-effect waves-teal"><i className="material-icons small">input</i>Sign In</Link></li>,
        <li key={2} className="bold"><Link href="/signup" className="waves-effect waves-teal"><i className="material-icons small">mode_edit</i>Sign Out</Link></li>
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

            <ul className="right hide-on-small-only">
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
