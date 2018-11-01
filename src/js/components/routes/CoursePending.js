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
        <h2 style={{margin: '10px'}}>Courses Pending</h2>
      </div>
    );
  }
}

export default CoursePending;