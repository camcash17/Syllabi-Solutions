import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { MDBInput, MDBFormInline } from "mdbreact";

import OfficeHours from "./OfficeHours";

class Offices extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { officeSelected, officeState } = this.props;
    let officeForm;
    if (officeSelected) {
      officeForm = (
        <div hidden={!officeSelected} style={{ marginLeft: "20px" }}>
          <Button
            bsStyle="danger"
            type="button"
            onClick={() => this.props.removeOffices(officeSelected)}
          >
            Delete Office
          </Button>
          <MDBInput
            id={officeSelected}
            style={{ color: "white" }}
            type="text"
            onChange={this.props.handleChangeOffices}
            name="campusName"
            label="Campus Name"
            data-nest="true"
            value={officeState.campusName}
            required={true}
          />
          <MDBInput
            id={officeSelected}
            style={{ color: "white" }}
            type="text"
            onChange={this.props.handleChangeOffices}
            name="buildingName"
            label="Building Name"
            data-nest="true"
            value={officeState.buildingName}
            required={true}
          />
          <MDBInput
            id={officeSelected}
            style={{ color: "white" }}
            type="text"
            onChange={this.props.handleChangeOffices}
            name="officeNum"
            label="Suite or Office #"
            data-nest="true"
            value={officeState.officeNum}
            required={true}
          />
          <MDBInput
            id={officeSelected}
            style={{ color: "white" }}
            type="text"
            onChange={this.props.handleChangeOffices}
            name="address"
            label="Address Line"
            data-nest="true"
            value={officeState.address}
            required={true}
          />
          <MDBInput
            id={officeSelected}
            style={{ color: "white" }}
            type="text"
            onChange={this.props.handleChangeOffices}
            name="zip"
            label="Zipcode"
            data-nest="true"
            value={officeState.zip}
            required={true}
          />
          <MDBInput
            id={officeSelected}
            style={{ color: "white" }}
            type="text"
            onChange={this.props.handleChangeOffices}
            name="city"
            label="City"
            data-nest="true"
            value={officeState.city}
            required={true}
          />
          <MDBInput
            id={officeSelected}
            style={{ color: "white" }}
            type="text"
            onChange={this.props.handleChangeOffices}
            name="state"
            label="State"
            data-nest="true"
            value={officeState.state}
            required={true}
          />
          <MDBInput
            id={officeSelected}
            style={{ color: "white" }}
            type="text"
            onChange={this.props.handleChangeOffices}
            name="country"
            label="Country"
            data-nest="true"
            value={officeState.country}
            required={true}
          />
          <MDBInput
            id={officeSelected}
            style={{ color: "white" }}
            type="text"
            onChange={this.props.handleChangeOffices}
            name="comments"
            label="Comments"
            data-nest="true"
            value={officeState.comments}
          />
          <OfficeHours
            officeSelected={officeSelected}
            addNewOffice={this.props.addNewOffice}
            selectedOfficeHours={this.props.selectedOfficeHours}
            addOfficeHours={this.props.addOfficeHours}
            handleChangeOfficeHours={this.props.handleChangeOfficeHours}
            removeOfficeHours={this.props.removeOfficeHours}
          />
        </div>
      );
    } else if (this.props.addNewOffice) {
      this.props.userState
        ? (officeForm = (
            <div style={{ marginLeft: "20px" }}>
              <MDBInput
                required={true}
                id={this.props.officeCounter.toString()}
                style={{ color: "white" }}
                type="text"
                onChange={this.props.handleChangeOffices}
                name="campusName"
                label="Campus Name"
                data-nest="true"
                required={true}
              />
              <MDBInput
                required={true}
                id={this.props.officeCounter.toString()}
                style={{ color: "white" }}
                type="text"
                onChange={this.props.handleChangeOffices}
                name="buildingName"
                label="Building Name"
                data-nest="true"
                required={true}
              />
              <MDBInput
                required={true}
                id={this.props.officeCounter.toString()}
                style={{ color: "white" }}
                type="text"
                onChange={this.props.handleChangeOffices}
                name="officeNum"
                label="Suite or Office #"
                data-nest="true"
                required={true}
              />
              <MDBInput
                required={true}
                id={this.props.officeCounter.toString()}
                style={{ color: "white" }}
                type="text"
                onChange={this.props.handleChangeOffices}
                name="address"
                label="Address Line"
                data-nest="true"
                required={true}
              />
              <MDBInput
                required={true}
                id={this.props.officeCounter.toString()}
                style={{ color: "white" }}
                type="text"
                onChange={this.props.handleChangeOffices}
                name="zip"
                label="Zipcode"
                data-nest="true"
                required={true}
              />
              <MDBInput
                required={true}
                id={this.props.officeCounter.toString()}
                style={{ color: "white" }}
                type="text"
                onChange={this.props.handleChangeOffices}
                name="city"
                label="City"
                data-nest="true"
                required={true}
              />
              <MDBInput
                required={true}
                id={this.props.officeCounter.toString()}
                style={{ color: "white" }}
                type="text"
                onChange={this.props.handleChangeOffices}
                name="state"
                label="State"
                data-nest="true"
                required={true}
              />
              <MDBInput
                required={true}
                id={this.props.officeCounter.toString()}
                style={{ color: "white" }}
                type="text"
                onChange={this.props.handleChangeOffices}
                name="country"
                label="Country"
                data-nest="true"
                required={true}
              />
              <MDBInput
                id={this.props.officeCounter.toString()}
                style={{ color: "white" }}
                type="text"
                onChange={this.props.handleChangeOffices}
                name="comments"
                label="Comments"
                data-nest="true"
              />
              <OfficeHours
                officeSelected={officeSelected}
                addNewOffice={this.props.addNewOffice}
                addedOfficeHours={this.props.addedOfficeHours}
                addOfficeHours={this.props.addOfficeHours}
                handleChangeOfficeHours={this.props.handleChangeOfficeHours}
                removeOfficeHours={this.props.removeOfficeHours}
              />
            </div>
          ))
        : (officeForm = this.props.loading);
    }
    return <div>{officeForm}</div>;
  }
}

export default Offices;
