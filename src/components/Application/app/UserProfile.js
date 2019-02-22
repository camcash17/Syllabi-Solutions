import React, { Component } from "react";
import '../../../index.css'
import { Button } from 'react-bootstrap';
import { withFirebase } from '../../Firebase';
import { connect } from 'react-redux';
import { compose } from 'recompose';

class UserProfile extends Component {
  constructor(props) {
      super(props);
      this.state = {
        edit: false,
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    const nav = 'instructor';
    this.props.displayNav(nav);
    try {
    this.props.firebase
      .user(this.props.authUser.uid)
      .on('value', snapshot => {
        this.props.onSetUser(
          snapshot.val(),
          this.props.authUser.uid,
        );
        const { users } = this.props;
        users.map(user => (    
          this.setState({ 
            user: {
              username: user.username,
              // lastName: this.props.user[0].lastname,
              // middle: this.props.user[0].middle,
              suffix: user.suffix,
              degree: user.degree,
              university: user.university,
              college: user.college,
              department: user.department,
              email: user.email,
              roles: [ 
                user.roles[0]
              ]
            }
          })
         ))
      });
    } catch(err) {
      console.log('Error fetching User Data', Err)
    }
  }

  componentWillUnmount() {
    this.props.firebase.user(this.props.authUser.uid).off();
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
    try {
      this.props.firebase.doUpdateUserInfo(this.props.authUser.uid, this.state.user);
      this.props.onSetUser(
        this.state.user,
        this.props.authUser.uid,
      );
      this.setState({
        edit: false
      })
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
            <input type='text' onChange={this.handleChange} value={this.state.user.username} name='username' placeholder='Name' />
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
      this.props.users.length ? (
      <div style={{top: '50%', textAlign: 'center'}} id="message">
        <h3>Name: {this.props.users[0].username}</h3>
        {/* <h3>Last Name: {this.state.lastName}</h3>
        <h3>Middle Initial: {this.state.middle}</h3> */}
        <h3>Suffix: {this.props.users[0].suffix}</h3>
        <h3>Degree: {this.props.users[0].degree}</h3>
        <h3>University: {this.props.users[0].university}</h3>
        <h3>College: {this.props.users[0].college}</h3>
        <h3>Department: {this.props.users[0].department}</h3>
        <Button bsStyle="danger" onClick={this.handleClick}>Edit</Button>
      </div>
      ) : (
        <div style={{top: '50%', textAlign: 'center'}} id="message">
          <span>Loading...</span>
        </div>
      )
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
  users: Object.keys(state.userState.users || {}).map(key => ({
    ...state.userState.users[key],
    uid: key,
  })),
});

const mapDispatchToProps = dispatch => ({
  onSetUser: (user, uid) => dispatch({ type: 'USER_SET', user, uid }),
});

export default compose(withFirebase, connect(mapStateToProps,mapDispatchToProps),)(UserProfile);