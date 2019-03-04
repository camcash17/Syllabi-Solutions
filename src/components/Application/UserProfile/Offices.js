import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import { MDBInput, MDBFormInline } from "mdbreact";

import OfficeHours from "./OfficeHours";

class Offices extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        let officeForm;
        if(this.props.officeSelected){
          officeForm = (
            <div hidden={!this.props.officeSelected} style={{marginLeft: '20px'}} >
              <MDBInput id={this.props.officeSelected} style={{color: 'white'}} type='text' onChange={this.props.onChange} name='campusName' label='Campus Name' data-nest="true" value={this.props.officeState.campusName} />
              <MDBInput id={this.props.officeSelected} style={{color: 'white'}} type='text' onChange={this.props.onChange} name='buildingName' label='Building Name' data-nest="true" value={this.props.officeState.buildingName}/>
              <MDBInput id={this.props.officeSelected} style={{color: 'white'}} type='text' onChange={this.props.onChange} name='officeNum' label='Suite or Office #' data-nest="true" value={this.props.officeState.officeNum}/>
              <MDBInput id={this.props.officeSelected} style={{color: 'white'}} type='text' onChange={this.props.onChange} name='address' label='Address Line' data-nest="true" value={this.props.officeState.address}/>
              <MDBInput id={this.props.officeSelected} style={{color: 'white'}} type='text' onChange={this.props.onChange} name='zip' label='Zipcode' data-nest="true" value={this.props.officeState.zip}/>
              <MDBInput id={this.props.officeSelected} style={{color: 'white'}} type='text' onChange={this.props.onChange} name='city' label='City' data-nest="true" value={this.props.officeState.city}/>
              <MDBInput id={this.props.officeSelected} style={{color: 'white'}} type='text' onChange={this.props.onChange} name='state' label='State' data-nest="true" value={this.props.officeState.state}/>
              <MDBInput id={this.props.officeSelected} style={{color: 'white'}} type='text' onChange={this.props.onChange} name='country' label='Country' data-nest="true" value={this.props.officeState.country}/>
              <OfficeHours
                    officeSelected={this.props.officeSelected}
                    onChange={this.props.onChange}
                    officeHoursState={this.props.officeState.officeHours[0]}
                    addNewOffice={this.props.addNewOffice}
                    officeCounter={this.props.officeCounter}
                />
              <MDBInput id={this.props.officeSelected} style={{color: 'white'}} type='text' onChange={this.props.onChange} name='comments' label='Comments' data-nest="true" value={this.props.officeState.comments}/>
            </div>
          )
        } else if(this.props.addNewOffice){
          this.props.userState ? (
            officeForm = (
              <div style={{marginLeft: '20px'}} >
                <MDBInput required="true" id={this.props.officeCounter.toString()} style={{color: 'white'}} type='text' onChange={this.props.onChange} name='campusName' label='Campus Name' data-nest="true"/>
                <MDBInput required="true" id={this.props.officeCounter.toString()} style={{color: 'white'}} type='text' onChange={this.props.onChange} name='buildingName' label='Building Name' data-nest="true" />
                <MDBInput required="true" id={this.props.officeCounter.toString()} style={{color: 'white'}} type='text' onChange={this.props.onChange} name='officeNum' label='Suite or Office #' data-nest="true" />
                <MDBInput required="true" id={this.props.officeCounter.toString()} style={{color: 'white'}} type='text' onChange={this.props.onChange} name='address' label='Address Line' data-nest="true" />
                <MDBInput required="true" id={this.props.officeCounter.toString()} style={{color: 'white'}} type='text' onChange={this.props.onChange} name='zip' label='Zipcode' data-nest="true" />
                <MDBInput required="true" id={this.props.officeCounter.toString()} style={{color: 'white'}} type='text' onChange={this.props.onChange} name='city' label='City' data-nest="true" />
                <MDBInput required="true" id={this.props.officeCounter.toString()} style={{color: 'white'}} type='text' onChange={this.props.onChange} name='state' label='State' data-nest="true" />
                <MDBInput required="true" id={this.props.officeCounter.toString()} style={{color: 'white'}} type='text' onChange={this.props.onChange} name='country' label='Country' data-nest="true" />
                <OfficeHours
                    officeSelected={this.props.officeSelected}
                    onChange={this.props.onChange}
                    officeHoursState={this.props.officeState.officeHours[0]}
                    addNewOffice={this.props.addNewOffice}
                    officeCounter={this.props.officeCounter}
                />
                <MDBInput id={this.props.officeCounter.toString()} style={{color: 'white'}} type='text' onChange={this.props.onChange} name='comments' label='Comments' data-nest="true" />
              </div>
            )
          ) : (
            officeForm = this.props.loading
          )
        }
        return ( 
            <div>
                {officeForm}
            </div>
         );
    }
}
 
export default Offices;