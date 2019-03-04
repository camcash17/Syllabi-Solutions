import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "../../index.css";

import Home from '../Home';
import { UserProfile } from '../Application/UserProfile/';
import CourseDetails from '../Application/course-design/CourseDetails';
import CoursePending from '../Application/CoursePending';
import CourseCompleted from '../Application/CourseCompleted';
import CourseCompetencies from '../Application/course-design/CourseCompetencies';
import CourseOutcomes from '../Application/course-design/CourseOutcomes';
import LearningObjectives from '../Application/course-design/LearningObjectives';
import ModuleDesign from '../Application/course-design/ModuleDesign';
import DLPrintCenter from '../Application/course-design/DLPrintCenter';

import Nav from "../Application/header/Nav";
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
            Nav: 'instructor',
        };
        this._isMounted = false;
        this.displayNav = this.displayNav.bind(this);
        this.updateUser = this.updateUser.bind(this);
    };

    componentDidMount(){
        this._isMounted = true;
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

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

    updateUser(){
        this.setState({
            updateUser: !this.state.updateUser
        });
    }

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
                            <Route path={ROUTES.USER_PROFILE} render={(props) => <UserProfile {...props} Nav={this.state.Nav} displayNav={this.displayNav} />}/>
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
