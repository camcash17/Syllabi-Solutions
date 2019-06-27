import React, { Component } from "react";
import "../../../index.css";
import { Button } from "react-bootstrap";
import { MDBInput, MDBFormInline } from "mdbreact";
import { withFirebase } from "../../Firebase";
import { connect } from "react-redux";
import { compose } from "recompose";
import store from "../../../store";

// import Account from '../../Account';
// import Offices from './Offices';

class CourseDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    };
  }

  componentDidMount() {
    const nav = "design";
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
              userCancel: user
            });
          }
        });
    } catch (err) {
      console.log("Error fetching User Data", Err);
    }
  }

  handleChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        syllabi: {
          ...prevState.user.syllabi,
          [name]: value
        }
      }
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    try {
      this.props.firebase.doUpdateSyllabusInfo(
        this.props.authUser.uid,
        this.state.user
      );
      this.props.onSetUser(this.state.user, this.props.authUser.uid);
      this.setState({
        edit: false
      });
    } catch (error) {
      console.log("Error Updating Syllabi Info ", error);
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
      edit: !this.state.edit
    });
  };

  render() {
    console.log("props", this.props);
    console.log("user", this.props.user);
    console.log("state", this.state.user);
    const loading = (
      <div style={{ top: "50%", textAlign: "center" }} id="message">
        <span>Loading...</span>
      </div>
    );
    let officeHours = {};
    const order = {
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
      sunday: 7
    };
    this.props.user.offices.forEach((office, i) => {
      office.officeHours.forEach(hour => {
        let keys = Object.keys(hour.days)
          .sort((a, b) => {
            return order[a] - order[b];
          })
          .map((day, i) => {
            if (hour.days[day] === true) {
              return day.charAt(0).toUpperCase() + day.slice(1);
            }
          });
        let newKeys = [];
        keys.map(key => {
          if (key !== undefined) {
            newKeys.push(key + ": " + hour.start + " to " + hour.end);
          }
        });
        officeHours[i] = {
          name:
            office.campusName +
            " - " +
            office.buildingName +
            " - Office Number: " +
            office.officeNum,
          days: newKeys
        };
      });
    });
    return (
      <div id="message">
        <h2 style={{ margin: "10px" }}>Course Details</h2>
        {this.state.edit ? (
          <MDBFormInline id="forms" onSubmit={this.handleSubmit}>
            <MDBInput
              style={{ color: "white" }}
              type="text"
              onChange={this.handleChange}
              value={this.state.user.username}
              name="instructor"
              label="Instructor"
              required={true}
              disabled
            />
            <MDBInput
              style={{ color: "white" }}
              type="text"
              onChange={this.handleChange}
              value={this.state.user.university}
              name="university"
              label="University"
              required={true}
              disabled
            />
            <MDBInput
              style={{ color: "white" }}
              type="text"
              onChange={this.handleChange}
              value={this.state.user.college}
              name="college"
              label="College"
              required={true}
              disabled
            />
            <MDBInput
              style={{ color: "white" }}
              type="text"
              onChange={this.handleChange}
              value={this.state.user.department}
              name="department"
              label="Department"
              required={true}
              disabled
            />
            <select
              style={{ backgroundColor: "black", color: "white" }}
              name="courseLevel"
              value={this.state.user.syllabi.courseLevel}
              onChange={this.handleChange}
            >
              <option value="">Course Level</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Graduate">Graduate</option>
            </select>
            <br />
            <br />
            <select
              style={{ backgroundColor: "black", color: "white" }}
              name="courseNumber"
              value={this.state.user.syllabi.courseNumber}
              onChange={this.handleChange}
            >
              <option value="">Course Number</option>
              <option value="101">101</option>
              <option value="201">201</option>
            </select>
            <br />
            <br />
            <select
              style={{ backgroundColor: "black", color: "white" }}
              name="courseName"
              value={this.state.user.syllabi.courseName}
              onChange={this.handleChange}
            >
              <option value="">Course Name</option>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
            </select>
            <br />
            <br />
            <MDBInput
              style={{ color: "white" }}
              type="text"
              onChange={this.handleChange}
              value={this.state.user.syllabi.courseWebsite}
              name="courseWebsite"
              label="Course Website"
              required={true}
            />
            <select
              style={{ backgroundColor: "black", color: "white" }}
              name="weeks"
              value={this.state.user.syllabi.weeks}
              onChange={this.handleChange}
            >
              <option value="">Weeks</option>
              <option value="1 Week">1 Week</option>
              <option value="2 Weeks">2 Weeks</option>
            </select>
            <br />
            <br />
            <select
              style={{ backgroundColor: "black", color: "white" }}
              name="year"
              value={this.state.user.syllabi.year}
              onChange={this.handleChange}
            >
              <option value="">Year</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
            </select>
            <br />
            <br />
            <select
              style={{ backgroundColor: "black", color: "white" }}
              name="academicTerm"
              value={this.state.user.syllabi.academicTerm}
              onChange={this.handleChange}
            >
              <option value="">Academic Term</option>
              <option value="Fall">Fall</option>
              <option value="Spring">Spring</option>
            </select>
            <br />
            <br />
            {/* <MDBInput style={{color: 'white'}} type='textarea' onChange={this.handleChange} value={this.state.user.syllabi.contactInstructions} name='contactInstructions' label='Contact Instructions' required={true} />
          <select style={{backgroundColor: 'black', color: 'white'}} name="officeHours" value={this.state.user.syllabi.officeHours} onChange={this.handleChange}>
            <option value="">Select Office Hours</option>
            {Object.keys(officeHours).map((hours, i) => {
              return <option key={i} value={officeHours[hours].name + ' - ' + officeHours[hours].days}>{officeHours[hours].name}</option>
            })}
          </select> */}
            <br />
            <br />
            <Button bsStyle="danger" type="submit">
              Done
            </Button>
            <Button bsStyle="danger" type="button" onClick={this.cancel}>
              Cancel
            </Button>
          </MDBFormInline>
        ) : this.props.user ? (
          <div id="message">
            <div>
              <h3>Instructor: {this.props.user.username}</h3>
              {/* {this.props.user.suffix ? <h3>Suffix: {this.props.user.suffix}</h3> : "" } */}
              <h3>University: {this.props.user.university}</h3>
              <h3>College: {this.props.user.college}</h3>
              <h3>Department: {this.props.user.department}</h3>
              <h3>Course Level: {this.props.user.syllabi.courseLevel}</h3>
              <h3>Course Number: {this.props.user.syllabi.courseNumber}</h3>
              <h3>Course Name: {this.props.user.syllabi.courseName}</h3>
              <h3>Course Website: {this.props.user.syllabi.courseWebsite}</h3>
              <h3>Weeks: {this.props.user.syllabi.weeks}</h3>
              <h3>Year: {this.props.user.syllabi.year}</h3>
              <h3>Academic Term: {this.props.user.syllabi.academicTerm}</h3>
              <h3>
                Contact Instructions:{" "}
                {this.props.user.syllabi.contactInstructions}
              </h3>
              <h3>Office Hours: {this.props.user.syllabi.officeHours}</h3>
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
)(CourseDetails);
