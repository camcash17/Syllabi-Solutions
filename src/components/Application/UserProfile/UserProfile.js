import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { MDBInput, MDBFormInline } from "mdbreact";
import { withFirebase } from "../../Firebase";
import { connect } from "react-redux";
import { compose } from "recompose";
import store from "../../../store";

import Account from "../../Account";
import Offices from "./Offices";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      showOfficeHours: false,
      officeSelected: "",
      addNewOffice: false,
      addedOfficeHours: [],
      selectedOfficeHours: []
    };
  }

  componentDidMount() {
    const nav = "instructor";
    this.props.displayNav(nav);
    try {
      this.props.firebase
        .user(this.props.authUser.uid)
        .on("value", snapshot => {
          this.props.onSetUser(snapshot.val(), this.props.authUser.uid);
          if (!this.state.user) {
            const { user } = this.props;
            this.setState({
              user: user,
              userCancel: user,
              officeCounter: user.offices ? user.offices.length : 0
            });
          }
        });
    } catch (err) {
      console.log("Error fetching User Data", Err);
    }
  }

  componentWillUnmount() {
    this.props.firebase.user(this.props.authUser.uid).off();
  }

  getOffices = offices => {
    let newUser = this.state.user;
    newUser.offices = offices;
    this.setState({
      user: newUser
    });
  };

  getOfficeHours = (index, officeHours) => {
    console.log(index, officeHours);
    let newOffices = [...this.state.user.offices];
    newOffices[index].officeHours = officeHours;
    this.setState({
      offices: newOffices
    });
    this.getOffices(newOffices);
  };

  handleChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        [name]: value
      }
    }));
  };

  handleChangeOfficeHours = e => {
    let officeHours;
    let index;
    if (this.state.selectedOfficeHours.length) {
      officeHours = [...this.state.selectedOfficeHours];
      index = this.state.officeSelected;
    } else {
      officeHours = [...this.state.addedOfficeHours];
      index = this.state.user.offices.length - 1;
    }
    let name = e.target.name;
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    if (e.target.dataset.nest) {
      officeHours[e.target.id].days[name] = value;
    } else {
      officeHours[e.target.id][name] = value;
    }

    if (this.state.selectedOfficeHours.length) {
      this.setState({
        selectedOfficeHours: officeHours
      });
    } else {
      this.setState({
        addedOfficeHours: officeHours
      });
    }
    this.getOfficeHours(index, officeHours);
  };

  handleChangeOffices = e => {
    let name = e.target.name;
    let value = e.target.value;
    let offices = [...this.state.user.offices];
    offices.forEach(office => {
      if (office.id == e.target.id) {
        offices[office.id][name] = value;
      }
    });
    this.setState({
      offices: offices
    });
    this.getOffices(offices);
  };

  handleSubmit = e => {
    e.preventDefault();
    try {
      this.props.firebase.doUpdateUserInfo(
        this.props.authUser.uid,
        this.state.user
      );
      this.props.onSetUser(this.state.user, this.props.authUser.uid);
      this.setState({
        edit: false,
        addNewOffice: false,
        officeSelected: ""
      });
    } catch (error) {
      console.log("Error Updating User Info ", error);
    }
  };

  editDisplay = () => {
    this.setState({
      edit: true
    });
  };

  cancel = () => {
    this.setState({
      user: this.state.userCancel,
      edit: !this.state.edit,
      addNewOffice: false,
      officeSelected: ""
    });
  };

  selectOffice = e => {
    let value = e.target.value;
    this.setState({
      officeSelected: value,
      selectedOfficeHours:
        value !== "" ? this.state.user.offices[value].officeHours : ""
    });
  };

  onOfficeFormDisplay = () => {
    let newOffice = {
      id: this.state.user.offices
        ? this.state.user.offices[this.state.user.offices.length - 1].id + 1
        : 0,
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
      comments: ""
    };
    let offices = [];
    if (this.state.user.offices) {
      offices = [...this.state.user.offices];
    }
    offices.push(newOffice);
    this.setState(prevState => ({
      addNewOffice: true,
      officeCounter: newOffice.id === 0 ? 0 : this.state.user.offices.length,
      addedOfficeHours: offices[offices.length - 1].officeHours,
      user: {
        ...prevState.user,
        offices: offices
      },
      officeSelected: ""
    }));
  };

  addOfficeHours = () => {
    let form = {
      id: this.state.selectedOfficeHours
        ? this.state.selectedOfficeHours[
            this.state.selectedOfficeHours.length - 1
          ].id + 1
        : this.state.addedOfficeHours[this.state.addedOfficeHours.length - 1]
            .id + 1,
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
    };
    if (this.state.selectedOfficeHours) {
      let selectedOfficeHours = [...this.state.selectedOfficeHours];
      selectedOfficeHours.push(form);
      this.setState({
        selectedOfficeHours: selectedOfficeHours
      });
    } else {
      let addedOfficeHours = [
        ...this.state.user.offices[officeSelected].officeHours
      ];
      addedOfficeHours.push(form);
      this.setState({
        addedOfficeHours: addedOfficeHours
      });
    }
  };

  removeOfficeHours = id => {
    let officeHours = [];
    let user = {};
    if (this.state.officeSelected) {
      officeHours = [...this.state.selectedOfficeHours];
      user = { ...this.state.user };
      officeHours.forEach((hour, i) => {
        if (hour.id === id) {
          officeHours.splice(i, 1);
        }
      });
      user.offices[this.state.officeSelected].officeHours = officeHours;
      this.setState({
        user: user,
        selectedOfficeHours: officeHours
      });
    } else {
      officeHours = [...this.state.addedOfficeHours];
      user = { ...this.state.user };
      officeHours.forEach((hour, i) => {
        if (hour.id === id) {
          officeHours.splice(i, 1);
        }
      });
      user.offices[0].officeHours = officeHours;
      this.setState({
        user: user,
        addedOfficeHours: officeHours
      });
    }
  };

  removeOffices = id => {
    let offices = [];
    let user = {};
    if (this.state.user.offices) {
      offices = [...this.state.user.offices];
      user = { ...this.state.user };
    }
    offices.forEach((office, i) => {
      console.log(office.id, id);
      if (office.id == id) {
        offices.splice(i, 1);
      }
    });
    user.offices = offices;
    console.log(offices);
    this.setState({
      user: user,
      officeSelected: ""
    });
  };

  render() {
    let officeForm;
    let newOfficeButton;
    const order = {
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
      sunday: 7
    };
    const loading = (
      <div style={{ top: "50%", textAlign: "center" }} id="message">
        <span>Loading...</span>
      </div>
    );

    if (this.state.officeSelected) {
      officeForm = (
        <Offices
          handleChangeOffices={this.handleChangeOffices}
          handleChangeOfficeHours={this.handleChangeOfficeHours}
          officeSelected={this.state.officeSelected}
          officeState={this.state.user.offices[this.state.officeSelected]}
          addNewOffice={this.state.addNewOffice}
          addOfficeHours={this.addOfficeHours}
          selectedOfficeHours={this.state.selectedOfficeHours}
          removeOfficeHours={this.removeOfficeHours}
          removeOffices={this.removeOffices}
        />
      );
      newOfficeButton = true;
    } else if (this.state.addNewOffice) {
      this.state.user
        ? (officeForm = (
            <Offices
              officeCounter={this.state.officeCounter}
              handleChangeOffices={this.handleChangeOffices}
              handleChangeOfficeHours={this.handleChangeOfficeHours}
              userState={this.state.user}
              addNewOffice={this.state.addNewOffice}
              addOfficeHours={this.addOfficeHours}
              addedOfficeHours={this.state.addedOfficeHours}
              loading={this.props.loading}
              removeOfficeHours={this.removeOfficeHours}
            />
          ))
        : loading;
      newOfficeButton = true;
    }

    return (
      <div>
        <Account />
        {this.state.edit ? (
          <div id="message">
            <div id="form" className="form">
              <MDBFormInline id="forms" onSubmit={this.handleSubmit}>
                <MDBInput
                  style={{ color: "white" }}
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.user.username}
                  name="username"
                  label="Name"
                  required={true}
                />
                <select
                  style={{ backgroundColor: "black", color: "white" }}
                  name="suffix"
                  value={this.state.user.suffix}
                  onChange={this.handleChange}
                >
                  <option value="">Suffix</option>
                  <option value="Jr.">Jr.</option>
                  <option value="Sr.">Sr.</option>
                  <option value="II">II</option>
                  <option value="III">III</option>
                  <option value="IV">IV</option>
                  <option value="Esq.">Esq.</option>
                </select>
                <select
                  style={{ backgroundColor: "black", color: "white" }}
                  name="degree"
                  value={this.state.user.degree}
                  onChange={this.handleChange}
                  required={true}
                >
                  <option value="">Degree</option>
                  <option value="B.A.">B.A.</option>
                  <option value="B.S.">B.S.</option>
                </select>
                <MDBInput
                  style={{ color: "white" }}
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.user.university}
                  name="university"
                  label="University"
                  required={true}
                />
                <MDBInput
                  style={{ color: "white" }}
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.user.college}
                  name="college"
                  label="College"
                  required={true}
                />
                <MDBInput
                  style={{ color: "white" }}
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.user.department}
                  name="department"
                  label="Department"
                  required={true}
                />
                <div>
                  <h1 style={{ color: "white" }}>Office Details</h1>
                  {!this.state.addNewOffice ? (
                    <select
                      style={{ backgroundColor: "black", color: "white" }}
                      name="office"
                      value={this.state.officeSelected}
                      onChange={this.selectOffice}
                    >
                      <option value="">Select office to edit</option>
                      {this.state.user.offices ? (
                        this.state.user.offices.map((office, i) => {
                          return (
                            <option key={i} value={i}>
                              {office.campusName} - {office.buildingName}
                            </option>
                          );
                        })
                      ) : (
                        <option value="none">No location available</option>
                      )}
                    </select>
                  ) : (
                    ""
                  )}
                  {this.state.officeSelected != "none" ? officeForm : ""}
                </div>
                <br />
                <div hidden={newOfficeButton}>
                  <Button
                    style={{ marginTop: "2px" }}
                    type="button"
                    bsStyle="danger"
                    onClick={this.onOfficeFormDisplay}
                  >
                    Add new office
                  </Button>
                </div>
                <MDBInput
                  style={{ color: "white" }}
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.user.phone}
                  name="phone"
                  label="Phone"
                />
                <MDBInput
                  style={{ color: "white" }}
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.user.volP}
                  name="volP"
                  label="VolP"
                />
                <MDBInput
                  style={{ color: "white" }}
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.user.facebook}
                  name="facebook"
                  label="Facebook"
                />
                <MDBInput
                  style={{ color: "white" }}
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.user.twitter}
                  name="twitter"
                  label="Twitter"
                />
                <MDBInput
                  style={{ color: "white" }}
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.user.linkedIn}
                  name="linkedIn"
                  label="LinkedIn"
                />
                <Button bsStyle="danger" type="submit">
                  Done
                </Button>
                <Button bsStyle="danger" type="button" onClick={this.cancel}>
                  Cancel
                </Button>
              </MDBFormInline>
            </div>
          </div>
        ) : this.props.user ? (
          <div id="message">
            <div>
              <h1>My Profile</h1>
              <h3>Name: {this.props.user.username}</h3>
              {this.props.user.suffix ? (
                <h3>Suffix: {this.props.user.suffix}</h3>
              ) : (
                ""
              )}
              <h3>Degree: {this.props.user.degree}</h3>
              <h3>University: {this.props.user.university}</h3>
              <h3>College: {this.props.user.college}</h3>
              <h3>Department: {this.props.user.department}</h3>
              <hr />
              <div>
                <h1>Office Hours</h1>
                {this.props.user.offices ? (
                  this.props.user.offices.map((office, i) => {
                    return (
                      <div key={i}>
                        <h3>
                          Office Location: {office.campusName} -{" "}
                          {office.buildingName}
                        </h3>
                        {office.officeHours.map((hour, i) => {
                          return (
                            <div key={i}>
                              <div className="officeHours" key={i}>
                                <h3>Days:</h3>
                                <ul>
                                  {Object.keys(hour.days)
                                    .sort((a, b) => {
                                      return order[a] - order[b];
                                    })
                                    .map((day, i) => {
                                      if (hour.days[day] === true) {
                                        return (
                                          <li key={i}>
                                            {day.charAt(0).toUpperCase() +
                                              day.slice(1)}
                                          </li>
                                        );
                                      }
                                    })}
                                </ul>
                                <h3>Time:</h3>
                                <h3>
                                  {hour.start}PM to {hour.end}PM
                                </h3>
                              </div>
                            </div>
                          );
                        })}
                        {office.comments ? (
                          <div>
                            <h4>Comments:</h4>
                            <h5>{office.comments}</h5>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })
                ) : (
                  <h3>None</h3>
                )}
              </div>
              <hr />
              <div>
                {this.props.user.phone ? (
                  <h3>Phone: {this.props.user.phone}</h3>
                ) : (
                  ""
                )}
                {this.props.user.volP ? (
                  <h3>VolP: {this.props.user.volP}</h3>
                ) : (
                  ""
                )}
                {this.props.user.facebook ? (
                  <h3>Facebook: {this.props.user.facebook}</h3>
                ) : (
                  ""
                )}
                {this.props.user.twitter ? (
                  <h3>Twitter: {this.props.user.twitter}</h3>
                ) : (
                  ""
                )}
                {this.props.user.linkedIn ? (
                  <h3>LinkedIn: {this.props.user.linkedIn}</h3>
                ) : (
                  ""
                )}
              </div>
              <hr />
              <Button bsStyle="danger" onClick={this.editDisplay}>
                Edit
              </Button>
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
  user: (state.userState.users || {})[
    store.getState().sessionState.authUser.uid
  ]
});

const mapDispatchToProps = dispatch => ({
  onSetUser: (user, uid) => dispatch({ type: "USER_SET", user, uid })
});

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UserProfile);
