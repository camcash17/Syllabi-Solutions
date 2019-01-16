import React, { Component } from "react";
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

import Navigation from '../Navigation';
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

    componentDidMount(){
        this._isMounted = true;
        axios({
          method: 'GET',
          url: '/users'
        })
        .then( res => {
          const user = res.data.data
          this._isMounted ?
          this.setState({
            user: user,
            DisplayName: res.data.data[0].firstname
          }) : ''
        })
        .catch( err => {
          console.log(err)
        })
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

    render() {
        return (
            <Router>
                <div id="background" className="App">
                    {this.state.Nav === 'instructor' ? <InstructorNav DisplayName={this.state.DisplayName} /> : <DesignNav DisplayName={this.state.DisplayName} />}
                    <div className="App-intro">
                        <Navigation />
                        <Switch>
                            
                            <Route exact path={ROUTES.LANDING} render={(props) => <LandingPage {...props} Nav={this.state.Nav} displayNav={this.displayNav} />} />
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
                            <Route path = "*" render={(props) => <LandingPage {...props} Nav={this.state.Nav} displayNav={this.displayNav}/>}/>
                            <Redirect to="/" />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}
 
export default withAuthentication(App);