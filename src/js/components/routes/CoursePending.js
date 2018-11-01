import React, { Component } from "react";
import '../App.css'

class CoursePending extends Component {
  constructor() {
      super();
      this.state = {};
  }
  render() { 
    return (
      <div id="message">
        <h2>Courses Pending</h2>
        <h1>This is where you see your pending courses</h1>
      </div>
    );
  }
}

export default CoursePending;