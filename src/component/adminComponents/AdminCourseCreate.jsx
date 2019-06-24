import React, {Component} from 'react';
import axios from 'axios';

export default class AdminCourseCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            code: "",
            name: "",
            years: "",
            description: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    onSubmit(event) {
        event.preventDefault();
        const code = this.state.code.trim();
        const name = this.state.name.trim();
        const years = this.state.years.trim();
        const description = this.state.description.trim();

        if (code == '' || name == '' || years == '' || description == '') {
            alert('One or more fields are empty!');
        } else {
            const course = {
                code: code,
                name: name,
                years: years,
                description: description
            };

            axios.post('http://localhost:3000/administrator/course/register', course).then(data => {
                alert(data.data);
            }).catch(err => {
                alert(err.response.data);
            });
        }
    }

    render() {
        return <div className="container">
            <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
                    <form onSubmit={this.onSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal">Enter Details of The New Course</h1>
                        <div className="form-group">
                            <label htmlFor="code">Course Code</label>
                            <input type="text"
                                   name="code"
                                   placeholder="Enter Course Code"
                                   className="form-control"
                                   value={this.state.code}
                                   onChange={this.onChange}
                                   required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Course Name</label>
                            <input type="text"
                                   name="name"
                                   placeholder="Enter Course Name"
                                   className="form-control"
                                   value={this.state.name}
                                   onChange={this.onChange}
                                   required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="years">Years</label>
                            <input type="number"
                                   name="years"
                                   placeholder="Enter Number of Years"
                                   className="form-control"
                                   value={this.state.years}
                                   onChange={this.onChange}
                                   required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea rows="5"
                                   name="description"
                                   placeholder="Enter Course Description"
                                   className="form-control"
                                   value={this.state.description}
                                   onChange={this.onChange}
                                   required
                            />
                        </div>
                        <button type="submit" className="btn btn-lg btn-primary btn-block">
                            Add Course
                        </button>
                        <br/>
                    </form>
                </div>
            </div>
        </div>
    }
}