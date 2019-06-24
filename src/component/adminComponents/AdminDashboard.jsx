import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import NavBar from './AdminNavBar';
import Home from './AdminHome';
import AdminRegister from './AdminRegister';
import AdminUpdate from "./AdminUpdate";
import AdminInstructorRegister from "./AdminInstructorRegister";
import AdminInstructorUpdate from "./AdminInstructorUpdate";
import AdminCourseCreate from "./AdminCourseCreate";
import AdminSubjectCreate from "./AdminSubjectCreate";
import AdminCourseUpdate from "./AdminCourseUpdate";
import AdminSubjectUpdate from "./AdminSubjectUpdate";

export default class AdminDashboard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <Router>
            <div className="AdminDashboard">
                <NavBar/>
                <div>
                    <Route exact path="/admin/dashboard" component={Home}/>
                    <Route exact path="/admin/dashboard/admin/add" component={AdminRegister}/>
                    <Route exact path="/admin/dashboard/admin/update" component={AdminUpdate}/>
                    <Route exact path="/admin/dashboard/instructor/add" component={AdminInstructorRegister}/>
                    <Route exact path="/admin/dashboard/instructor/update" component={AdminInstructorUpdate}/>
                    <Route exact path="/admin/dashboard/course/add" component={AdminCourseCreate}/>
                    <Route exact path="/admin/dashboard/course/update" component={AdminCourseUpdate}/>
                    <Route exact path="/admin/dashboard/subject/add" component={AdminSubjectCreate}/>
                    <Route exact path="/admin/dashboard/subject/update" component={AdminSubjectUpdate}/>
                </div>
            </div>
        </Router>
    }
}