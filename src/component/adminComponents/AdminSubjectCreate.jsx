import React, {Component} from 'react';
import axios from 'axios';

export default class AdminSubjectCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            code: "",
            name: "",
            description: "",
            selectedCourses: [{code: ""}],
            selectedInstructors: [{_id:""}],
            instructors: [],
            courses: []
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleRemoveInstructor = this.handleRemoveInstructor.bind(this);
        this.handleAddInstructor = this.handleAddInstructor.bind(this);
        this.handleInstructorChange = this.handleInstructorChange.bind(this);
        this.handleRemoveCourse = this.handleRemoveCourse.bind(this);
        this.handleAddCourse = this.handleAddCourse.bind(this);
        this.handleCourseChange = this.handleCourseChange.bind(this);
    }

    componentWillMount() {
        axios.get('http://localhost:3000/administrator/courses').then(data => {
            this.setState({
                courses: data.data
            })
        });
        axios.get('http://localhost:3000/administrator/instructors').then(data => {
            this.setState({
                instructors: data.data
            })
        });
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    onSubmit(event) {
        event.preventDefault();
        const code = this.state.code.trim();
        const name = this.state.name.trim();
        const description = this.state.description.trim();
        const courses = this.state.selectedCourses;
        const instructors = this.state.selectedInstructors;

        if (code == '' || name == '' || description == '') {
            alert('One or more fields are empty!');
        } else {
            const subject = {
                code: code,
                name: name,
                description: description,
                courses: courses,
                instructors: instructors
            };

            axios.post('http://localhost:3000/administrator/subject/register', subject).then(data => {
                alert(data.data);
            }).catch(err => {
                alert(err.response.data);
            });
        }
    }

    handleInstructorChange(event, index){
        const newInstructor = this.state.selectedInstructors.map((instructor, selectedIndex) => {
            if (index !== selectedIndex) {
                return instructor;
            } else {
                return { ...instructor, _id : event.target.value };
            }
        });

        this.setState({ selectedInstructors: newInstructor });
    };

    handleAddInstructor(){
        this.setState({
            selectedInstructors: this.state.selectedInstructors.concat([{ _id: "" }])
        });
        console.log(this.state.selectedInstructors);
    };

    handleRemoveInstructor(selectedIndex) {
        this.setState({
            selectedInstructors: this.state.selectedInstructors.filter((instructor, index) => selectedIndex !== index)
        });
    };

    handleCourseChange(event, index){
        const newCourse = this.state.selectedCourses.map((course, selectedIndex) => {
            if (index !== selectedIndex) {
                return course;
            } else {
                return { ...course, code : event.target.value };
            }
        });

        this.setState({ selectedCourses: newCourse });
    };

    handleAddCourse(){
        this.setState({
            selectedCourses: this.state.selectedCourses.concat([{ code: "" }])
        });
    };

    handleRemoveCourse(selectedIndex) {
        this.setState({
            selectedCourses: this.state.selectedCourses.filter((course, index) => selectedIndex !== index)
        });
    };

    render() {

        const options = this.state.courses.map(item => {
            return <option key={item._id} value={item.code}>{item.name}</option>
        });

        const courseAdd = this.state.selectedCourses.map((course, index) => {
            return <div key={index} className="form-group form-inline">
                <select
                    className="form-control mr-sm-2"
                    name="courses"
                    value={course.code}
                    onChange={(e) => this.handleCourseChange(e, index)}
                >
                    <option value="">Select Course</option>
                    {this.state.courses.map(item => {
                        return <option key={item.code} value={item.code}>{item.name}</option>
                    })}
                </select>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => this.handleRemoveCourse(index)}
                >
                    Remove
                </button>
                <br/>
            </div>
        });


        const instructorAdd = this.state.selectedInstructors.map((instructor, index) => {
            return <div key={index} className="form-group form-inline">
                <select
                    className="form-control mr-sm-2"
                    name="instructors"
                    value={instructor._id}
                    onChange={(e) => this.handleInstructorChange(e, index)}
                >
                    <option value="">Select Instructor</option>
                    {this.state.instructors.map(item => {
                        return <option key={item._id} value={item._id}>{item.firstName + " " + item.lastName}</option>
                    })}
                </select>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => this.handleRemoveInstructor(index)}
                >
                    Remove
                </button>
                <br/>
            </div>
        });

        return <div className="container">
            <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
                    <form onSubmit={this.onSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal">Enter Details of The New Subject</h1>
                        <div className="form-group">
                            <label htmlFor="code">Subject Code</label>
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
                            <label htmlFor="name">Subject Name</label>
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
                        <h4>Instructor</h4>
                        {this.state.instructors ? instructorAdd : <p></p>}
                        <button
                            type="button"
                            onClick={this.handleAddInstructor}
                            className="btn form-control btn-secondary"
                        >
                            Add Instructor
                        </button>
                        <br/>
                        <br/>
                        <h4>Courses</h4>
                        {this.state.courses ? courseAdd : <p></p>}
                        <button
                            type="button"
                            onClick={this.handleAddCourse}
                            className="btn form-control btn-secondary"
                        >
                            Add Course
                        </button>
                        <br/>
                        <br/>
                        <button type="submit" className="btn btn-lg btn-primary btn-block">
                            Add Subject
                        </button>
                        <br/>
                    </form>
                </div>
            </div>
        </div>
    }
}