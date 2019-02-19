import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';

const SignUpPage = () => (
  <div id="message">
  {/* <h1>Sign Up</h1> */}
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
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

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  // onClick = (nr) => () => {
  //   this.setState({
  //     radio: nr
  //   });
  // }

  onSubmit = event => {
    const { username, email, passwordOne, isAdmin } = this.state;
    const roles = [];

    if (isAdmin) {
      roles.push(ROLES.ADMIN);
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
          roles,
        });
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

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
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
        <form onSubmit={this.onSubmit}>
            <p className="h2 text-center mb-4">Sign up</p>
            <div className="grey-text">
              <MDBInput
              name="username"
              value={username}
              onChange={this.onChange}
              type="text"
                label="Full Name"
                group
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
                label="Email Address"
                group
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
              name="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              type="password"
                label="Password"
                group
                validate
                containerClass="mb-0"
              />
              <MDBInput
              name="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
              type="password"
                label="Confirm Password"
                group
                validate
                error="wrong"
                success="right"
              />
              <label>
                Admin:
                <input
                  name="isAdmin"
                  type="checkbox"
                  checked={isAdmin}
                  onChange={this.onChangeCheckbox}
                />
              </label>
              {/* <MDBContainer className="mt-5">
                <MDBInput gap onClick={this.onClick(1)} checked={this.state.radio===1 ? isAdmin : false} label="Admin" type="radio"
                  id="radio1" />
              </MDBContainer> */}
              </div>
              <div className="text-center mb-3">
                <MDBBtn
                  // type="button"
                  gradient="blue"
                  rounded
                  className="btn-block z-depth-1a"
                  // className="button" 
                  disabled={isInvalid} 
                  type="submit"
                >
                  Sign up
                </MDBBtn>
                {error && <p>{error.message}</p>}
              </div>
            </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
      // <form onSubmit={this.onSubmit}>
      //   <input
      //     name="username"
      //     value={username}
      //     onChange={this.onChange}
      //     type="text"
      //     placeholder="Full Name"
      //   />
      //   <input
      //     name="email"
      //     value={email}
      //     onChange={this.onChange}
      //     type="text"
      //     placeholder="Email Address"
      //   />
      //   <input
      //     name="passwordOne"
      //     value={passwordOne}
      //     onChange={this.onChange}
      //     type="password"
      //     placeholder="Password"
      //   />
      //   <input
      //     name="passwordTwo"
      //     value={passwordTwo}
      //     onChange={this.onChange}
      //     type="password"
      //     placeholder="Confirm Password"
      //   />
      //   <label>
      //     Admin:
      //     <input
      //       name="isAdmin"
      //       type="checkbox"
      //       checked={isAdmin}
      //       onChange={this.onChangeCheckbox}
      //     />
      //   </label>
      //   <button className="button" disabled={isInvalid} type="submit">
      //     Sign Up
      //   </button>}

      //   {error && <p>{error.message}</p>}
      // </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);
const SignUpForm = withRouter(withFirebase(SignUpFormBase));
export default SignUpPage;
export { SignUpForm, SignUpLink };