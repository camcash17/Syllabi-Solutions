import React, { Component } from "react";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import axios from 'axios';
import "../../index.css";

import Home from '../Home';
import UserProfile from '../Application/app/UserProfile';
import CourseDetails from '../Application/app/course-design/CourseDetails';
import CoursePending from '../Application/app/CoursePending';
import CourseCompleted from '../Application/app/CourseCompleted';
import CourseCompetencies from '../Application/app/course-design/CourseCompetencies';
import CourseOutcomes from '../Application/app/course-design/CourseOutcomes';
import LearningObjectives from '../Application/app/course-design/LearningObjectives';
import ModuleDesign from '../Application/app/course-design/ModuleDesign';
import DLPrintCenter from '../Application/app/course-design/DLPrintCenter';
import DesignNav from "../Application/app/header/DesignNav";
import InstructorNav from "../Application/app/header/InstructorNav";

import Nav from "../Application/app/header/Nav";
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            Nav: 'instructor',
            DisplayName: '',
        };
        this._isMounted = false;
        this.displayNav = this.displayNav.bind(this);
    };

    // componentDidMount(){
    //     let user;
    //     this._isMounted = true;
    //     this.props.firebase
    //     .doGetUserInfo(userUid)
    //     .then(userInfo => {
    //         user = userInfo;
    //         console.log('user', user);
    //         this._isMounted ?
    //         this.setState({
    //             user: user,
    //         }) : ''
    //     })
    //     .catch( err => {
    //         console.log(err)
    //     })

    //     axios({
    //       method: 'GET',
    //       url: '/users'
    //     })
    //     .then( res => {
    //       user = res.data.data
    //       this._isMounted ?
    //       this.setState({
    //         user: user,
    //         DisplayName: res.data.data[0].firstname
    //       }) : ''
    //     })
    //     .catch( err => {
    //       console.log(err)
    //     })
    // }
    // componentWillUnmount(){
    //     this._isMounted = false;
    // }

    displayNav(nav){
        if(nav === 'design') {
            this.setState({
                Nav: "design"
            });
        } else if(nav === 'instructor') {
            this.setState({
                Nav: "instructor"
            });
        };
    };

    render() {
        return (
            <Router>
                <div id="background" className="App">
                    <div id="navigation">
                        <Nav currentNav={this.state.Nav} DisplayName={this.state.DisplayName}/>
                    </div>
                    <div id="content" className="App-intro">
                        <Switch>
                            <Route path={ROUTES.HOME} render={(props) => <Home {...props} Nav={this.state.Nav} displayNav={this.displayNav} />}/>
                            <Route path={ROUTES.USER_PROFILE} render={(props) => <UserProfile {...props} user={this.state.user} Nav={this.state.Nav} displayNav={this.displayNav} />}/>
                            <Route path={ROUTES.COURSE_DETAILS} render={(props) => <CourseDetails {...props} Nav={this.state.Nav} displayNav={this.displayNav} />} />
                            <Route path={ROUTES.COURSE_PENDING} component={CoursePending} />
                            <Route path={ROUTES.COURSE_COMPLETED} component={CourseCompleted} />
                            <Route path={ROUTES.COURSE_COMPETENCIES} component={CourseCompetencies} />
                            <Route path={ROUTES.COURSE_OUTCOMES} component={CourseOutcomes} />
                            <Route path={ROUTES.LEARNING_OBJECTIVES} component={LearningObjectives} />
                            <Route path={ROUTES.MODULE_DESIGN} component={ModuleDesign} />
                            <Route path={ROUTES.DL_PRINT_CENTER} component={DLPrintCenter} />

                            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
                            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                            <Route path={ROUTES.ADMIN} component={AdminPage} />
                            <Route exact path={ROUTES.LANDING} render={(props) => <LandingPage {...props} Nav={this.state.Nav} displayNav={this.displayNav} />} />
                            {/* <Route path = "*" render={(props) => <Home {...props} Nav={this.state.Nav} displayNav={this.displayNav}/>}/>
                            <Redirect to="/" /> */}
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}
 
export default withAuthentication(App);
