import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, loadUser } from '../../actions/authActions';

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.props.login(this.state.email, this.state.password);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const login = <div className="container h-100 " style={{ marginTop: '5%' }}>
            <div className="row align-items-center h-100">
                <div className="col-6 mx-auto">
                    <div className="jumbotron card  bg bg-white border border-default">
                        {this.props.authenticated.login_error ? <h5 className="text-center text-danger">Invalid Credentials!</h5> : ''}
                        <form onSubmit={this.handleFormSubmit}>
                            <div className="form-group">
                                <label for="email" className="text-grey"><small>email address</small></label>
                                <input className="form-control border border-top-0 border-left-0 border-right-0 border-dark rounded-0" id="email" type="email" name="email" onChange={this.handleChange} value={this.state.email} value={this.state.email} required />
                            </div>
                            <div className="form-group">
                                <label for="password" className="text-grey"><small>password</small></label>
                                <input className="form-control border border-top-0 border-left-0 border-right-0 border-dark rounded-0 " id="password" type="password" name="password" onChange={this.handleChange} value={this.state.password} value={this.state.password} required /> <br />
                            </div>
                            <div className="form-group">
                                <input type="submit" className="btn btn-danger w-25 mx-auto d-block  rounded-0" value="Login" />
                            </div>
                        </form>


                        <p className="mt-5 ">No account? <Link to='/register' className="text-info ">Register here</Link></p>
                        <p className="text-left "><Link className="text-danger" to="/forgotpassword">Forgot Password?</Link></p>


                    </div>
                </div>
            </div>
        </div>

        return (
            <div>
                {!this.props.authenticated.isAuthenticated ? login : <Redirect to="/profile" />}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    authenticated: state.authReducer
})

export default connect(mapStateToProps, { login, loadUser })(Login);