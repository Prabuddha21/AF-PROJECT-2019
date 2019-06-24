import React, {Component} from 'react';
import axios from 'axios';

export default class AdminLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: ""
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

        if(uname !== "" && uname != null){
            axios.post('http://localhost:3000/administrator/reset', {
                email: uname
            }).then(data => {
                alert(data.data);
                this.props.history.push('/admin');
            }).catch((err) => {
                alert(err.response.data);
            })
        } else {
            alert("Please enter a valid email.");
        }
    }

    render() {
        return <div className="container">
            <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
                    <form onSubmit={this.handleSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal">Please Your Email</h1>
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
                        <button type="submit" className="btn btn-lg btn-primary btn-block">
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    }
}