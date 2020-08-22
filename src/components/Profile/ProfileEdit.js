import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import MyProfileInfo from './MyProfileInfo';
import axios from 'axios';
import { parse } from '@babel/core';


class ProfileEdit extends Component {

    state = {

        password: {
            new_password1: '',
            new_password2: '',
        },
        profileInfo: {
            profilepic: '',
            phone: '',
            address: '',
            city: '',
            country: '',
            user: ''
        },

        error: ''
    }

    componentDidMount() {



        this.setState({
            profileInfo: this.props.user.profile
        })

        console.log(this.props.user.profile);
    }


    handleChangePass = (event) => {
        event.preventDefault();
        const { new_password1, new_password2 } = this.state.password;
        if (new_password1 !== new_password2) {
            this.setState({
                error: 'Password Dont Not Match'
            })
            return false;
        }
        else {

            const token = localStorage.getItem('token');
            const uid = parseInt(localStorage.getItem('user_id'));

            const data = {
                "new_password1": new_password1,
                "new_password2": new_password2,
                "uid": uid,
                "token": token,

            }

            //post request to : /userapi/auth/password/reset/confirm/

            axios.post('/userapi/auth/password/reset/confirm/', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })

        }

    }

    handleInputChangePass = (event) => {
        console.log(event.target.value);

        const password = { ...this.state['password'] };
        password[event.target.name] = event.target.value;
        this.setState({ password: password });
    }


    handleProfileFormSubmit = (event) => {



        event.preventDefault();
        console.log("Form submitted", this.state.profileInfo);
        let form_data = new FormData();

        form_data.append('profilepic', this.state.profileInfo.profilepic, this.state.profileInfo.profilepic.name);
        form_data.append('phone', this.state.profileInfo.phone);
        form_data.append('address', this.state.profileInfo.address);
        form_data.append('city', this.state.profileInfo.city);
        form_data.append('country', this.state.profileInfo.country);

        let url = `/userapi/users/${this.props.user.profile.user}/`;

        console.log(form_data);
const userData = {
    profile: {
       
        phone: this.state.profileInfo.phone,
      
    }
}

console.log(userData);
        axios.put(url,
            {
                first_name: this.props.user.first_name,
                last_name: this.props.user.last_name,
                email: this.props.user.email,
                profile: userData,
            }, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(res => {
            console.log("success" + res);
        }).catch(err => {
            console.log(err)
        })


    }

    handleProfileImageChange = (event) => {
        const profileInfo = { ...this.state['profileInfo'] };
        profileInfo['profilepic'] = event.target.files[0];

        this.setState({ profileInfo: profileInfo });

    }

    handleProfileInputChange = (event) => {
        console.log(event.target.value);

        const profileInfo = { ...this.state['profileInfo'] };
        profileInfo[event.target.name] = event.target.value;
        this.setState({ profileInfo: profileInfo });
    }


    render() {
        const { user } = this.props;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <MyProfileInfo user={user} />
                    </div>
                    <div className="col my-3">
                        <h3>Edit Profile</h3>
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <Link className="nav-link " to="/profile"><i className=" fas fa-home"></i></Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " href="/profile/addcar">Add Car</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " data-toggle="tab" href="#primary">Primary Info</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" href="#update">Profile Info</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#changepass">Change Password</a>
                            </li>
                        </ul>

                        <div class="tab-content">

                            <div id="primary" className="container tab-pane my-3">
                                <form >
                                    <div className="form-group">
                                        <label htmlFor="password">First Name</label>
                                        <input type="password" name="oldpassword" className="form-control" autoComplete="false" required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Last Name</label>
                                        <input type="password" name="newpassword" className="form-control" autoComplete="false" required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Email</label>
                                        <input type="password" name="confirnewpassword" className="form-control" autoComplete="false" required />
                                    </div>

                                    <div className="form-group">
                                        <input type="submit" className="btn btn-danger rounded-0" value="Update" />
                                    </div>
                                </form>
                            </div>


                            <div id="update" class="container tab-pane active my-3">

                                <form onSubmit={this.handleProfileFormSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="">Profile Picture</label> <br></br>
                                        <input type="file" accept="image/png, image/jpeg" onChange={this.handleProfileImageChange} className="btn btn-danger btn-small rounded-0" autoComplete="false" required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="">Phone</label>
                                        <input type="text" name="phone" onChange={this.handleProfileInputChange} value={this.state.profileInfo.phone} className="form-control" autoComplete="false" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Address</label>
                                        <input type="text" name="address" onChange={this.handleProfileInputChange} value={this.state.profileInfo.address} className="form-control" autoComplete="false" required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">City</label>
                                        <input type="text" name="city" onChange={this.handleProfileInputChange} value={this.state.profileInfo.city} className="form-control" autoComplete="false" required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Country</label>
                                        <input type="password" name="country" onChange={this.handleProfileInputChange} value={this.state.profileInfo.country} className="form-control" autoComplete="false" required />
                                    </div>


                                    <div className="form-group">
                                        <input type="submit" className="btn btn-danger rounded-0" value="Update" />
                                    </div>
                                </form>
                            </div>

                            <div id="changepass" class="container tab-pane fade">
                                <h3 className="my-3">Change Password</h3>
                                <form onSubmit={this.handleChangePass}>
                                    <div className="form-group">
                                        <label htmlFor="password">New Password</label>
                                        <input type="password" name="new_password1" onChange={this.handleInputChangePass} value={this.state.password.new_password1} className="form-control" autoComplete="false" required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Confirm New Password</label>
                                        <input type="password" name="new_password2" onChange={this.handleInputChangePass} value={this.state.password.new_password2} className="form-control" autoComplete="false" required />
                                    </div>


                                    <div className="form-group">
                                        <input type="submit" className="btn btn-danger rounded-0" value="Change" />
                                    </div>

                                </form>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}



const mapStateToProps = state => ({
    user: state.authReducer.user
})

export default connect(mapStateToProps, null)(ProfileEdit);