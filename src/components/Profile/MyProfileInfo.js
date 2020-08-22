import React from 'react'
import {Link} from 'react-router-dom';

function MyProfileInfo({user}) {
    return (
        <div>
            <div className="card p-3 my-3">
              <div className="row">
                  <div className="col-12">
                 {user.profile.profilepic ?  <img src={user.profile.profilepic} alt={user.first_name + ' ' + user.last_name} className="border border-default d-block mx-auto rounded-circle" width="80px" height="80px"/> : <img src= 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' alt="no profilepicture" width="80px" height="80px" className="rounded-circle d-block mx-auto" />}
             
                  </div>
                  <div className="col-12 text-center my-3">
                    <p>{user.first_name} {user.last_name}</p>
                    <p>{user.email} </p>
                    <p>{user.profile.phone} </p>
                    <p>{user.profile.address}  </p>
                    <p>{user.profile.city} , {user.profile.country}  </p>
                   
                  </div>
              </div>

              <div className="card-footer">
                 <Link to="/profile/edit"> <i className="fas fa-edit text-info" title="Edit Profile"></i></Link>
              </div>
            </div>
        </div>
    )
}

export default MyProfileInfo
