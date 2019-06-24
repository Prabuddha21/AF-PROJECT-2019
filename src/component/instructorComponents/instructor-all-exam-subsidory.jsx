import React, { Component } from "react";
import '../../css/index-footer.css'
import '../../css/instructor-profile.css'
import '../../css/instructor-login.css'

export default class AllExamsSubsidory extends Component {
  constructor(props) {
    super(props);    
  }

  render() {
    return (
        
      <div id="content-wrapper">
        <div className="container-fluid">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href={`/instructor/${this.props.username}`}>Home</a>
            </li>
            <li className="breadcrumb-item active">Update Exam</li>
          </ol>

          <h1>Update Exams</h1>
          <hr />
          <p>Update due dates of Exams</p>
          <br />
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Exam Name</th>
                <th>Exam Description</th>
                <th>Course Name</th>
                <th>
                  <small className="form-text text-muted">
                    Click on a date to extend the due date
                  </small>
                  Due Date
                </th>
              </tr>
            </thead>
            <tbody>{this.props.getRows}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
