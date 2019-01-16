import React, { Component } from "react";
import logo from "../../../../assets/img/logo.png";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import * as ROUTES from '../../../../constants/routes';

class DesignNav extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() { 
        return (
            <div className="design-nav">
                <Navbar style={{marginBottom: "0px", borderRadius: "0px"}} inverse collapseOnSelect>
                    <Navbar.Header>
                        <LinkContainer to={ROUTES.HOME}>
                            <Navbar.Brand>
                                <img src={logo} style={{width:100, height:50, margin: 0, padding: 0}}/>
                            </Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav style={{fontSize: "20px", marginLeft: "34%"}}>
                            <LinkContainer to={ROUTES.COURSE_DETAILS}>
                                <NavItem style={{float: "right"}} eventKey={1}>Design a Course</NavItem>
                            </LinkContainer>
                        </Nav>
                        <Nav pullRight>
                            <LinkContainer to={ROUTES.USER_PROFILE}>
                            {(this.props.DisplayName) ?
                                <NavItem eventKey={1}>{this.props.DisplayName}</NavItem> :
                                <NavItem eventKey={1}>My Profile</NavItem>}
                            </LinkContainer>
                            <NavItem eventKey={2} href="#">
                                Help
                            </NavItem>
                            <NavItem eventKey={3} href="#">
                                Sign Out
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Navbar style={{borderRadius: "0px"}} inverse collapseOnSelect>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav style={{marginLeft: "5%"}}>
                            <LinkContainer to={ROUTES.HOME}>
                                <NavItem eventKey={1}>Home</NavItem>
                            </LinkContainer>
                            <LinkContainer to={ROUTES.COURSE_DETAILS}>
                                <NavItem eventKey={2}>Course Details</NavItem>
                            </LinkContainer>
                            <LinkContainer to={ROUTES.COURSE_COMPETENCIES}>
                                <NavItem eventKey={3}>Course Compentencies</NavItem>
                            </LinkContainer>
                            <LinkContainer to={ROUTES.COURSE_OUTCOMES}>
                                <NavItem eventKey={4}>Course Outcomes</NavItem>
                            </LinkContainer>
                            <LinkContainer to={ROUTES.LEARNING_OBJECTIVES}>
                                <NavItem eventKey={5}>Learning Objectives</NavItem>
                            </LinkContainer>
                            <LinkContainer to={ROUTES.MODULE_DESIGN}>
                                <NavItem eventKey={6}>Module Design</NavItem>
                            </LinkContainer>
                            <LinkContainer to={ROUTES.DL_PRINT_CENTER}>
                                <NavItem eventKey={7}>Download & Print Center</NavItem>
                            </LinkContainer>
                            {/* <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                                <MenuItem eventKey={3.1}>Action</MenuItem>
                                <MenuItem eventKey={3.2}>Another action</MenuItem>
                                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={3.3}>Separated link</MenuItem>
                            </NavDropdown> */}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
         );
    }
}
 
export default DesignNav;