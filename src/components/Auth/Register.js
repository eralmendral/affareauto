import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register, loadUser } from '../../actions/authActions';
import 'react-toastify/dist/ReactToastify.css';

class Register extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        profile: {}
    }


    handleFormSubmit = (e) => {
        e.preventDefault();

        console.log(this.state);
        this.props.register(this.state);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handlePhonechange = (event) => {
        const profile = { ...this.state['profile'] };
        profile[event.target.name] = event.target.value;
        this.setState({ profile: profile });
    }


    render() {
        const register = <div className="container h-100 " style={{ marginTop: '5%' }}>
            <div className="row align-items-center h-100">
                <div className="col-6 mx-auto">
                    {this.props.authenticated.register_error ? <h5 className="text-center text-danger">Invalid Registration: "email may have been taken"</h5> : ''}
                    <div className="jumbotron card  bg bg-white border border-default">
                        <p className="text-center  text-success">You must have an account to add car listing</p>
                        <form onSubmit={this.handleFormSubmit}>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label for="firstname" className="text-grey"><small>first name</small></label>
                                        <input
                                            className="form-control border border-top-0 border-left-0 border-right-0 border-dark rounded-0"
                                            id="firstname" type="text" name="first_name" onChange={this.handleChange}
                                            value={this.state.first_name} value={this.state.first_name} required />
                                    </div>

                                    <div className="col-md-6">
                                        <label for="lastname" className="text-grey"><small>last name</small></label>
                                        <input
                                            className="form-control border border-top-0 border-left-0 border-right-0 border-dark rounded-0"
                                            id="lastname" type="text" name="last_name" onChange={this.handleChange}
                                            value={this.state.firstname} value={this.state.last_name} required />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-6">
                                        <label for="email" className="text-grey"><small>email address</small></label>
                                        <input
                                            className="form-control border border-top-0 border-left-0 border-right-0 border-dark rounded-0"
                                            id="email" type="email" name="email" onChange={this.handleChange} value={this.state.email}
                                            required />
                                    </div>
                                    <div className="col-6">
                                        <label for="email" className="text-grey"><small>phone  number</small></label>
                                        <input
                                            className="form-control border border-top-0 border-left-0 border-right-0 border-dark rounded-0"
                                            id="" type="text" name="phone" onChange={this.handlePhonechange} value={this.state.profile.phone}
                                            required />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="password" className="text-grey"><small>password</small></label>
                                <input
                                    className="form-control border border-top-0 border-left-0 border-right-0 border-dark rounded-0 "
                                    id="password" type="password" name="password" onChange={this.handleChange}
                                    value={this.state.password} value={this.state.password} required /> <br />
                            </div>
                            <div className="form-group">
                                <input type="submit" className="btn btn-danger w-25 mx-auto d-block  rounded-0" value="Register" />
                            </div>
                        </form>
                        <p className="mt-5 text-right">Have an account?
                    <Link to='/login' className="">Login here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        return (
            <div>
                {!this.props.authenticated.isAuthenticated ? register :
                    <Redirect to="/profile" />}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    authenticated: state.authReducer
})

export default connect(mapStateToProps, { register, loadUser })(Register);