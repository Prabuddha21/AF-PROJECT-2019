import React, { Component } from "react";
import axio from "axios";
import '../../css/index-footer.css'
import '../../css/instructor-profile.css'
import '../../css/instructor-login.css'

const ShowAssignments = props => (
  <tr>
    <td>{props.assignment.assignmentName}</td>
    <td>
      <input id={props.assignment._id} type="number" className="form-control" />
    </td>
    <td>
      <button
        value={props.assignment._id}
        onClick={() =>
          props.click(
            props.assignment._id + "/" + props.assignment.assignmentName
          )
        }
        className="form-control btn btn-info"
      >
        <i className="fa fa-check" />
      </button>
    </td>
  </tr>
);

const ShowExams = props => (
  <tr>
    <td>{props.exam.assignmentName}</td>
    <td>
      <input id={props.exam._id} type="number" className="form-control" />
    </td>
    <td>
      <button
        id={props.exam._id}
        onClick={() =>
          props.clickk(props.exam._id + "/" + props.exam.assignmentName)
        }
        className="form-control btn btn-info"
      >
        <i className="fa fa-check" />
      </button>
    </td>
  </tr>
);

export default class ProvideMarks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allAssignments: [],
      allExams: [],
      message: "",
      red: "red",
      green: "green",
      color: ""
    };
    this.giveAssignmentMark = this.giveAssignmentMark.bind(this);
    this.giveExamMark = this.giveExamMark.bind(this);
  }

  componentDidMount() {
    //get assignments
    axio
      .get("http://localhost:3000/courseweb/assignments")
      .then(res => {
        this.setState({
          allAssignments: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });

    //get exams
    axio
      .get("http://localhost:3000/courseweb/exams")
      .then(res => {
        this.setState({
          allExams: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getAssignments() {
    return this.state.allAssignments.map((currentAssignment, id) => {
      return (
        <ShowAssignments
          assignment={currentAssignment}
          key={id}
          click={this.giveAssignmentMark}
        />
      );
    });
  }

  giveAssignmentMark(id) {
    let idd = id;
    let assignmentIDD = id.split("/", 1).toString();
    let assignmentNamee = idd.split("/")[1].toString();
    let valueAssignmentMarks = document.getElementById(assignmentIDD).value;

    const assignmentObj = {
      assignmentName: assignmentNamee,
      marks: valueAssignmentMarks,
      assignmentID: assignmentIDD
    };

    
    if (valueAssignmentMarks == "" || valueAssignmentMarks.length == 0) {
      // alert("Assignment marks should be entered");
      this.setState({
        color: this.state.red,
        message: 'Assignment marks should be entered'
      });
    } else {
      axio
        .post(
          "http://localhost:3000/courseweb/marks/assignments",
          assignmentObj
        )
        .then(res => {
          console.log(res.data);
          this.setState({
            color: this.state.green,
            message: 'Assignment marks Added!'
          });
        })
        .catch(err => {
          console.log(err);
        });

      setTimeout("location.reload(true);", 2000);
    }
  }

  getExams() {
    return this.state.allExams.map((currentExam, id) => {
      return (
        <ShowExams exam={currentExam} key={id} clickk={this.giveExamMark} />
      );
    });
  }

  giveExamMark(id) {
    let idd = id;
    let examIDD = id.split("/", 1).toString();
    let examNamee = idd.split("/")[1].toString();
    let valueExamMarks = document.getElementById(examIDD).value;

    const examObj = {
      examName: examNamee,
      marks: valueExamMarks,
      examID: examIDD
    };

    if (valueExamMarks == "" || valueExamMarks.length == 0) {
      // alert("Exam marks should be entered");
      this.setState({
         color: this.state.red,
         message: 'Exam marks should be entered'
      });
    } else {
      axio
        .post("http://localhost:3000/courseweb/marks/exams", examObj)
        .then(res => {
          console.log(res.data);
          this.setState({
            color: this.state.green,
            message: 'Exam marks Added!'
          });
        })
        .catch(err => {
          console.log(err);
        });
      setTimeout("location.reload(true);", 2000);
    }
  }

  render() {
    return (
      <div id="content-wrapper">
        <div className="container-fluid">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href={`/instructor/${this.props.username}`}>Home</a>
            </li>
            <li className="breadcrumb-item active"> Provide Marks</li>
          </ol>

          <h1>Provide Marks</h1>
          <hr />
          <p>Provide marks for a given assignment/exam</p>
          <p
            style={{
              color: `${this.state.color}`,
              marginTop: 10,
              fontSize: 25
            }}
          >
            {this.state.message}
          </p>
          <div className="container">
            <div className="row">
              <div className="col-6">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Assignment</th>
                      <th>Marks</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>{this.getAssignments()}</tbody>
                </table>
              </div>
              <div className="col-6">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Exam</th>
                      <th>Marks</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>{this.getExams()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
