import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { CreateNewUserForm } from '../CreateNewUser';

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      newUser: false
    };
    this.newUser = this.newUser.bind(this);
  }

  componentDidMount() {
    if (!this.props.users.length) {
      this.setState({ loading: true });
    }

    this.props.firebase.users().on('value', snapshot => {
      this.props.onSetUsers(snapshot.val());

      this.setState({
         loading: false,
         newUser: false
        });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  newUser() {
    this.setState({
      newUser: !this.state.newUser
    })
  }

  render() {
    const { users } = this.props;
    const { loading } = this.state;

    return (
      <div>
          {!this.state.newUser ?
          <Link to='#'>
            <p onClick={this.newUser}>Create a User</p>
          </Link> :
          <span>
            <Link to='#'>
              <p onClick={this.newUser}>Back</p> 
            </Link>
            <CreateNewUserForm />
          </span>}
        <h2>Users</h2>
        {loading && <div>Loading ...</div>}
        <ul>
          {users.map(user => (
            <li key={user.uid}>
              <span>
                <strong>ID:</strong> {user.uid}
              </span>
              <br />
              <span>
                <strong>E-Mail:</strong> {user.email}
              </span>
              <br />
              <span>
                <strong>Username:</strong> {user.username}
              </span>
              <br />
              <span>
                <Link to={`${ROUTES.ADMIN}/${user.uid}`}>
                  Details
                </Link>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: Object.keys(state.userState.users || {}).map(key => ({
    ...state.userState.users[key],
    uid: key,
  })),
});

const mapDispatchToProps = dispatch => ({
  onSetUsers: users => dispatch({ type: 'USERS_SET', users }),
});

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(UserList);