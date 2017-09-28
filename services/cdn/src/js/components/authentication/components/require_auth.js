import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent, roles) {
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if (!this.isUserAllowed()) {
        this.context.router.push('/profile');
      }
    }

    componentWillUpdate(nextProps) {
      if (!this.isUserAllowed()) {
        this.context.router.push('/profile');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }

    isUserAllowed() {
      const { pathname } = this.props.location;
      const roles = localStorage.getItem('authorities');

      if(!this.props.authenticated)
        return false;

      if(pathname.indexOf('/profile/') !== -1) {
        // Review roles admin or manager
        return roles.indexOf('ROLE_ADMIN') != -1 || roles.indexOf('ROLE_MANAGER') != -1;
      } else if (pathname.indexOf('/manager') !== -1) {
        // Review roles of admin
        return roles.indexOf('ROLE_MANAGER') != -1;
      } else if (pathname.indexOf('/admin') !== -1) {
        // Review roles of admin
        return roles.indexOf('ROLE_ADMIN') != -1 ;
      }

      return true;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated, me: state.me };
  }

  return connect(mapStateToProps)(Authentication);
}
