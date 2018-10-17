import React, { Component } from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import "./App.css";
import Home from './routes/Home';
import UserProfile from './routes/UserProfile';
import CourseDetails from './routes/course-design/CourseDetails';
import CoursePending from './routes/CoursePending';
import CourseCompleted from './routes/CourseCompleted';
import CourseCompentencies from './routes/course-design/CourseCompetencies';
import CourseOutcomes from './routes/course-design/CourseOutcomes';
import LearningObjectives from './routes/course-design/LearningObjectives';
import ModuleDesign from './routes/course-design/ModuleDesign';
import DLPrintCenter from './routes/course-design/DLPrintCenter';
import DesignNav from "./navigation/DesignNav";
import InstructorNav from "./navigation/InstructorNav";

class App extends Component {
    constructor() {
        super();
        this.state = {
            Nav: 'instructor',
        };
        this.displayNav = this.displayNav.bind(this)
    };

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
            <div id="background" className="App">
                {this.state.Nav === 'instructor' ? <InstructorNav /> : <DesignNav/>}
                <div className="App-intro">
                    <Switch>
                        <Route exact path="/Home" render={(props) => <Home {...props} Nav={this.state.Nav} displayNav={this.displayNav}/>}/>
                        <Route path="/UserProfile" render={(props) => <UserProfile {...props} Nav={this.state.Nav} displayNav={this.displayNav}/>}/>
                        <Route path="/CourseDetails" render={(props) => <CourseDetails {...props} Nav={this.state.Nav} displayNav={this.displayNav}/>}/>
                        <Route path="/CoursePending" component={CoursePending} />
                        <Route path="/CourseCompleted" component={CourseCompleted} />
                        <Route path="/CourseCompentencies" component={CourseCompentencies} />
                        <Route path="/CourseOutcomes" component={CourseOutcomes} />
                        <Route path="/LearningObjectives" component={LearningObjectives} />
                        <Route path="/ModuleDesign" component={ModuleDesign} />
                        <Route path="/DL&PrintCenter" component={DLPrintCenter} />
                        <Route path = "*" render={(props) => <Home {...props} Nav={this.state.Nav} displayNav={this.displayNav}/>}/>
                        <Redirect to="/Home" />
                    </Switch>
                </div>
            </div>
        );
    }
}
 
export default App;
