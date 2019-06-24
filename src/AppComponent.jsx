import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

//Admin imports
import AdminLogin from './component/adminComponents/AdminLogin';
import AdminDashboard from './component/adminComponents/AdminDashboard';
import AdminAuthentication from './component/adminComponents/AdminAuthentication';
import AdminPassReset from "./component/adminComponents/AdminPassReset";

//Instructor imports
import InstructorLoginForm from "./component/instructorComponents/instructor-login-form";
import InstructorProfile from "./component/instructorComponents/instructor-profile";
import Homepage from "./component/instructorComponents/index-homepage";
import AddAssignment from "./component/instructorComponents/instructor-add-assignments";
import AllAssignments from "./component/instructorComponents/instructor-all-assignment";
import EditAssignmentDate from './component/instructorComponents/instructor-edit-assignment-date';

//Student imports
import StudentLoginForm from "./component/studentComponents/student-login";
import StudentProfile from "./component/studentComponents/student_profile";
import StudentSignup from "./component/studentComponents/student-signup";

//FileManagement imports
import FileUpload from  "./component/fileManagementComponent/FileUpload"

export default class AppComponent extends Component{

    constructor(props) {
        super(props);
        this.state = {
            loginClicked: false
        };
    }

    render() {
        return <Router>
            <div className="AppContainer">
                <Switch>
                    {/*Admin Routes*/}
                    <Route exact path="/admin" component={AdminLogin}/>
                    <Route exact path="/admin/reset" component={AdminPassReset}/>
                    <AdminAuthentication path="/admin/dashboard" component={AdminDashboard}/>

                    {/*Instructor Routes*/}
                    <Route exact path="/" render={props => <Homepage {...props} />} />
                    <Route path="/login" component={InstructorLoginForm} />
                    <Route path="/instructor/:username" component={InstructorProfile} />
                    <Route path="/instructor/:username/assignment/add" component={AddAssignment}/>
                    <Route path={`/instructor/:username/assignments/update`} component={AllAssignments}/>
                    <Route path={`/instructor/:username/assignments/update/:assignmentID`} component={EditAssignmentDate}/>

                    {/*Student Routes*/}
                    <Route path="/student/login" component={StudentLoginForm} />
                    <Route path="/student/profile" component={StudentProfile} />
                    <Route path="/student/register/" component={StudentSignup}/>

                    {/*File Management Routes*/}
                    <Route path="/student/files" component={FileUpload} />

                </Switch>
            </div>
        </Router>
    }
}