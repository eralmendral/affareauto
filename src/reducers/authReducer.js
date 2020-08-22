import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_ERROR,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  user_id: null,
  login_error: false,
  register_error: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        user_id: action.payload.profile.user,
      };
    case AUTH_ERROR:
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      return {
        ...state,
        token: null,
        user: null,
        isLoading: false,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user_id", action.payload.user_id);
      return {
        ...state,
        token: action.payload.token,
        isLoading: false,
        isAuthenticated: true,
        user_id: action.payload.user_id,
      };

    case LOGIN_ERROR:
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      return {
        ...state,
        login_error: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        register_error: false,
      };
    case REGISTER_ERROR:
      return {
        ...state,
        register_error: true,
      };

    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        user_id: null,
      };

    default:
      return state;
  }
}
