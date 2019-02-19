import React, { Component } from "react";
import logo from "../../../../assets/img/logo.png";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import * as ROUTES from '../../../../constants/routes';

import { connect } from 'react-redux';
import * as ROLES from '../../../../constants/roles';

import InstructorNav from './InstructorNav';
import DesignNav from './DesignNav';

const HeaderNav = (props) =>
  props.authUser ? (
    <NavigationAuth authUser={props.authUser} currentNav={props.currentNav} DisplayName={props.DisplayName} />
  ) : (
    <NavigationNonAuth />
  );

  const NavigationAuth = (props) => (
    props.currentNav === 'instructor' ? <InstructorNav DisplayName={props.DisplayName} authUser={props.authUser} /> : <DesignNav DisplayName={props.DisplayName} authUser={props.authUser} />
  );
  
  const NavigationNonAuth = () => (
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
                <NavItem style={{float: "right"}} eventKey={1}>Design a Course</NavItem>
            </Nav>
            <Nav pullRight>
                {/* <LinkContainer to={ROUTES.USER_PROFILE}>
                {(this.props.DisplayName) ?
                    <NavItem eventKey={1}>{this.props.DisplayName}</NavItem> :
                    <NavItem eventKey={1}>My Profile</NavItem>}
                </LinkContainer> */}
                <NavItem eventKey={2} href="#">Help</NavItem>
                <LinkContainer to={ROUTES.SIGN_IN}>
                    <NavItem eventKey={3}>Sign In</NavItem>
                </LinkContainer>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
  
  const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
  });
  
  export default connect(mapStateToProps)(HeaderNav);