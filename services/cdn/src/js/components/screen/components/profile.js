import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MealList } from 'user';
import { setActiveProfile } from '../actions';

class Profile extends Component {
  componentWillMount() {
    this.props.setActiveProfile(this.props.params.id);
  }

  renderHeader() {
    const activeProfile  = this.props.activeProfile;
    if(activeProfile.username)
      return (<h4>{ `${activeProfile.firstname} ${activeProfile.lastname} (@${activeProfile.username}) `}</h4>);
  }

  render() {
    const activeProfile = this.props.activeProfile;
    return (
      <div className="flex-container">
        <div className="row">
          <div className="col s12">
            { this.renderHeader() }
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <MealList user={activeProfile}/>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => { return { activeProfile: state.activeProfile }  }, { setActiveProfile } )(Profile);
