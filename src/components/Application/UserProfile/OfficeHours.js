import React, { Component } from "react";
import { MDBInput } from "mdbreact";

class OfficeHours extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        let officeHours;
        if(this.props.officeSelected){
            officeHours = (
                <div>
                <h1 style={{color: 'white'}}>Edit Office Hours</h1>
                <h2 style={{color: 'white'}}>Day of Week</h2>
                  <div>
                      <MDBInput id={this.props.officeSelected} label="Monday" type="checkbox" name="monday" onChange={this.props.onChange} data-nest="true" data-nest2="true" data-nest3="true" checked={this.props.officeHoursState.days.monday}/>
                      <MDBInput id={this.props.officeSelected} label="Tuesday" type="checkbox" name="tuesday" onChange={this.props.onChange} data-nest="true" data-nest2="true" data-nest3="true" checked={this.props.officeHoursState.days.tuesday}/>
                      <MDBInput id={this.props.officeSelected} label="Wednesday" type="checkbox" name="wednesday" onChange={this.props.onChange} data-nest="true" data-nest2="true" data-nest3="true" checked={this.props.officeHoursState.days.wednesday}/>
                      <MDBInput id={this.props.officeSelected} label="Thursday" type="checkbox" name="thursday" onChange={this.props.onChange} data-nest="true" data-nest2="true" data-nest3="true" checked={this.props.officeHoursState.days.thursday}/>
                      <MDBInput id={this.props.officeSelected} label="Friday" type="checkbox" name="friday" onChange={this.props.onChange} data-nest="true" data-nest2="true" data-nest3="true" checked={this.props.officeHoursState.days.friday}/>
                      <MDBInput id={this.props.officeSelected} label="Saturday" type="checkbox" name="saturday" onChange={this.props.onChange} data-nest="true" data-nest2="true" data-nest3="true" checked={this.props.officeHoursState.days.saturday}/>
                      <MDBInput id={this.props.officeSelected} label="Sunday" type="checkbox" name="sunday" onChange={this.props.onChange} data-nest="true" data-nest2="true" data-nest3="true" checked={this.props.officeHoursState.days.sunday}/>
                  </div>
                  <div>
                    <div>
                      <select id={this.props.officeSelected} style={{backgroundColor: 'black', color: 'white'}} name="start" onChange={this.props.onChange} data-nest="true" data-nest2="true" value={this.props.officeHoursState.start}>
                        <option>Start Time</option>
                        <option value="1">1PM</option>
                        <option value="2">2PM</option>
                        <option value="3">3PM</option>
                      </select>
                    </div>
                    <div>
                      <select id={this.props.officeSelected} style={{backgroundColor: 'black', color: 'white'}} name="end" onChange={this.props.onChange} data-nest="true" data-nest2="true" value={this.props.officeHoursState.end}>
                        <option>End Time</option>
                        <option value="4">4PM</option>
                        <option value="5">5PM</option>
                        <option value="6">6PM</option>
                      </select>
                    </div>
                </div>
              </div>
            )
        } else if(this.props.addNewOffice){
            officeHours = (
                <div>
                  <h1 style={{color: 'white'}}>Edit Office Hours</h1>
                  <h2 style={{color: 'white'}}>Day of Week</h2>
                    <div>
                        <MDBInput id={this.props.officeCounter.toString()} label="Monday" type="checkbox" name="monday" onChange={this.props.onChange} data-nest="true" data-nest2="true" data-nest3="true"/>
                        <MDBInput id={this.props.officeCounter.toString()} label="Tuesday" type="checkbox" name="tuesday" onChange={this.props.onChange} data-nest="true" data-nest2="true" data-nest3="true"/>
                        <MDBInput id={this.props.officeCounter.toString()} label="Wednesday" type="checkbox" name="wednesday" onChange={this.props.onChange} data-nest="true" data-nest2="true" data-nest3="true"/>
                        <MDBInput id={this.props.officeCounter.toString()} label="Thursday" type="checkbox" name="thursday" onChange={this.props.onChange} data-nest="true" data-nest2="true" data-nest3="true"/>
                        <MDBInput id={this.props.officeCounter.toString()} label="Friday" type="checkbox" name="friday" onChange={this.props.onChange} data-nest="true" data-nest2="true" data-nest3="true"/>
                        <MDBInput id={this.props.officeCounter.toString()} label="Saturday" type="checkbox" name="saturday" onChange={this.props.onChange} data-nest="true" data-nest2="true" data-nest3="true"/>
                        <MDBInput id={this.props.officeCounter.toString()} label="Sunday" type="checkbox" name="sunday" onChange={this.props.onChange} data-nest="true" data-nest2="true" data-nest3="true"/>
                    </div>
                    <div>
                        <div>
                            <select id={this.props.officeCounter.toString()} style={{backgroundColor: 'black', color: 'white'}} name="start" onChange={this.props.onChange} data-nest="true" data-nest2="true">
                                <option>Start Time</option>
                                <option value="1">1PM</option>
                                <option value="2">2PM</option>
                                <option value="3">3PM</option>
                            </select>
                        </div>
                        <div>
                            <select id={this.props.officeCounter.toString()} style={{backgroundColor: 'black', color: 'white'}} name="end" onChange={this.props.onChange} data-nest="true" data-nest2="true">
                                <option>End Time</option>
                                <option value="4">4PM</option>
                                <option value="5">5PM</option>
                                <option value="6">6PM</option>
                            </select>
                        </div>
                    </div>
                </div>
            )
        }
        return ( 
            <div>{officeHours}</div>
         );
    }
}
 
export default OfficeHours;