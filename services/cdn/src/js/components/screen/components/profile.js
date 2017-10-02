import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MealList } from 'user';
import { setActiveProfile } from '../actions';

class Profile extends Component {
  componentWillMount() {
    this.props.setActiveProfile(this.props.params.id);
  }

  renderHeader() {
    const profile  = this.props.profile;
    if(profile.username)
      return (<h4>{ `${profile.firstname} ${profile.lastname} (@${profile.username}) `}</h4>);
  }

  render() {
    const {profile, meals } = this.props;
    return (
      <div className="flex-container">
        <div className="row">
          <div className="col s12">

          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <MealList meals={meals}/>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => { return { profile: state.profile, meals: state.meals }  }, { setActiveProfile } )(Profile);
