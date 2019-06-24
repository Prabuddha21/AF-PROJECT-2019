import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../../css/index-footer.css'
import '../../css/instructor-profile.css'
import '../../css/instructor-login.css'

export default class Navbar extends Component {
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
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item" style={{ marginLeft: 10 }}>
                <Link to="/about" className="nav-link">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">
                  {" "}
                  Contact Us
                </Link>
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
          <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/login" className="btn btn-info btn-sm">
                  {" "}
                  Login <i className="fa fa-sign-in" />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
