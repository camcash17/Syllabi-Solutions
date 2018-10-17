import React, { Component } from "react";
import '../App.css'

class CourseCompleted extends Component {
  constructor() {
      super();
      this.state = {};
  }
  render() { 
    return (
      <div id="message">
        <h2>Courses Completed</h2>
      </div>
    );
  }
}

export default CourseCompleted;