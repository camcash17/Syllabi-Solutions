import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import { MDBInput, MDBFormInline } from "mdbreact";
import { withFirebase } from '../../Firebase';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import store from '../../../store';

import Account from '../../Account';
import Offices from './Offices';

class UserProfile extends Component {
  constructor(props) {
      super(props);
      this.state = {
        edit: false,
        showOfficeHours: false,
        officeSelected: "",
        addNewOffice: false,
        hoursCounter: 0
      };
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
          if(!this.state.user) {
            const { user } = this.props;
            this.setState({ 
              user: user,
              officeCounter: user.offices ? user.offices.length : 0
            })
          }
        });
    } catch(err) {
      console.log('Error fetching User Data', Err)
    }
  }

  componentWillUnmount() {
    this.props.firebase.user(this.props.authUser.uid).off();
  }

  handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    if(e.target.dataset.nest) {
      let offices = [...this.state.user.offices];
      offices.forEach(office => {
        if(office.id == e.target.id) {
          if(e.target.dataset.nest2) {
            let officeHours = [...office.officeHours];
            officeHours.forEach(hours => {
              e.target.dataset.nest3 ?
                offices[office.id].officeHours[hours.id].days[name] = value
                : offices[office.id].officeHours[hours.id][name] = value;
            })
          } else {
            offices[office.id][name] = value;
          }
        }
      })
      name = 'offices';
      value = offices;
    }
    this.setState(prevState => ({
      user: {
          ...prevState.user,
          [name]: value
      }
    }))
  };

  handleSubmit = (e) => {
    e.preventDefault();
    try {
      this.props.firebase.doUpdateUserInfo(this.props.authUser.uid, this.state.user);
      this.props.onSetUser(
        this.state.user,
        this.props.authUser.uid,
      );
      this.setState({
        edit: false,
        addNewOffice: false,
        officeSelected: ""
      })
    } catch(error) {
      console.log('Error Updating User Info ', error)
    }
  };

  editDisplay = () => {
    this.setState({
      edit: true
    })
  }

  selectOffice = (e) => {
    let value = e.target.value;
    this.setState({
      officeSelected: value
    })
  }

  onOfficeFormDisplay = () => {
    let newOffice = {
      id: this.state.user.offices ? this.state.officeCounter : 0,
      campusName: "",
      buildingName: "",
      officeNum: "",
      address: "",
      zip: "",
      city: "",
      state: "",
      country: "",
      officeHours: [
        {
          id: 0,
          days: {
            monday: "",
            tuesday: "",
            wednesday: "",
            thursday: "",
            friday: "",
            saturday: "",
            sunday: ""
          },
          start: "",
          end: ""
        }
      ],
      comments: "",
    };
    let offices = [];
    this.state.user.offices ? offices = [...this.state.user.offices] : "";
    offices.push(newOffice)
    this.setState(prevState => ({
      addNewOffice: true,
      officeCounter: newOffice.id === 0 ? 0 : this.state.user.offices.length,
      user: {
          ...prevState.user,
          offices: offices
      }
    }))
  }

  render() {
    let officeForm;
    let newOfficeButton;
    if(this.state.officeSelected){
      officeForm = (
        <Offices
          officeCounter={this.state.officeCounter}
          officeSelected={this.state.officeSelected}
          onChange={this.handleChange}
          userState={this.state.user}
          officeState={this.state.user.offices[this.state.officeSelected]}
          addNewOffice={this.state.addNewOffice}
          loading={loading}
        />
      )
        newOfficeButton = true
    } else if(this.state.addNewOffice){
      this.state.user ? (
        officeForm = (
          <Offices
            officeCounter={this.state.officeCounter}
            officeSelected={this.state.officeSelected}
            onChange={this.handleChange}
            userState={this.state.user}
            officeState={this.state.user.offices[this.state.officeSelected]}
            addNewOffice={this.state.addNewOffice}
            loading={loading}
          />
        )
      ) : (
        loading
      )
      newOfficeButton = true;
    }
    const loading = (
      <div style={{top: '50%', textAlign: 'center'}} id="message">
        <span>Loading...</span>
      </div>
    );

    const order = { sunday: 1, monday: 2, tuesday: 3, wednesday: 4, thursday: 5, friday: 6, saturday: 7 };

    return (
      <div>
        <Account />
        {this.state.edit ?
        <div id="message">
          <div id="form" className='form'>
            <MDBFormInline id="forms" onSubmit={this.handleSubmit}>
              <MDBInput style={{color: 'white'}} type='text' onChange={this.handleChange} value={this.state.user.username} name='username' label='Name' />
              <select style={{backgroundColor: 'black', color: 'white'}} name="suffix" value={this.state.user.suffix} onChange={this.handleChange}>
                <option value="">Suffix</option>
                <option value="Jr.">Jr.</option>
                <option value="Sr.">Sr.</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
                <option value="Esq.">Esq.</option>
              </select>
              <select style={{backgroundColor: 'black', color: 'white'}} name="degree" value ={this.state.user.degree} onChange={this.handleChange}>
                <option value="">Degree</option>
                <option value="B.A.">B.A.</option>
                <option value="B.S.">B.S.</option>
              </select>
              <MDBInput style={{color: 'white'}} type='text' onChange={this.handleChange} value={this.state.user.university} name='university' label='University' />
              <MDBInput style={{color: 'white'}} type='text' onChange={this.handleChange} value={this.state.user.college} name='college' label='College' />
              <MDBInput style={{color: 'white'}} type='text' onChange={this.handleChange} value={this.state.user.department} name='department' label='Department' />
                <div>
                  <h1 style={{color: 'white'}}>Office Details</h1>
                  {!this.state.addNewOffice ? (
                    <select style={{backgroundColor: 'black', color: 'white'}} name="office" value= "" onChange={this.selectOffice}>
                        <option value="">Select office to edit</option>
                        {this.state.user.offices ?
                          this.state.user.offices.map((office, i) => {
                            return (
                              <option key={i} value={office.id}>{office.campusName} - {office.buildingName}</option>
                            )
                          })
                        : (
                          <option value="none">No location available</option>
                        )}
                    </select>
                    ) : (
                      ""
                  )}
                  {officeForm}
                </div>
              <br />
              <div hidden={newOfficeButton}>
                <Button type="button" bsStyle="danger" onClick={this.onOfficeFormDisplay}>Add new office</Button>
              </div>
              <MDBInput style={{color: 'white'}} type='text' onChange={this.handleChange} value={this.state.user.phone} name='phone' label='Phone' />
              <MDBInput style={{color: 'white'}} type='text' onChange={this.handleChange} value={this.state.user.volP} name='volP' label='VolP' />
              <MDBInput style={{color: 'white'}} type='text' onChange={this.handleChange} value={this.state.user.facebook} name='facebook' label='Facebook' />
              <MDBInput style={{color: 'white'}} type='text' onChange={this.handleChange} value={this.state.user.twitter} name='twitter' label='Twitter' />
              <MDBInput style={{color: 'white'}} type='text' onChange={this.handleChange} value={this.state.user.linkedIn} name='linkedIn' label='LinkedIn' />
              <Button bsStyle="danger" type='submit'>Done</Button>
            </MDBFormInline>
          </div>
        </div> :
        this.props.user ? (
          <div id="message">
            <div>
              <h1>My Profile</h1>
              <h3>Name: {this.props.user.username}</h3>
              <h3>Suffix: {this.props.user.suffix}</h3>
              <h3>Degree: {this.props.user.degree}</h3>
              <h3>University: {this.props.user.university}</h3>
              <h3>College: {this.props.user.college}</h3>
              <h3>Department: {this.props.user.department}</h3>
              <hr />
              {this.props.user.offices ? (
              <div>
                <h1>Office Hours</h1>
                {this.props.user.offices.map((office, i) => {
                  return (
                    <div key={i}>
                      <h3>Office Location: {office.campusName} - {office.buildingName}</h3>
                      {office.officeHours.map((hour, i) => {
                        return(
                          <div key={i}>
                            <h3>Days:</h3>
                            {Object.keys(hour.days).sort((a,b) => {
                              return (
                                order[a] - order[b]
                              )
                            }).map((day, i) => {
                              if(hour.days[day] === true) {
                                return (
                                  <h4 key={i}>{day.charAt(0).toUpperCase()+ day.slice(1)}</h4>
                                )
                              }
                            })}
                            <h3>Time:</h3>
                            <h4>{hour.start}PM to {hour.end}PM</h4>
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
              ) : "" }
              <hr />
              <div>
                <h3>Phone: {this.props.user.phone}</h3>
                <h3>VolP: {this.props.user.volP}</h3>
                <h3>Facebook: {this.props.user.facebook}</h3>
                <h3>Twitter: {this.props.user.twitter}</h3>
                <h3>LinkedIn: {this.props.user.linkedIn}</h3>
              </div>
              <hr />
              <Button bsStyle="danger" onClick={this.editDisplay}>Edit</Button>
            </div>
          </div>
        ) : (
          loading
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
  user: (state.userState.users || {})[store.getState().sessionState.authUser.uid],
});

const mapDispatchToProps = dispatch => ({
  onSetUser: (user, uid) => dispatch({ type: 'USER_SET', user, uid }),
});

export default compose(withFirebase, connect(mapStateToProps,mapDispatchToProps),)(UserProfile);
