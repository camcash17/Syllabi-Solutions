import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { MDBInput } from "mdbreact";

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
  role: ''
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
    const { username, department, email, role } = this.state;

    const newUser = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.passwordOne
    }

    try {
        axios.post(`http://localhost:8080/fb`, newUser)
        .then(data => {
          userUid = data.data.uid;
          this.props.firebase.doCreateUser(username, email, department, role, userUid);
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
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      department,
      email,
      passwordOne,
      passwordTwo,
      role,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '' ||
      role === '';

    return (
      <form onSubmit={this.onSubmit}>
        <MDBInput
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          label="Full Name"
          style={{color: 'white'}}
        />
        <MDBInput
          name="department"
          value={department}
          onChange={this.onChange}
          type="text"
          label="Department"
          style={{color: 'white'}}
        />
        <MDBInput
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          label="Email Address"
          style={{color: 'white'}}
        />
        <MDBInput
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          label="Password"
          style={{color: 'white'}}
        />
        <MDBInput
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          label="Confirm Password"
          style={{color: 'white'}}
        />
        <label>
          Instructor:
          <input name="role" value="Instructor" onChange={this.onChange} label="Instructor" type="radio"
            id="instructor" checked={this.state.role === 'Instructor'} />
        </label>
        <br/>
        <label>
          Admin:
          <input name="role" value="Admin" onChange={this.onChange} label="Admin" type="radio"
            id="admin" checked={this.state.role === 'Admin'} />
        </label>
        <br/>
        <label>
          Leader:
          <input name="role" value="Leader" onChange={this.onChange} label="Leader" type="radio"
            id="leader" checked={this.state.role === 'Leader'} />
        </label>
        <br/>
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