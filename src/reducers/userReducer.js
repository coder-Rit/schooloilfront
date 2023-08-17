import {
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_REQUEST,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_REQUEST,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_REQUEST,
 
} from "../constants/userConstants";

export const userReducer = (state = { user: {}  }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_USER_REQUEST:
    case LOAD_USER_REQUEST:
    case UPDATE_USER_REQUEST:
    
      return {
        loading: true,
        isAuthenticated: false,
        is_all_user_data_ready:false,

        signUp: false,
        logIn: false,
      };
    case LOGIN_SUCCESS:
     case LOAD_USER_SUCCESS:
    case UPDATE_USER_SUCCESS: 
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        signUp: false,
        logIn: true, 
        user: action.payload,
        is_all_user_data_ready:true,
        all_user:action.payload2 
      };
      case REGISTER_USER_SUCCESS: 
      return {
        ...state,
        loading: false,
        signUp: true,
        logIn: false,
        isAuthenticated: true,
        user: action.payload,
        is_all_user_data_ready:true,
        all_user:action.payload2 
      };
    case LOGIN_FAIL:
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        is_all_user_data_ready:false,
        signUp: false,
        logIn: false,
        user: null,
        all_user:null,
        error: action.payload, 
      };
    case UPDATE_USER_FAIL: 
      return {
        ...state,
        loading: true,
        isAuthenticated: true,
        is_all_user_data_ready:true, 
        signUp: false,
        logIn: false,
        user:action.payload2,
        all_user:null,
        error: action.payload, 
      };
    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        signUp: false,
        logIn: false,
        logedOut: true,
        user: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
