import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';
import { Link, Redirect } from 'react-router-dom';
import MyCars from './MyCars';
import MyProfileInfo from './MyProfileInfo';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Profile extends Component {
   
    componentDidMount(){
       
    }

    render() {
        if (this.props.authentication.user) {

            const { user, user_id } = this.props.authentication;

            if (!this.props.authentication.user.profile) {
                toast.error("Add your Profile Picture and Contact Information first to continue...", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 5000
                });
                return <Redirect to="profile/edit" />
            }
            else {
                console.log(this.props.authentication);
                return (
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <MyProfileInfo user={user} />
                            </div>
                            <div className="col-md-8 my-3">
                                <Link to="/profile/addcar" className="btn btn-danger rounded-0 w-25 d-block ml-auto">Add Car <i className="fas fa-plus ml-3"></i></Link>
                                <MyCars userid={user_id} />
                            </div>
                        </div>
                    </div>
                )
            }
        } else {
            return (
                <p>loading profile...</p>
            )
        }

    }
}

const mapStateToProps = state => ({
    authentication: state.authReducer
})


export default connect(mapStateToProps, { loadUser })(Profile);