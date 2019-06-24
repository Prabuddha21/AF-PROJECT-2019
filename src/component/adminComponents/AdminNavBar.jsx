import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

class AdminNavBar extends Component{

    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    }

    logOut(event){
        event.preventDefault();
        sessionStorage.removeItem('admintoken');
        sessionStorage.clear();
        this.props.history.push("/admin");
        window.location.reload();
    }

    render() {
        return <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Administrators Dashboard</a>
            <button className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbar1"
                    aria-controls="navbar1"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"> </span>
            </button>
            <div className="collapse navbar-collapse justify-content-md" id="navbar1">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/admin/dashboard" className="nav-link">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                            Manage Administrators
                        </a>
                        <div className="dropdown-menu">
                            <Link to="/admin/dashboard/admin/add" className="dropdown-item">
                                Add Administrators
                            </Link>
                            <Link to="/admin/dashboard/admin/update" className="dropdown-item">
                                Administrators Profile
                            </Link>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                            Manage Instructors
                        </a>
                        <div className="dropdown-menu">
                            <Link to="/admin/dashboard/instructor/add" className="dropdown-item">
                                Add Instructors
                            </Link>
                            <Link to="/admin/dashboard/instructor/update" className="dropdown-item">
                                Update Instructors
                            </Link>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                            Manage Courses
                        </a>
                        <div className="dropdown-menu">
                            <Link to="/admin/dashboard/course/add" className="dropdown-item">
                                Add Course
                            </Link>
                            <Link to="/admin/dashboard/course/update" className="dropdown-item">
                                Update Course
                            </Link>
                            <Link to="/admin/dashboard/subject/add" className="dropdown-item">
                                Add Subject
                            </Link>
                            <Link to="/admin/dashboard/subject/update" className="dropdown-item">
                                Update Subject
                            </Link>
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link onClick={this.logOut} to="/admin/dashboard" className="nav-link">
                            LogOut
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    }
}

export default withRouter(AdminNavBar);