import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import InstructorProfile from "./instructor-profile";
import InstructorLoginFormComponent from "./instructor-login-form-component";
import axio from "axios";
import '../../css/index-footer.css'
import '../../css/instructor-profile.css'
import '../../css/instructor-login.css'

export default class InstructorLoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleOnClick(e) {
    e.preventDefault();
    this.props.history.push(`/instructor/${this.state.username}`);
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.username == "" || this.state.username.length == 0) {
      alert("Enter username/email");
    } else if (this.state.password == "" || this.state.password.length == 0) {
      alert("Enter password");
    } else {
      this.props.history.push(`/instructor/${this.state.username}`);
      // let usernamePassword = this.state.username + "-" + this.state.password;
      // const validateObj = {
      //   username: this.state.username,
      //   password: this.state.password
      // };
      // axio
      //   .post(
      //     "http://localhost:3000/courseweb/instructor/validate/" +
      //       usernamePassword
      //   )
      //   .then(res => {
      //     console.log(res.data);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/login"
            render={props => (
              <InstructorLoginFormComponent
                {...props}
                username={this.state.username}
                onChangeUsername={this.onChangeUsername}
                password={this.state.password}
                onChangePassword={this.onChangePassword}
                handleOnClick={this.handleOnClick}
                onSubmit={this.onSubmit}
              />
            )}
          />

          <Route
            path={"/instructor/:username"}
            render={props => (
              <InstructorProfile
                {...props}
                username={props.match.params.username}
              />
            )}
          />
        </Switch>
      </Router>
    );
  }
}
