import React from 'react'
import { Link } from 'react-router-dom';
import logo from './logo.png';

function NavNotAuthenticated() {
    return (
        <div>
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
    )
}

export default NavNotAuthenticated
