import React, { Component } from "react";
import '../App.css'
import { Button } from 'react-bootstrap';
import axios from 'axios';

class UserProfile extends Component {
  constructor(props) {
      super(props);
      this.state = {
        edit: false,
        firstName: this.props.user[0].firstname,
        lastName: this.props.user[0].lastname,
        middle: this.props.user[0].middle,
        suffix: this.props.user[0].suffix,
        degree: this.props.user[0].degree,
        university: this.props.user[0].university,
        college: this.props.user[0].college,
        department: this.props.user[0].department,
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
  }

  // componentDidMount(){
  //   const nav = 'instructor';
  //   this.props.displayNav(nav);
  //   axios({
  //     method: 'GET',
  //     url: `/users/${this.props.user[0].id}`
  //   })
  //   .then( res => {
  //     this.setState({
  //       firstName: res.data.data.firstname,
  //       lastName: res.data.data.lastname,
  //       middle: res.data.data.middle,
  //       suffix: res.data.data.suffix,
  //       degree: res.data.data.degree,
  //       university: res.data.data.university,
  //       college: res.data.data.college,
  //       department: res.data.data.department
  //     })
  //   })
  //   .catch( err => {
  //     console.log(err)
  //   })
  // }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    })
  };

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      edit: false
    })
    axios({
      method: 'PUT',
      url: `/users/${this.props.user[0].id}`,
      data: {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        middle: this.state.middle,
        suffix: this.state.suffix,
        degree: this.state.degree,
        university: this.state.university,
        college: this.state.college,
        department: this.state.department
      }
    })
    .then( user => {
      this.props.logUser(this.state.firstName);
    })
    .catch( err => {
      console.log(err)
    })
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
            <input type='text' onChange={this.handleChange} value={this.state.firstName} name='firstName' placeholder='First Name' />
            <input type='text' onChange={this.handleChange} value={this.state.lastName} name='lastName' placeholder='Last Name' />
            <input type='text' onChange={this.handleChange} value={this.state.middle} name='middle' placeholder='Middle Initial' />
            <select name="suffix" value={this.state.suffix} onChange={this.handleChange}>
              <option value="">Suffix</option>
              <option value="Jr.">Jr.</option>
              <option value="Sr.">Sr.</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
              <option value="Esq.">Esq.</option>
              <option value="Dr.">Dr.</option>
            </select>
            <select name="degree" value ={this.state.degree} onChange={this.handleChange}>
              <option value="">Degree</option>
              <option value="B.A.">B.A.</option>
              <option value="B.S.">B.S.</option>
            </select>
            <input type='text' onChange={this.handleChange} value={this.state.university} name='university' placeholder='University' />
            <input type='text' onChange={this.handleChange} value={this.state.college} name='college' placeholder='College' />
            <input type='text' onChange={this.handleChange} value={this.state.department} name='department' placeholder='Department' />
            <input type='submit' value='Submit' />
          </form>
        </div>
      </div> :
      <div style={{top: '50%', textAlign: 'center'}} id="message">
        <h3>First Name: {this.state.firstName}</h3>
        <h3>Last Name: {this.state.lastName}</h3>
        <h3>Middle Initial: {this.state.middle}</h3>
        <h3>Suffix: {this.state.suffix}</h3>
        <h3>Degree: {this.state.degree}</h3>
        <h3>University: {this.state.university}</h3>
        <h3>College: {this.state.college}</h3>
        <h3>Department: {this.state.department}</h3>
        <Button bsStyle="danger" onClick={this.handleClick}>Edit</Button>
      </div> 
    );
  }
}

export default UserProfile;