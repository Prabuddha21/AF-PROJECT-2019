import React, { Component } from "react";
import axio from "axios";
import '../../css/index-footer.css'
import '../../css/instructor-profile.css'
import '../../css/instructor-login.css'

const ShowCourses = props => (
  <tr>
    <td>{props.course.code}</td>
    <td>{props.course.name}</td>
    <td>{props.course.subject}</td>
    <td>
      <button
        value={props.course._id}
        onClick={() => props.click(props.course._id)}
        className="btn btn-info btn-sm"
      >
        <i className="fa fa-check" /> Accept
      </button>
    </td>
  </tr>
);
export default class AcceptCourses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coursesArray: [],
      code: "",
      name: "",
      subject: "",
      isNewCourse: false
    };
    this.acceptCourse = this.acceptCourse.bind(this);
  }

  acceptCourse(id) {
    //first get the course by ID and update state:
    axio
      .get("http://localhost:3000/courseweb/courses/update/" + id)
      .then(res => {
        // console.log(res.data);
        this.setState({
          code: res.data.code,
          name: res.data.name,
          subject: res.data.subject,
          isNewCourse: res.data.isNewCourse
        });

        const obj = {
          code: this.state.code,
          name: this.state.name,
          subject: this.state.subject,
          isNewCourse: false
        };

        //now updte the particular course to make isNewCourse=false
        axio
          .post("http://localhost:3000/courseweb/courses/accept/" + id, obj)
          .then(res => {
            console.log(res.data);
            alert("Course Updated");
            setTimeout("location.reload(true);", 1000);
          });

        
      })
      .catch(err => {
        console.log(err);
      });
  }

  getCourses() {
    return this.state.coursesArray.map((currentCourse, id) => {
      return (
        <ShowCourses
          course={currentCourse}
          key={id}
          click={this.acceptCourse}
        />
      );
    });
  }

  componentDidMount() {
    //get all courses where isNewCourse: true
    axio
      .get("http://localhost:3000/courseweb/courses/all/accepted")
      .then(res => {
        this.setState({
          coursesArray: res.data
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
            <li className="breadcrumb-item active">Accept Courses</li>
          </ol>

          <h1>Accept Courses</h1>
          <hr />
          <p>Accept the courses so students can enroll</p>
          <div className="container">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th onClick={this.onClickCode}>Code</th>
                  <th>Course Name</th>
                  <th>Subject</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{this.getCourses()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
