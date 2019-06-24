import React, {Component} from 'react';
import axios from 'axios';

export default class AdminInstructorUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            _id: "",
            firstName: "",
            lastName: "",
            designation: "",
            faculty: "",
            email: "",
            contactNumber: "",
            password: "",
            cPassword: "",
            searchMail: "",
            isFound: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onClick(event){
        event.preventDefault();
        if (confirm("Are you sure you want to delete this Instructor?")) {
            axios.delete('http://localhost:3000/administrator/instructor/delete/' + this.state._id).then(data => {
                alert(data.data);
                window.location.reload();
            }).catch(err => {
                console.log(err.response.data);
            })
        }
    }

    onSearch(event){
        event.preventDefault();
        const searchMail = this.state.searchMail;
        axios.post('http://localhost:3000/administrator/instructor/profile', {email: searchMail})
            .then(res => {
                this.setState({
                    _id: res.data._id,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    designation: res.data.designation,
                    faculty: res.data.faculty,
                    email: res.data.email,
                    contactNumber: res.data.contactNumber,
                    isFound: true
                });
            }).catch(err => {
            alert(err.response.data);
        })
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    onSubmit(event) {
        event.preventDefault();
        const _id = this.state._id;
        const firstName = this.state.firstName.trim();
        const lastName = this.state.lastName.trim();
        const designation = this.state.designation.trim();
        const faculty = this.state.faculty.trim();
        const email = this.state.email;
        const contactNumber = this.state.contactNumber.trim();
        const password = this.state.password;
        const cPass = this.state.cPassword;

        if (firstName == '' || lastName == '' || designation == '' || faculty == '' || contactNumber == '') {
            alert('One or more fields are empty!');
        } else {
            //if (/^[0-9]{9}[v|V]+$/.test(NIC)) {
                if(contactNumber.length === 10 && /^[0-9]{10}$/.test(contactNumber)) {
                    if (password !== cPass) {
                        alert('Entered password does not match confirmed password!');
                    } else {
                        const instructor = {
                            _id: _id,
                            firstName: firstName,
                            lastName: lastName,
                            designation: designation,
                            faculty: faculty,
                            password: password,
                            email: email,
                            contactNumber: contactNumber
                        };

                        axios.put('http://localhost:3000/administrator/instructor/update', instructor).then(data => {
                            alert(data.data);
                        }).catch(err => {
                            alert(err.response.data);
                        })
                    }
                } else {
                    alert('Invalid Contact Number');
                }
            // } else {
            //     alert('Invalid NIC!');
            // }
        }
    }

    render() {

        const updateForm = <form onSubmit={this.onSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Update Form</h1>
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
                <label htmlFor="designation">Designation</label>
                <input type="text"
                       name="designation"
                       placeholder="Enter Designation"
                       className="form-control"
                       value={this.state.designation}
                       onChange={this.onChange}
                       required
                />
            </div>
            <div className="form-group">
                <label htmlFor="faculty">Faculty</label>
                <input type="text"
                       name="faculty"
                       placeholder="Enter Faculty"
                       className="form-control"
                       value={this.state.faculty}
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
            <br/>
            <button onClick={this.onClick} className="btn btn-lg btn-danger btn-block">
                Delete Subject
            </button>
            <br/>
        </form>;

        return <div className="container mt-2">
            <div className="container mt-3">
                <h1 className="h3 mb-3 font-weight-normal">Enter Email to Search Instructor</h1>
                <br/>
                <form className="form-inline">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Email: </span>
                        </div>
                        <input
                            className="form-control mr-sm-2"
                            type="email"
                            name="searchMail"
                            value={this.state.searchMail}
                            onChange={this.onChange}
                        />
                        <button onClick={this.onSearch} className="btn btn-primary mx-auto">Search</button>
                    </div>
                </form>
            </div>
            <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
                    {this.state.isFound ? updateForm : <p></p>}
                </div>
            </div>
        </div>
    }
}