import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { MDBInput } from "mdbreact";

class OfficeHours extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let officeHours;
    if (this.props.officeSelected) {
      officeHours = this.props.selectedOfficeHours.map((hours, i) => {
        return (
          <div key={i}>
            <h2 style={{ color: "white" }}>Day of Week</h2>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <MDBInput
                id={i.toString()}
                label="Monday"
                type="checkbox"
                name="monday"
                onChange={this.props.handleChangeOfficeHours}
                data-nest="true"
                checked={hours.days.monday}
              />
              <MDBInput
                id={i.toString()}
                label="Tuesday"
                type="checkbox"
                name="tuesday"
                onChange={this.props.handleChangeOfficeHours}
                data-nest="true"
                checked={hours.days.tuesday}
              />
              <MDBInput
                id={i.toString()}
                label="Wednesday"
                type="checkbox"
                name="wednesday"
                onChange={this.props.handleChangeOfficeHours}
                data-nest="true"
                checked={hours.days.wednesday}
              />
              <MDBInput
                id={i.toString()}
                label="Thursday"
                type="checkbox"
                name="thursday"
                onChange={this.props.handleChangeOfficeHours}
                data-nest="true"
                checked={hours.days.thursday}
              />
              <MDBInput
                id={i.toString()}
                label="Friday"
                type="checkbox"
                name="friday"
                onChange={this.props.handleChangeOfficeHours}
                data-nest="true"
                checked={hours.days.friday}
              />
              <MDBInput
                id={i.toString()}
                label="Saturday"
                type="checkbox"
                name="saturday"
                onChange={this.props.handleChangeOfficeHours}
                data-nest="true"
                checked={hours.days.saturday}
              />
              <MDBInput
                id={i.toString()}
                label="Sunday"
                type="checkbox"
                name="sunday"
                onChange={this.props.handleChangeOfficeHours}
                data-nest="true"
                checked={hours.days.sunday}
              />
            </div>
            <br />
            <div>
              <div>
                <select
                  id={i.toString()}
                  style={{ backgroundColor: "black", color: "white" }}
                  name="start"
                  onChange={this.props.handleChangeOfficeHours}
                  value={hours.start}
                  required={true}
                >
                  <option value="">Start Time</option>
                  <option value="1">1PM</option>
                  <option value="2">2PM</option>
                  <option value="3">3PM</option>
                </select>
              </div>
              <div>
                <select
                  id={i.toString()}
                  style={{ backgroundColor: "black", color: "white" }}
                  name="end"
                  onChange={this.props.handleChangeOfficeHours}
                  value={hours.end}
                  required={true}
                >
                  <option value="">End Time</option>
                  <option value="4">4PM</option>
                  <option value="5">5PM</option>
                  <option value="6">6PM</option>
                </select>
              </div>
              <br />
            </div>
            {i !== 0 ? (
              <div>
                <Button
                  bsStyle="danger"
                  type="button"
                  onClick={() => this.props.removeOfficeHours(hours.id)}
                >
                  Delete Office Hours
                </Button>
              </div>
            ) : (
              ""
            )}
          </div>
        );
      });
    } else if (this.props.addNewOffice) {
      officeHours = this.props.addedOfficeHours.map((officeHour, i) => {
        return (
          <div key={i}>
            <h2 style={{ color: "white" }}>Day of Week</h2>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <MDBInput
                id={i.toString()}
                label="Monday"
                type="checkbox"
                name="monday"
                onChange={this.props.handleChangeOfficeHours}
                data-nest="true"
              />
              <MDBInput
                id={i.toString()}
                label="Tuesday"
                type="checkbox"
                name="tuesday"
                onChange={this.props.handleChangeOfficeHours}
                data-nest="true"
              />
              <MDBInput
                id={i.toString()}
                label="Wednesday"
                type="checkbox"
                name="wednesday"
                onChange={this.props.handleChangeOfficeHours}
                data-nest="true"
              />
              <MDBInput
                id={i.toString()}
                label="Thursday"
                type="checkbox"
                name="thursday"
                onChange={this.props.handleChangeOfficeHours}
                data-nest="true"
              />
              <MDBInput
                id={i.toString()}
                label="Friday"
                type="checkbox"
                name="friday"
                onChange={this.props.handleChangeOfficeHours}
                data-nest="true"
              />
              <MDBInput
                id={i.toString()}
                label="Saturday"
                type="checkbox"
                name="saturday"
                onChange={this.props.handleChangeOfficeHours}
                data-nest="true"
              />
              <MDBInput
                id={i.toString()}
                label="Sunday"
                type="checkbox"
                name="sunday"
                onChange={this.props.handleChangeOfficeHours}
                data-nest="true"
              />
            </div>
            <br />
            <div>
              <div>
                <select
                  id={i.toString()}
                  style={{ backgroundColor: "black", color: "white" }}
                  name="start"
                  onChange={this.props.handleChangeOfficeHours}
                  required={true}
                >
                  <option value="">Start Time</option>
                  <option value="1">1PM</option>
                  <option value="2">2PM</option>
                  <option value="3">3PM</option>
                </select>
              </div>
              <div>
                <select
                  id={i.toString()}
                  style={{ backgroundColor: "black", color: "white" }}
                  name="end"
                  onChange={this.props.handleChangeOfficeHours}
                  required={true}
                >
                  <option value="">End Time</option>
                  <option value="4">4PM</option>
                  <option value="5">5PM</option>
                  <option value="6">6PM</option>
                </select>
              </div>
              <br />
            </div>
            {i !== 0 ? (
              <div>
                <Button
                  bsStyle="danger"
                  type="button"
                  onClick={() => this.props.removeOfficeHours(i)}
                >
                  Delete Office Hours
                </Button>
              </div>
            ) : (
              ""
            )}
          </div>
        );
      });
    }
    return (
      <div>
        <h1 style={{ color: "white" }}>Edit Office Hours</h1>
        <div>{officeHours}</div>
        <button type="button" onClick={() => this.props.addOfficeHours()}>
          Add Office Hours
        </button>
      </div>
    );
  }
}

export default OfficeHours;
