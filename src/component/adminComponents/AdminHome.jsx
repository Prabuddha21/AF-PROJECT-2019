import React, {Component} from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import AdminNotice from "./AdminNotice";

export default class AdminHome extends Component{

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            user: "",
            notices: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.refreshNotices = this.refreshNotices.bind(this);
    }

    componentDidMount() {
        jwt.verify(sessionStorage.getItem('admintoken'), 'secret', (err, decoded) => {
            if(err) {
                console.log(err);
            } else {
                this.setState({user: decoded});
            }
        });
        this.refreshNotices();
    }

    refreshNotices() {
        axios.get('http://localhost:3000/administrator/getnotices').then((data) => {
            this.setState({notices: data.data});
        }).catch(err => {
            console.log(err);
        })
    }

    onChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const title = this.state.title;
        const content = this.state.content;
        const by = this.state.user.firstName + " " + this.state.user.lastName;
        if(title !== "" && content !== ""){
            axios.post('http://localhost:3000/administrator/addnotice', {
                title: title,
                content: content,
                by: by
            }).then(data => {
                alert(data.data);
                this.refreshNotices();
            }).catch(err => {
                alert(err.response.data);
            });
        } else {
            alert('Please enter valid inputs.');
        }
    }

    render() {

        const notices = this.state.notices.map(item => {
            return <AdminNotice key={item._id} values={item}/>
        });

        return <div className="jumbotron jumbotron-fluid text-center">
            <h1 className="h1 align-content-center">NOTICES</h1>
            <br/>
            <div className="mx-auto">
                <div className="jumbotron bg-light">
                        {notices !== null ? notices : <p>No Notices</p>}
                </div>
                <div className="col-md-6 mt-5 mx-auto">
                    <form>
                        <div className="form-group">
                            <label htmlFor="Title">Notice Title</label>
                            <input type="text"
                                   name="title"
                                   placeholder="Enter Title"
                                   className="form-control"
                                   value={this.state.title}
                                   onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Content">Notice Content</label>
                            <textarea rows="5"
                                   name="content"
                                   placeholder="Enter Content"
                                   className="form-control"
                                   value={this.state.content}
                                   onChange={this.onChange}
                            />
                        </div>
                        <br/>
                        <button type="submit" className="btn btn-lg btn-primary btn-block" onClick={this.handleSubmit}>Add Notice</button>
                    </form>
                </div>
            </div>
        </div>
    }
}