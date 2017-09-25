import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchInvites, deleteInvite } from '../actions';
import InviteForm from './invite_form';

class InviteList extends Component {
  constructor(props){
    super(props);
    this.state = { invite: false };
  }

  componentWillMount() {
      this.props.fetchInvites();
  }

  renderHead() {
    return (
      <thead>
        <tr>
            <th>#</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>
      </thead>
    );
  }

  disableInviteForm() {
    this.setState({ invite: false })
  }

  renderInviteForm() {
    if(this.state.invite)
      return <InviteForm onComplete={ this.disableInviteForm.bind(this) }/>;
  }

  renderInvites() {
    let _self = this;
    return _.map(this.props.invites, invite => {
      return (
        <tr key={invite.id} >
          <td> {invite.id}</td>
          <td> {invite.email}</td>
          <td> {invite.status}</td>
          <td>
            <a className="btn-transparent"><i className="material-icons">edit</i></a> &nbsp;
            <a className="btn-transparent red-text" onClick={ () => this.props.deleteInvite(invite) }><i className="material-icons">delete</i></a>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="card">
        <div className="card-content">
          <div className="card-title">
            <span>Invite List</span>
            <a className="btn-floating btn right red" onClick={ () => { this.setState({invite: true}) } }>
              <i className="material-icons">add</i>
            </a>
          </div>
          <table className="striped">
           { this.renderHead() }
           <tbody>
             { this.renderInvites() }
           </tbody>
         </table>
         { this.renderInviteForm() }
        </div>
      </div>
    );
  }


}

export default connect((state) => { return { invites: state.invites }  }, { fetchInvites, deleteInvite } )(InviteList);
