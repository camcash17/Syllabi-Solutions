import React, { Component } from "react";
import '../../index.css'

class CourseCompleted extends Component {
  constructor() {
      super();
      this.state = {};
  }
  render() { 
    return (
      <div id="message">
        <h2 style={{margin: '10px'}}>Courses Completed</h2>
      </div>
    );
  }
}

export default CourseCompleted;