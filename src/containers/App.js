import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home';

import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import ForgotPass from '../components/Auth/ForgotPass';

import Cardetaills from '../components/Cars/Cardetails';



//profile component
import Profile from '../components/Profile/Profile';
import ProfileEdit from '../components/Profile/ProfileEdit';
import AddCar from '../components/Profile/AddCar';

//private router component wrapper
import PrivateRoute from '../components/Common/PrivateRoute';

import { loadUser, logout } from '../actions/authActions';

import { ToastContainer } from 'react-toastify';

import logo from './logo.png';

class App extends Component {
    componentDidMount() {
        this.props.loadUser();
    }

    render() {
        const navbar_authenticated = <div>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark ">
                <Link className='navbar-brand' style={{fontFamily:'Abril Fatface'}}><img src={logo} width="50px"/>Carhub</Link>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item mx-2">
                        <Link className="nav-link" to="/"><i className="fa fa-home fa-lg"></i></Link>
                    </li>
                    <li className="nav-item mx-2">
                        <Link className="nav-link  " to="/profile"><i class="fas fa-user fa-lg"></i></Link>
                    </li>
                    <li className="nav-item mx-2">
                       <Link className="nav-link"> <i className="fas fa-sign-out-alt fa-lg pointer" title="Logout" onClick={this.props.logout}></i></Link>
                    </li>
                </ul>

            </nav>
        </div>

        const navbar_not_authenticated = <div>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark ">
                <Link className='navbar-brand'  style={{fontFamily:'Abril Fatface'}}> <img src={logo} width="50px" /> Carhub</Link>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item mx-2">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item mx-2">
                        <Link className="nav-link btn btn-danger text-white" to="/register">Sell Your Car</Link>
                    </li>
                    <li className="nav-item mx-2">
                        <Link className="nav-link btn btn-outline-danger" to="/login">Login</Link>
                    </li>
                </ul>

            </nav>
        </div>


        return (
            <div>
                <Router>
                    <ToastContainer autoClose={1000} />
                    {this.props.authentication.isAuthenticated ?
                        navbar_authenticated
                        : navbar_not_authenticated}
                    <Switch>
                        <Route path="/forgotpassword"  component={ForgotPass} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/register" exact component={Register} />
                        <Route path="/" exact component={Home} />
                        <Route path="/cars/:id" exact component={Cardetaills} />

                        <PrivateRoute path="/profile" exact component={Profile} />
                        <PrivateRoute path="/profile/edit" exact component={ProfileEdit} />
                        <PrivateRoute path="/profile/addcar" exact component={AddCar} />
                    </Switch>
                    {/* <footer className="mt-5" style={{ position: 'relative', bottom: 0, width: '100%' }}>
                        <nav className="p-2 text-center bg-dark navbar-dark ">
                            <Link className="text-center text-white">carhub.brewedlogic.io</Link>
                        </nav>
                    </footer> */}
                </Router>
            </div>
        )

    }
}


const mapStateToProps = state => ({
    authentication: state.authReducer
})

export default connect(mapStateToProps, { loadUser, logout })(App);