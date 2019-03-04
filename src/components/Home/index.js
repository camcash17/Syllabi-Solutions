import React, { Component } from "react";
import Navigation from '../Navigation';

class Home extends Component {
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
        <h2 style={{margin: '10px'}}>Home</h2>
        {/* <Navigation /> */}
      </div>
    );
  }
}

export default Home;