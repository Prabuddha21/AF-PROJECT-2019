import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';

class AdminLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name] : event.target.value})
    }

    handleSubmit(event){
        event.preventDefault();
        const uname = this.state.userName;
        const pass = this.state.password;

        if(uname !== "" && pass !== "" && uname != null && pass != null){
            axios.post('http://localhost:3000/administrator/login', {
                email: uname,
                password: pass
            }).then(data => {
                sessionStorage.setItem('admintoken', data.data);
                this.props.history.push('/admin/dashboard');
            }).catch((err) => {
                alert(err.response.data);
            })
        } else {
            alert("Please enter valid credentials.");
        }
    }

    render() {
        return <div className="container">
            <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
                    <form onSubmit={this.handleSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal">Please Log In</h1>
                        <div>
                            <label htmlFor="userName">User Name</label>
                            <input
                                name="userName"
                                type="text"
                                className="form-control"
                                value={this.state.userName}
                                onChange={this.handleChange}
                                placeholder="User Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="Password">Password</label>
                            <input
                                name="password"
                                type="password"
                                className="form-control"
                                value={this.state.password}
                                onChange={this.handleChange}
                                placeholder="Password"
                            />
                        </div>
                        <br/>
                        <Link to="/admin/reset">
                            Forgot password? Click here to reset
                        </Link>
                        <br/>
                        <button type="submit" className="btn btn-lg btn-primary btn-block">
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    }
}

export default withRouter(AdminLogin);