import React, { Component } from "react";
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axio from "axios";
import '../../css/index-footer.css'
import '../../css/instructor-profile.css'
import '../../css/instructor-login.css'

import InstructorProfileHome from "./instructor-profile-home";
import AcceptCourses from "./instructor-accept-courses";

import AddAssignments from "./instructor-add-assignments";
import AddExam from "./instructor-add-exam";

import AllAssignments from "./instructor-all-assignment";
import AllExams from "./instructor-all-exams";

import EditAssignmentDate from "./instructor-edit-assignment-date";
import EditExamDate from "./instructor-edit-exam-date";
import ProvideMarks from "./instructor-provide-marks";

export default class InstructorProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coursesToAccept: 0
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axio.get("http://localhost:3000/courseweb/courses").then(res => {
      this.setState({
        coursesToAccept: res.data
      });
    });
  }

  onSubmit(){    
    this.props.history.push(`/`);
  }

  getCount() {
    if (this.state.coursesToAccept <= 0) {
      return 0;
    } else {
      if (this.state.coursesToAccept < 10) {
        return "0" + this.state.coursesToAccept;
      } else {
        return this.state.coursesToAccept;
      }
    }
  }

  render() {
    let username = this.props.match.params.username;
    return (
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
          <a className="navbar-brand mr-1" href={`/instructor/${username}`}>
            W.W Coders | {this.props.match.params.username}
          </a>

          <button
            className="btn btn-link btn-sm text-white order-1 order-sm-0"
            id="sidebarToggle"
            href="#"
          >
            {/* <i className="fa fa-bars" /> */}
          </button>

          <div className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
            <div className="input-group">
              <button
              onClick={this.onSubmit}
              className="btn btn-info">
                Logout <i className="fa fa-sign-out" />
              </button>
            </div>
          </div>
        </nav>

        <div id="wrapper">
          <ul className="sidebar navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to={`/instructor/${username}`}>
                <i className="fa fa-home" />
                <span> Profile</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link dropdown"
                to={`/instructor/${username}/accept/course`}
              >
                <i className="fa fa-check" />
                <span> Accept Courses </span>
                <i className="fa fa-bell" />
                <span className="badge badge-danger" style={{ fontSize: 12 }}>
                  {this.getCount()}
                </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to={`/instructor/${username}/assignment/add`}
              >
                <i className="fa fa-plus" />
                <span> Add Assignement</span>
              </Link>
            </li>

            <li className="nav-item">
              <a
                href={`/instructor/${username}/assignments/update`}
                className="nav-link"
              >
                <i className="fa fa-calendar" />
                <span> Update Assi. Date</span>
              </a>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to={`/instructor/${username}/exam/add`}
              >
                <i className="fa fa-plus" />
                <span> Add Exam</span>
              </Link>
            </li>

            <li className="nav-item">
              <a
                href={`/instructor/${username}/exams/update`}
                className="nav-link"
              >
                <i className="fa fa-calendar" />
                <span> Update Exam Date</span>
              </a>
            </li>

            <li className="nav-item">
              <Link to={`/instructor/${username}/marks`} className="nav-link">
                <i className="fa fa-viacoin" />
                <span> Provide Marks</span>
              </Link>
            </li>
          </ul>

          <Switch>
            <Route
              exact
              path={`/instructor/${username}`}
              render={props => <InstructorProfileHome {...props} />}
            />

            <Route
              path={`/instructor/${username}/accept/course`}
              render={props => <AcceptCourses {...props} username={username} />}
            />

            {/* add */}
            <Route
              path={`/instructor/${username}/assignment/add`}
              render={props => (
                <AddAssignments {...props} username={username} />
              )}
            />

            <Route
              path={`/instructor/${username}/exam/add`}
              render={props => <AddExam {...props} username={username} />}
            />

            {/* all */}
            <Route
              path={`/instructor/${username}/assignments/update`}
              render={props => (
                <AllAssignments {...props} username={username} />
              )}
            />

            <Route
              path={`/instructor/${username}/exams/update`}
              render={props => <AllExams {...props} username={username} />}
            />

            {/* update */}
            <Route
              path={`/instructor/${username}/assignments/update/:assignmentID`}
              component={EditAssignmentDate}
            />

            <Route
              path={`/instructor/${username}/exams/update/:examID`}
              component={EditExamDate}
            />

            {/* marks */}
            <Route
              path={`/instructor/${username}/marks`}
              render={props => <ProvideMarks {...props} username={username} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
