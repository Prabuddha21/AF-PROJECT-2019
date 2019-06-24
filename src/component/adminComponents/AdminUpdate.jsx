import React, {Component} from 'react';
import axios from 'axios';
import jwt from "jsonwebtoken";

export default class AdminRegister extends Component {

    constructor(props) {
        super(props);
        this.state = {
            _id: "",
            firstName: "",
            lastName: "",
            NIC: "",
            email: "",
            contactNumber: "",
            password: "",
            cPassword: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    componentWillMount() {
        jwt.verify(sessionStorage.getItem('admintoken'), 'secret', (err, decoded) => {
            if(err) {
                console.log(err);
            } else {
                const token = sessionStorage.getItem('admintoken');
                axios.post('http://localhost:3000/administrator/profile', {token: token})
                    .then(res => {
                        this.setState({
                            _id: res.data._id,
                            firstName: res.data.firstName,
                            lastName: res.data.lastName,
                            NIC: res.data.NIC,
                            email: res.data.email,
                            contactNumber: res.data.contactNumber
                        });
                    }).catch(err => {
                        alert(err.response.data);
                })
            }
        });
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    onSubmit(event) {
        event.preventDefault();
        const _id = this.state._id;
        const firstName = this.state.firstName.trim();
        const lastName = this.state.lastName.trim();
        const NIC = this.state.NIC.trim();
        const email = this.state.email;
        const contactNumber = this.state.contactNumber.trim();
        const password = this.state.password;
        const cPass = this.state.cPassword;

        if (firstName == '' || lastName == '' || NIC == '' || contactNumber == '') {
            alert('One or more fields are empty!');
        } else {
            if (/^[0-9]{9}[v|V]+$/.test(NIC)) {
                if(contactNumber.length === 10 && /^[0-9]{10}$/.test(contactNumber)) {
                    if (password !== cPass) {
                        alert('Entered password does not match confirmed password!');
                    } else {
                        const admin = {
                            _id: _id,
                            firstName: firstName,
                            lastName: lastName,
                            NIC: NIC,
                            password: password,
                            email: email,
                            contactNumber: contactNumber
                        };

                        axios.put('http://localhost:3000/administrator/update', admin).then(data => {
                            alert(data.data);
                        }).catch(err => {
                            alert(err.response.data);
                        })
                    }
                } else {
                    alert('Invalid Contact Number');
                }
            } else {
                alert('Invalid NIC!');
            }
        }
    }

    render() {
        return <div className="container">
            <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
                    <form onSubmit={this.onSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal">Admin Profile</h1>
                        <p>Edit and submit to update</p>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text"
                                   name="firstName"
                                   placeholder="Enter First Name"
                                   className="form-control"
                                   value={this.state.firstName}
                                   onChange={this.onChange}
                                   required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text"
                                   name="lastName"
                                   placeholder="Enter Last Name"
                                   className="form-control"
                                   value={this.state.lastName}
                                   onChange={this.onChange}
                                   required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="NIC">NIC</label>
                            <input type="text"
                                   name="NIC"
                                   placeholder="Enter NIC"
                                   className="form-control"
                                   value={this.state.NIC}
                                   onChange={this.onChange}
                                   required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email"
                                   name="email"
                                   placeholder="Enter Email"
                                   className="form-control"
                                   value={this.state.email}
                                   onChange={this.onChange}
                                   required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="ContactNumber">Contact Number</label>
                            <input type="text"
                                   name="contactNumber"
                                   placeholder="Enter Contact Number"
                                   className="form-control"
                                   value={this.state.contactNumber}
                                   onChange={this.onChange}
                                   required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password"
                                   name="password"
                                   placeholder="Enter Password"
                                   className="form-control"
                                   value={this.state.password}
                                   onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Confirm Password</label>
                            <input type="password"
                                   name="cPassword"
                                   placeholder="Re-Enter Password"
                                   className="form-control"
                                   value={this.state.cPassword}
                                   onChange={this.onChange}

                            />
                        </div>
                        <button type="submit" className="btn btn-lg btn-primary btn-block">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    }
}