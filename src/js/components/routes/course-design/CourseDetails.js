import React, { Component } from "react";
import '../../App.css'

class CourseDetails extends Component {
  constructor(props) {
      super(props);
      this.state = {};
  }

  componentDidMount(){
    const nav = 'design';
    this.props.displayNav(nav);
  }

  render() {
    return (
      <div id="message">
        <h2>Course Details</h2>
      </div>
    );
  }
}

export default CourseDetails;