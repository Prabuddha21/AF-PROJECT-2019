import React, {Component} from 'react';
import axios from 'axios';

class AdminNotice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            values: this.props.values,
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick(event){
        event.preventDefault();
        if (confirm("Are you sure you want to delete this notice?")) {
            axios.delete('http://localhost:3000/administrator/removenotice/' + this.props.values._id).then(data => {
                alert(data.data);
                window.location.reload();
            }).catch(err => {
                console.log(err.response.data);
            })
        }
    }

    render() {
        return <div className="jumbotron">
            <div className="row">
                <div className="col-sm-8 col-md-6 mx-auto">
                    <div className="form-inline justify-content-end">
                        <button onClick={this.onClick} className="btn btn-danger">X</button>
                    </div>
                    <h2>{this.state.values.title}</h2>
                    <table className="table mx-auto">
                        <tbody>
                        <tr>
                            <td>{this.state.values.content}</td>
                        </tr>
                        <tr>
                            <td>By: {this.state.values.by}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    }
}

export default AdminNotice;