import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import axios from "axios";

import { withFirebase } from "../Firebase";

class UserItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    if (!this.props.user) {
      this.setState({ loading: true });
    }

    this.props.firebase
      .user(this.props.match.params.id)
      .on("value", snapshot => {
        this.props.onSetUser(snapshot.val(), this.props.match.params.id);

        this.setState({ loading: false });
      });
  }

  componentWillUnmount() {
    this.props.firebase.user(this.props.match.params.id).off();
  }

  onSendPasswordResetEmail = () => {
    this.props.firebase.doPasswordReset(this.props.user.email);
  };

  // onDeleteUser = () => {
  //   this.props.firebase.doDeleteUser(this.props.match.params.id);
  // }

  onDeleteUser = () => {
    try {
      // await axios.delete(`/retailers/${retailerId}`);
      axios.delete(`http://localhost:8080/fb/${this.props.match.params.id}`);
      this.props.firebase.doDeleteUser(this.props.match.params.id);
      // const updatedRetailersList = [...this.state.retailers];
      // updatedRetailersList.splice(index, 1);
      // this.setState({ retailers: updatedRetailersList });
    } catch (error) {
      console.log(
        `Error deleting User with ID of ${this.props.match.params.id}`
      );
      console.log(error);
    }
  };

  render() {
    const { user } = this.props;
    const { loading } = this.state;
    return (
      <div>
        <span>
          <Link to={ROUTES.ADMIN}>ADMIN HOME</Link>
        </span>
        <h2>User ({this.props.match.params.id})</h2>
        {loading && <div>Loading ...</div>}

        {user && (
          <div>
            {/* <span>
              <strong>ID:</strong> {user.uid}
            </span> */}
            <span>
              <strong>E-Mail:</strong> {user.email}
            </span>
            <br />
            <span>
              <strong>Username:</strong> {user.username}
            </span>
            <br />
            <span>
              <button
                className="button"
                type="button"
                onClick={this.onSendPasswordResetEmail}
              >
                Send Password Reset
              </button>
            </span>
            <br />
            <span>
              <Link to={ROUTES.ADMIN}>
                <button
                  className="button"
                  type="button"
                  onClick={this.onDeleteUser}
                >
                  Delete User
                </button>
              </Link>
            </span>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  user: (state.userState.users || {})[props.match.params.id]
});

const mapDispatchToProps = dispatch => ({
  onSetUser: (user, uid) => dispatch({ type: "USER_SET", user, uid })
});

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UserItem);
