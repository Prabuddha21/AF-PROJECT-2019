import React, {Component} from 'react';
import axios from 'axios';

export default class AdminCourseUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            _id: "",
            code: "",
            name: "",
            years: "",
            description: "",
            selectedSubjects: [{_id: ""}],
            searchCode: "",
            isFound: false,
            subjects: []
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleRemoveSubject = this.handleRemoveSubject.bind(this);
        this.handleAddSubject = this.handleAddSubject.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
    }

    componentWillMount() {
        axios.get('http://localhost:3000/administrator/subjects').then(data => {
            this.setState({
                subjects: data.data
            })
        });
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    onClick(event){
        event.preventDefault();
        if (confirm("Are you sure you want to delete this course?")) {
            axios.delete('http://localhost:3000/administrator/course/delete/' + this.state._id).then(data => {
                alert(data.data);
                window.location.reload();
            }).catch(err => {
                console.log(err.response.data);
            })
        }
    }

    onSubmit(event) {
        event.preventDefault();
        const _id = this.state._id;
        const code = this.state.code.trim();
        const name = this.state.name.trim();
        const years = this.state.years;
        const description = this.state.description.trim();
        const subjects = this.state.selectedSubjects;

        if (code == '' || name == '' || years == '' || description == '') {
            alert('One or more fields are empty!');
        } else {
            const course = {
                _id: _id,
                code: code,
                name: name,
                years: years,
                description: description,
                subjects: subjects
            };

            axios.put('http://localhost:3000/administrator/course/update', course).then(data => {
                alert(data.data);
            }).catch(err => {
                alert(err.response.data);
            });
        }
    }

    onSearch(event){
        event.preventDefault();
        const searchCode = this.state.searchCode;
        axios.post('http://localhost:3000/administrator/course/search', {code: searchCode})
            .then(res => {
                const subjects = res.data.subjects.map(item => {
                    return {_id: item};
                });

                this.setState({
                    _id: res.data._id,
                    code: res.data.code,
                    name: res.data.name,
                    description: res.data.description,
                    years: res.data.years,
                    selectedSubjects: subjects,
                    isFound: true
                });
            }).catch(err => {
            alert(err.response.data);
        })
    }

    handleSubjectChange(event, index){
        const newSubject = this.state.selectedSubjects.map((subject, selectedIndex) => {
            if (index !== selectedIndex) {
                return subject;
            } else {
                return { ...subject, _id : event.target.value };
            }
        });

        this.setState({ selectedSubjects: newSubject });
    };

    handleAddSubject(){
        this.setState({
            selectedSubjects: this.state.selectedSubjects.concat([{ _id: "" }])
        });
    };

    handleRemoveSubject(selectedIndex) {
        this.setState({
            selectedSubjects: this.state.selectedSubjects.filter((subject, index) => selectedIndex !== index)
        });
    };

    render() {

        const subjectAdd = this.state.selectedSubjects.map((subject, index) => {
            return <div key={index} className="form-group form-inline">
                <select
                    className="form-control mr-sm-2"
                    name="subjects"
                    value={subject._id}
                    onChange={(e) => this.handleSubjectChange(e, index)}
                >
                    <option value="">Select Subject</option>
                    {this.state.subjects.map(item => {
                        return <option key={item._id} value={item._id}>{item.code}</option>
                    })}
                </select>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => this.handleRemoveSubject(index)}
                >
                    Remove
                </button>
                <br/>
            </div>
        });

        const updateForm = <form onSubmit={this.onSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Update Form</h1>
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
            <h4>Subjects</h4>
            {this.state.subjects ? subjectAdd : <p></p>}
            <button
                type="button"
                onClick={this.handleAddSubject}
                className="btn form-control btn-secondary"
            >
                Add Subject
            </button>
            <br/>
            <br/>
            <button type="submit" className="btn btn-lg btn-primary btn-block">
                Update Course
            </button>
            <br/>
            <button onClick={this.onClick} className="btn btn-lg btn-danger btn-block">
                Delete Course
            </button>
            <br/>
        </form>;

        return <div className="container mt-2">
            <div className="container mt-3">
                <h1 className="h3 mb-3 font-weight-normal">Enter Course Code to Search Course</h1>
                <br/>
                <form className="form-inline">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Course Code: </span>
                        </div>
                        <input
                            className="form-control mr-sm-2"
                            type="text"
                            name="searchCode"
                            value={this.state.searchCode}
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