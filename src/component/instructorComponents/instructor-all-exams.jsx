import React, { Component } from "react";
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import '../../css/index-footer.css'
import '../../css/instructor-profile.css'
import '../../css/instructor-login.css'
import axio from "axios";

import EditExamDate from "./instructor-edit-exam-date";
import AllExamsSubsidory from "./instructor-all-exam-subsidory";

const ShowAssignments = props => (
  <tr>
    <td>{props.assignment.assignmentName}</td>
    <td>{props.assignment.assignmentDescription}</td>
    <td>{props.assignment.courseName}</td>
    <td>
      <Link
        to={`/instructor/${props.username}/exams/update/${props.assignment._id}`}
      >
        {props.convertedDate}
      </Link>
    </td>
  </tr>
);

export default class AllExams extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assignmentName: "",
      assignmentDescription: "",
      courseName: "",
      assignmentDueDate: "",
      allAssignments: []
    };
  }

  convertDateToString(date) {
    let today = new Date(date);

    let datee =
      parseInt(today.getMonth() + 1) +
      "/" +
      today.getDate() +
      "/" +
      today.getFullYear();

    var dateString = datee; // Oct 23
    return dateString;

    // var dateObject = new Date(dateString);
  }

  componentDidMount() {

    //get exams on the table
    axio
      .get("http://localhost:3000/courseweb/exams")
      .then(res => {
        this.setState({
          allAssignments: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getRows() {
    return this.state.allAssignments.map((currentAssignment, id) => {
      return (
        <ShowAssignments
          assignment={currentAssignment}
          key={id}
          convertedDate={this.convertDateToString(
          currentAssignment.assignmentDueDate          
          )}
          username={this.props.username}
        />
      );
    });
  }
  render() {
    return (
      <Router>
        <Switch>

          <Route
            exact
            path={`/instructor/${this.props.username}/exams/update`}
            render={props => (
              <AllExamsSubsidory
                {...props}
                username={this.props.username}
                getRows={this.getRows()}
              />
            )}
          />

          <Route                      
            path={`/instructor/${this.props.username}/exams/update/:examID`}
            render={props => (
              <EditExamDate
                {...props}
                username={this.props.username}               
              />
            )}
          />
        </Switch>
      </Router>
    );
  }
}
