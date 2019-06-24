import React, {Component} from 'react';
import axios from 'axios';

export default class AdminRegister extends Component {

    constructor(props) {
        super(props);
        this.state = {
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

    onChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    onSubmit(event) {
        event.preventDefault();
        const firstName = this.state.firstName.trim();
        const lastName = this.state.lastName.trim();
        const NIC = this.state.NIC.trim();
        const email = this.state.email;
        const contactNumber = this.state.contactNumber.trim();
        const password = this.state.password;
        const cPass = this.state.cPassword;

        if (firstName == '' || lastName == '' || NIC == '' || contactNumber == '' || password == '' || cPass == '') {
            alert('One or more fields are empty!');
        } else {
            if (/^[0-9]{9}[v|V]+$/.test(NIC)) {
                if(contactNumber.length === 10 && /^[0-9]{10}$/.test(contactNumber)) {
                    if (password !== cPass) {
                        alert('Entered password does not match confirmed password!');
                    } else {
                        const admin = {
                            firstName: firstName,
                            lastName: lastName,
                            NIC: NIC,
                            password: password,
                            email: email,
                            contactNumber: contactNumber
                        };

                        axios.post('http://localhost:3000/administrator/register', admin).then(data => {
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
                        <h1 className="h3 mb-3 font-weight-normal">Enter Details of the New Admin</h1>
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
                                   required
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
                                   required
                            />
                        </div>
                        <button type="submit" className="btn btn-lg btn-primary btn-block">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    }
}