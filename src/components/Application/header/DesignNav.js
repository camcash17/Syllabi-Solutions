import React, { Component } from "react";
import logo from "../../../assets/img/logo.png";
import { Link } from "react-router-dom";
import { LinkContainer, IndexLinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import * as ROUTES from '../../../constants/routes';
import { withFirebase } from '../../Firebase';
import { connect } from 'react-redux';
import store from '../../../store';

class DesignNav extends Component {
    constructor() {
        super();
        this.state = {
            update: ''
        };
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.props.firebase
        .user(this.props.authUser.uid)
        .on('value', snapshot => {
          this.props.onSetUser(
            snapshot.val(),
            this.props.authUser.uid,
          );
        });
    }

    componentWillUnmount() {
        this.props.firebase.user(this.props.authUser.uid).off();
    }

    update() {
        this.setState({
            update: true
        })
    }

    render() { 
        return (
            <div className="design-nav">
                <Navbar style={{marginBottom: "0px", borderRadius: "0px"}} inverse collapseOnSelect>
                    <Navbar.Header>
                        <LinkContainer exact to={ROUTES.HOME} onClick={this.update}>
                            <Navbar.Brand>
                                <img src={logo} style={{width:100, height:50, margin: 0, padding: 0}}/>
                            </Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav style={{fontSize: "20px", marginLeft: "34%"}}>
                            <LinkContainer exact to={ROUTES.COURSE_DETAILS} onClick={this.update}>
                                <NavItem style={{float: "right"}} eventKey={1}>Design a Course</NavItem>
                            </LinkContainer>
                        </Nav>
                        <Nav pullRight>
                            {(this.props.authUser.emailVerified) ?
                            <LinkContainer exact to={ROUTES.USER_PROFILE} onClick={this.update}>
                            {(this.props.user) ?
                                <NavItem>{this.props.user.username}</NavItem> :
                                <NavItem>My Profile</NavItem>}
                            </LinkContainer> :
                            <LinkContainer exact to={ROUTES.ACCOUNT}>
                            {(this.props.users) ?
                                <NavItem>{this.props.user.username}</NavItem> :
                                <NavItem>My Profile</NavItem>}
                            </LinkContainer> }
                            <NavItem>
                                Help
                            </NavItem>
                            <LinkContainer exact to={ROUTES.LANDING} onClick={this.update}>
                                <NavItem onClick={this.props.firebase.doSignOut}>
                                    Sign Out
                                </NavItem>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Navbar style={{marginBottom: "0px", borderRadius: "0px"}} inverse collapseOnSelect>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav style={{marginLeft: "5%"}}>
                            <IndexLinkContainer exact to={ROUTES.HOME} onClick={this.update}>
                                <NavItem>Home</NavItem>
                            </IndexLinkContainer>
                            <LinkContainer exact to={ROUTES.COURSE_DETAILS} onClick={this.update}>
                                <NavItem>Course Details</NavItem>
                            </LinkContainer>
                            <LinkContainer exact to={ROUTES.COURSE_COMPETENCIES} onClick={this.update}>
                                <NavItem>Course Compentencies</NavItem>
                            </LinkContainer>
                            <LinkContainer exact to={ROUTES.COURSE_OUTCOMES} onClick={this.update}>
                                <NavItem>Course Outcomes</NavItem>
                            </LinkContainer>
                            <LinkContainer exact to={ROUTES.LEARNING_OBJECTIVES} onClick={this.update}>
                                <NavItem>Learning Objectives</NavItem>
                            </LinkContainer>
                            <LinkContainer exact to={ROUTES.MODULE_DESIGN} onClick={this.update}>
                                <NavItem>Module Design</NavItem>
                            </LinkContainer>
                            <LinkContainer exact to={ROUTES.DL_PRINT_CENTER} onClick={this.update}>
                                <NavItem>Download & Print Center</NavItem>
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

const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
    user: (state.userState.users || {})[store.getState().sessionState.authUser.uid],
  });

const mapDispatchToProps = dispatch => ({
    onSetUser: (user, uid) => dispatch({ type: 'USER_SET', user, uid }),
});
 
export default connect(mapStateToProps, mapDispatchToProps)(withFirebase(DesignNav));