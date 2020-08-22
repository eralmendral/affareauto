import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/authActions';
import logo from './logo.png';

function NavAuthenticated(props) {
    return (
        <div>
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
                   <Link className="nav-link"> <i className="fas fa-sign-out-alt fa-lg pointer" title="Logout" onClick={props.logout}></i></Link>
                </li>
            </ul>

        </nav>
    </div>
    )
}

export default connect(null, { logout })(NavAuthenticated);
