import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router-dom';

import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGIN_ERROR, REGISTER_ERROR, REGISTER_SUCCESS } from './types';

//Check token and load user
export const loadUser = () => (dispatch, getState) => {

    dispatch({ type: USER_LOADING })
    //const user_id = getState().authReducer.user_id;
    const user_id = localStorage.getItem('user_id');

    axios.get(`/userapi/users/${user_id}/`).then(res => {
        dispatch({ type: USER_LOADED, payload: res.data })
    }).catch(err => {
        console.log(err)
    })
}


export const login = (email, password) => dispatch => {
    // username is == email becoz of drf model, REMEMBER!
    const data = {
        username: email,
        password: password
    }

    axios.post('/userapi/authenticate/', data)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })

            dispatch({ type: USER_LOADING })
            //const user_id = getState().authReducer.user_id;
            const user_id = localStorage.getItem('user_id');

            axios.get(`/userapi/users/${user_id}/`).then(res => {
                dispatch({ type: USER_LOADED, payload: res.data })
            }).catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log("ERROR", err)
            dispatch({
                type: LOGIN_ERROR,
            })

        })
}

export const register = (userData) => dispatch => {

    axios.post(`/userapi/users/`, userData).then(res => {

        toast.success("Successfully Registered !", {
            position: toast.POSITION.TOP_CENTER
        });

        dispatch({
            type: REGISTER_SUCCESS,
        })

        setTimeout(() => {
            window.location.href = "/login";
        }, 1000)

    }).catch(err => {
        console.log(err);
        toast.error("Registration Error !", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000
        });
        dispatch({
            type: REGISTER_ERROR,
        })

    })

  
}



export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT_SUCCESS
    })
}


