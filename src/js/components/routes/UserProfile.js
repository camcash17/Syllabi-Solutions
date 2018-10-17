import React, { Component } from "react";
import '../App.css'

class UserProfile extends Component {
  constructor() {
      super();
      this.state = {};
  }

  componentDidMount(){
    const nav = 'instructor';
    this.props.displayNav(nav);
  }

  render() { 
    return (
      <div id="message">
        <h2>User Profile</h2>
      </div>
    );
  }
}

export default UserProfile;