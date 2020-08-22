import React, { Component } from 'react'
import axios from 'axios';

class ForgotPass extends Component {
    state = {
        email: '',
        success: '',
        error: null
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/userapi/auth/password/reset/', {
            email: this.state.email
        })
            .then(res => {
                this.setState({
                    success: res.data.detail,
                    error: null,
                    email: ''
                })
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    error: "Reset Request Failed.",
                    success: null
                })
            })

    }
    render() {
        return (
            <div>
                <div className="container my-5">
                    <h3>Reset Password</h3>
                    {this.state.error ? <p className="text-center text-danger">{this.state.error}</p> : ''}
                    {this.state.success ? <p className="text-center text-success">{this.state.success}</p> : ''}
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="text" name="email" value={this.state.email} onChange={this.handleChange} className="form-control" required placeholder="email address" />
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-danger rounded-0" value="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}


export default ForgotPass;