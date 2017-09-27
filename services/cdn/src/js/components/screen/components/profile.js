import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MealList, MealForm } from 'user';
import { setActiveProfile } from '../actions';

class Profile extends Component {
  componentWillMount() {
    console.log('ID', this.props.params);
    this.props.setActiveProfile(this.props.params.id);

    // // We are checking some other account
    // if(this.props.params.id) {
    //   this.props.fetchUser(this.props.params.id);
    // } else {
    //   // We are checking ourselfs
    //   this.props.findMyself();
    // }
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
          <div className="col s8">
            <MealList user={activeProfile}/>
          </div>
          <div className="col s4">
            <MealForm/>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => { return { activeProfile: state.activeProfile }  }, { setActiveProfile } )(Profile);
