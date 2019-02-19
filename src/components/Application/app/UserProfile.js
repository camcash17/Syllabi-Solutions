import React, { Component } from "react";
import '../../../index.css'
import { Button } from 'react-bootstrap';
import { withFirebase } from '../../Firebase';
import { connect } from 'react-redux';
import axios from 'axios';

class UserProfile extends Component {
  constructor(props) {
      super(props);
      this.state = {
        edit: false,
        user: {
          name: this.props.authUser.username,
          // lastName: this.props.user[0].lastname,
          // middle: this.props.user[0].middle,
          suffix: this.props.authUser.suffix ? this.props.authUser.suffix : '',
          degree: this.props.authUser.degree ? this.props.authUser.degree : '',
          university: this.props.authUser.university ? this.props.authUser.university : '',
          college: this.props.authUser.college ? this.props.authUser.college : '',
          department: this.props.authUser.department ? this.props.authUser.department : '',
          email: this.props.authUser.email,
          roles: this.props.authUser.roles[0]
        }
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    const nav = 'instructor';
    this.props.displayNav(nav);
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState(prevState => ({
      user: {
          ...prevState.user,
          [name]: value
      }
    }))
  };

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      edit: false
    })
    try {
      this.props.firebase.doUpdateUserInfo(this.props.authUser.uid, this.state.user);
    } catch(error) {
      console.log('Error Updating User Info ', error)
    }
  };

  handleClick(){
    this.setState({
      edit: true
    })
  }

  render() {
    return (
      this.state.edit ?
      <div id="forms">
        <div id="form" className='form'>
          <form id="forms" onSubmit={this.handleSubmit}>
            <input type='text' onChange={this.handleChange} value={this.state.user.name} name='name' placeholder='Name' />
            {/* <input type='text' onChange={this.handleChange} value={this.state.lastName} name='lastName' placeholder='Last Name' />
            <input type='text' onChange={this.handleChange} value={this.state.middle} name='middle' placeholder='Middle Initial' /> */}
            <select name="suffix" value={this.state.user.suffix} onChange={this.handleChange}>
              <option value="">Suffix</option>
              <option value="Jr.">Jr.</option>
              <option value="Sr.">Sr.</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
              <option value="Esq.">Esq.</option>
              <option value="Dr.">Dr.</option>
            </select>
            <select name="degree" value ={this.state.user.degree} onChange={this.handleChange}>
              <option value="">Degree</option>
              <option value="B.A.">B.A.</option>
              <option value="B.S.">B.S.</option>
            </select>
            <input type='text' onChange={this.handleChange} value={this.state.user.university} name='university' placeholder='University' />
            <input type='text' onChange={this.handleChange} value={this.state.user.college} name='college' placeholder='College' />
            <input type='text' onChange={this.handleChange} value={this.state.user.department} name='department' placeholder='Department' />
            <input type='submit' value='Submit' />
          </form>
        </div>
      </div> :
      <div style={{top: '50%', textAlign: 'center'}} id="message">
        <h3>Name: {this.state.user.name}</h3>
        {/* <h3>Last Name: {this.state.lastName}</h3>
        <h3>Middle Initial: {this.state.middle}</h3> */}
        <h3>Suffix: {this.state.user.suffix}</h3>
        <h3>Degree: {this.state.user.degree}</h3>
        <h3>University: {this.state.user.university}</h3>
        <h3>College: {this.state.user.college}</h3>
        <h3>Department: {this.state.user.department}</h3>
        <Button bsStyle="danger" onClick={this.handleClick}>Edit</Button>
      </div> 
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
});

export default withFirebase(connect(mapStateToProps)(UserProfile));