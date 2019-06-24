import React, {Component} from 'react';
import axios from 'axios';

export default class AdminSubjectUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            _id: "",
            code: "",
            name: "",
            description: "",
            selectedInstructors: [{_id:""}],
            instructors: [],
            searchCode: "",
            isFound: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleRemoveInstructor = this.handleRemoveInstructor.bind(this);
        this.handleAddInstructor = this.handleAddInstructor.bind(this);
        this.handleInstructorChange = this.handleInstructorChange.bind(this);
    }

    componentWillMount() {
        axios.get('http://localhost:3000/administrator/instructors').then(data => {
            this.setState({
                instructors: data.data
            })
        });
    }

    onClick(event){
        event.preventDefault();
        if (confirm("Are you sure you want to delete this subject?")) {
            axios.delete('http://localhost:3000/administrator/subject/delete/' + this.state._id).then(data => {
                alert(data.data);
                window.location.reload();
            }).catch(err => {
                console.log(err.response.data);
            })
        }
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    onSubmit(event) {
        event.preventDefault();
        const _id = this.state._id;
        const code = this.state.code.trim();
        const name = this.state.name.trim();
        const description = this.state.description.trim();
        const instructors = this.state.selectedInstructors;

        if (code == '' || name == '' || description == '') {
            alert('One or more fields are empty!');
        } else {
            const subject = {
                _id: _id,
                code: code,
                name: name,
                description: description,
                instructors: instructors
            };

            axios.put('http://localhost:3000/administrator/subject/update', subject).then(data => {
                alert(data.data);
            }).catch(err => {
                alert(err.response.data);
            });
        }
    }

    onSearch(event){
        event.preventDefault();
        const searchCode = this.state.searchCode;
        axios.post('http://localhost:3000/administrator/subject/search', {code: searchCode})
            .then(res => {
                const instructors = res.data.instructors.map(item => {
                    return {_id: item};
                });

                this.setState({
                    _id: res.data._id,
                    code: res.data.code,
                    name: res.data.name,
                    description: res.data.description,
                    selectedInstructors: instructors,
                    isFound: true
                });
            }).catch(err => {
            alert(err.response.data);
        })
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

    render() {

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

        const updateForm = <form onSubmit={this.onSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Update Form</h1>
            <div className="form-group">
                <label htmlFor="code">Subject Code</label>
                <input type="text"
                       name="code"
                       placeholder="Enter Subject Code"
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
                       placeholder="Enter Subject Name"
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
                          placeholder="Enter Subject Description"
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
            <button type="submit" className="btn btn-lg btn-primary btn-block">
                Update Subject
            </button>
            <br/>
            <button onClick={this.onClick} className="btn btn-lg btn-danger btn-block">
                Delete Subject
            </button>
            <br/>
        </form>;

        return <div className="container mt-2">
            <div className="container mt-3">
                <h1 className="h3 mb-3 font-weight-normal">Enter Subject Code to Search Course</h1>
                <br/>
                <form className="form-inline">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Subject Code: </span>
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