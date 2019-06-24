import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axio from "axios";
import '../../css/index-footer.css'
import '../../css/instructor-profile.css'
import '../../css/instructor-login.css'

const ShowCourseName = props => (
  <option value={`${props.course.name}/${props.course._id}`}>
    {props.course.name}
  </option>
);

export default class AddExam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assignmentName: "",
      assignmentDescription: "",
      courseName: "",
      courseNameTwo: "",
      assignmentDueDate: new Date(),
      isNewAssignment: false,
      examsArray: [],
      red: "red",
      green: "green",
      color: "",
      message: "",
      todayDate: new Date()
    };

    this.handleChange = this.handleChange.bind(this);
    this.assignmentNameOnChange = this.assignmentNameOnChange.bind(this);
    this.assignmentDescriptionOnChange = this.assignmentDescriptionOnChange.bind(
      this
    );
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeCourseName = this.onChangeCourseName.bind(this);
  }

  handleChange(date) {
    this.setState({
      assignmentDueDate: date
    });
  }

  assignmentNameOnChange(e) {
    this.setState({
      assignmentName: e.target.value
    });
  }
  assignmentDescriptionOnChange(e) {
    this.setState({
      assignmentDescription: e.target.value
    });
  }

  onChangeCourseName(e) {
    console.log(e.target.value);
    this.setState({
      courseName: e.target.value,
      courseNameTwo: e.target.value
    });
  }

  getCourses() {
    return this.state.examsArray.map((currentCourse, id) => {
      return <ShowCourseName course={currentCourse} key={id} />;
    });
  }

  onSubmit(e) {
    e.preventDefault();

    let splitCourseName = this.state.courseName.split("/", 1);
    let splitCourseNameString = splitCourseName.toString();

    const self = this;

    const newExam = {
      assignmentName: this.state.assignmentName,
      assignmentDescription: this.state.assignmentDescription,
      courseName: splitCourseNameString,
      assignmentDueDate: this.state.assignmentDueDate,
      isNewAssignment: !this.state.isNewAssignment,
      assignmentID: ""
    };

    if (this.state.assignmentName.length == 0) {
      this.setState({
        message: "Exam name cannot be empty",
        color: this.state.red
      });
    } else if (this.state.assignmentDescription.length == 0) {
      this.setState({
        message: "Exam description cannot be empty",
        color: this.state.red
      });
    } else if (
      this.state.courseName == "" ||
      this.state.courseName == "-Select Course-"
    ) {
      this.setState({
        message: "Select a course from the dropdown",
        color: this.state.red
      });
    } else {
      axio
        .post("http://localhost:4000/courseweb/exam/add", newExam)
        .then(res => {
          let insertedAssignmentID = res.data; //id of the inserted exam

          this.setState({
            message: "Exam Added",
            color: this.state.green
          });

          let courseID = this.state.courseNameTwo.split("/")[1].toString();
          let newID = insertedAssignmentID + "-" + courseID;
          console.log(newID);

          axio
            .post(
              "http://localhost:4000/courseweb/last/inserted/exam/" +
                newID
            )
            .then(res => {
              console.log(res.data);
            })
            .catch(err => {
              console.log(err);
            });


        })
        .catch(err => {
          console.log(err);
        });

      this.setState({
        assignmentName: "",
        assignmentDescription: "",
        courseName: "",
        assignmentDueDate: new Date(),
        isNewAssignment: false
      });

      // setTimeout("location.reload(true);", 2000);
    }
  }

  componentDidMount() {
      //to get courses on the dropdown list
    axio
      .get("http://localhost:4000/courseweb/courses/all")
      .then(courses => {
        this.setState({
          examsArray: courses.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div id="content-wrapper">
        <div className="container-fluid">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href={`/instructor/${this.props.username}`}>Home</a>
            </li>
            <li className="breadcrumb-item active">Add Exam</li>
          </ol>

          <h1>Add Exam</h1>
          <hr />
          <p>Add new Exam to a course</p>
          <br />

          <div className="container">
            <div className="row">
              <div className="col-2" />
              <div className="col-8">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label>Select Course:</label>
                    <select
                      value={this.state.courseName}
                      onChange={this.onChangeCourseName}
                      className="form-control"
                    >
                      <option>-Select Course-</option>
                      {this.getCourses()}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Exam Name:</label>
                    <input
                      value={this.state.assignmentName}
                      onChange={this.assignmentNameOnChange}
                      type="text"
                      className="form-control"
                      placeholder="Final SE exam - 2019"
                    />
                  </div>

                  <div className="form-group">
                    <label>Exam Description:</label>
                    <textarea
                      value={this.state.assignmentDescription}
                      onChange={this.assignmentDescriptionOnChange}
                      type="text"
                      className="form-control"
                      placeholder="Enter description"
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      Explain the duration/structure of the exam
                    </small>
                  </div>

                  <div className="form-group">
                    <label>Due Date:</label>{" "}
                    <DatePicker
                      className="form-control"
                      selected={this.state.assignmentDueDate}
                      onChange={this.handleChange}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>

                  <p
                    style={{
                      color: `${this.state.color}`,
                      marginTop: 10,
                      fontSize: 25
                    }}
                  >
                    {this.state.message}
                  </p>
                </form>
              </div>
              <div className="col-2" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
