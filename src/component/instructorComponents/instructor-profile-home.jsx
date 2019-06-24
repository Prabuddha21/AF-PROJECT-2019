import React, { Component } from "react";
import '../../css/index-footer.css'
import '../../css/instructor-profile.css'
import '../../css/instructor-login.css'

export default class InstructorProfileHome extends Component {
  render() {
    return (
      <div id="content-wrapper">
        <div className="container-fluid">
          <ol className="breadcrumb">            
            <li className="breadcrumb-item active">Home</li>
          </ol>

          <h1>Welcome Back!</h1>
          <hr />
          {/* <p>This is a great starting point for new custom pages.</p> */}
        </div>
      </div>
    );
  }
}
