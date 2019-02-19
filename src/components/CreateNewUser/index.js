import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const NewUserPage = () => (
    <div id="message">
    <h1>Create New User</h1>
      <CreateNewUserForm />
    </div>
  );

const INITIAL_STATE = {
  username: '',
  department: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isInstructor: false,
  isAdmin: false,
  isLeader: false,
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class CreateNewUserFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    let userUid;
    const { username, department, email, passwordOne, isInstructor, isAdmin, isLeader } = this.state;

    const newUser = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.passwordOne
    }

    const roles = [];

    if (isAdmin) {
        roles.push(ROLES.ADMIN);
    }
    if (isInstructor) {
        roles.push(ROLES.INSTRUCTOR);
    }
    if (isLeader) {
        roles.push(ROLES.LEADER);
    }

    try {
        axios.post(`http://localhost:8080/fb`, newUser)
        .then(data => {
          userUid = data.data.uid;
          this.props.firebase.doCreateUser(username, email, department, roles, userUid);
        })
        .catch(err => {
          console.log("Error Creating New User: " + err);
        })
    } catch (error) {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
            error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }
        console.log(`Error creating new User`);
        console.log(error);
        this.setState({ error });
    }

    // this.props.firebase
    //   .doCreateUserWithEmailAndPassword(email, passwordOne)
    //   .then(authUser => {
    //     // Create a user in your Firebase realtime database
    //     return this.props.firebase.user(authUser.user.uid).set({
    //       username,
    //       email,
    //       roles,
    //     });
    //   })
    //   .then(() => {
    //     return this.props.firebase.doSendEmailVerification();
    //   })
    //   .then(() => {
    //     this.setState({ ...INITIAL_STATE });
    //     this.props.history.push(ROUTES.HOME);
    //   })
    //   .catch(error => {
    //     if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
    //       error.message = ERROR_MSG_ACCOUNT_EXISTS;
    //     }

    //     this.setState({ error });
    //   });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      department,
      email,
      passwordOne,
      passwordTwo,
      isInstructor,
      isAdmin,
      isLeader,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '' ||
      (isInstructor === false && isAdmin === false && isLeader === false);

    const unCheckedI =
    isLeader === true ||
    isAdmin === true;

    const unCheckedA =
    isInstructor === true ||
    isLeader === true;

    const unCheckedL =
    isInstructor === true ||
    isAdmin === true;

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="department"
          value={department}
          onChange={this.onChange}
          type="text"
          placeholder="Department"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <label>
          Instructor:
          <input
            name="isInstructor"
            type="checkbox"
            disabled={unCheckedI}
            checked={isInstructor}
            onChange={this.onChangeCheckbox}
          />
        </label>
        <label>
          Admin:
          <input
            name="isAdmin"
            type="checkbox"
            disabled={unCheckedA}
            checked={isAdmin}
            onChange={this.onChangeCheckbox}
          />
        </label>
        <label>
          Leader:
          <input
            name="isLeader"
            type="checkbox"
            disabled={unCheckedL}
            checked={isLeader}
            onChange={this.onChangeCheckbox}
          />
        </label>
        <button className="button" disabled={isInvalid} type="submit">
         Create
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const CreateNewUserForm = withRouter(withFirebase(CreateNewUserFormBase));
export default NewUserPage;
export { CreateNewUserForm };