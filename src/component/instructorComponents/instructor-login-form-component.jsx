import React, { Component } from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import '../../css/index-footer.css'
import '../../css/instructor-profile.css'
import '../../css/instructor-login.css'

export default class InstructorLoginComponent extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a href="/">
                  <img src="http://placehold.it/50x40?" alt="" />
                </a>
              </li>
              <li className="nav-item active" style={{ marginLeft: 10 }}>
                <a href="/" className="nav-link">
                  Home
                </a>
              </li>
            </ul>
          </div>
          <div className="mx-auto order-0">
            {/* <a className="navbar-brand mx-auto" href="#">
            Navbar 2
          </a> */}
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target=".dual-collapse2"
            >
              <span className="navbar-toggler-icon" />
            </button>
          </div>
        </nav>

        <div className="container h-100" style={{ marginTop: 100 }}>
          <div className="d-flex justify-content-center h-100">
            <div className="user_card bg-dark">
              <div
                className="d-flex justify-content-center form_container"
                style={{ marginTop: 0 }}
              >
                <form onSubmit={this.props.onSubmit}>
                  <div className="input-group mb-3">
                    <div className="input-group-append">
                      <span className="input-group-text bg-info">
                        <i className="fa fa-user" />
                      </span>
                    </div>
                    <input
                      value={this.props.username}
                      onChange={this.props.onChangeUsername}
                      type="text"
                      name="username"
                      className="form-control input_user"
                      placeholder="username"
                    />
                  </div>
                  <div className="input-group mb-2">
                    <div className="input-group-append">
                      <span className="input-group-text bg-info">
                        <i className="fa fa-lock" />
                      </span>
                    </div>
                    <input
                      value={this.props.password}
                      onChange={this.props.onChangePassword}
                      type="password"
                      name="passwordbutton"
                      className="form-control input_user"
                      placeholder="password"
                    />
                  </div>
                  <div className="form-group">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customControlInline"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customControlInline"
                        style={{ color: "#ffffff" }}
                      >
                        Remember me
                      </label>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center mt-3 login_container">
                    {/* <Link
                      to={`/instructor/${this.props.username}`}
                      type="button"
                      className="btn login_btn bg-info"
                    >
                      Login
                    </Link> */}
                    <button
                      // to={`/instructor/${this.props.username}`}
                      type="submit"
                      className="btn login_btn bg-info"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
