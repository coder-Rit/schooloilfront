import {
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_REQUEST,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_REQUEST,
  LOG_OUT,
} from "../constants/userConstants";
import axios from "axios";
import { MAKE_ALERT } from "../constants/alertConstants";
import Cookies from 'universal-cookie'
const cookies = new Cookies();
const token = cookies.get('token')
 
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { Headers: { "Content-Type": "application/json" } };
     const { data } = await axios.post(
      `https://schooloil-api.onrender.com/api/v1/login`,
      { email, password },
      config
    );
    console.log(data);
    cookies.set('token', data.Token);
     localStorage.setItem("login",JSON.stringify(true))
     dispatch({ type: LOGIN_SUCCESS, payload: data.user });
     dispatch({ type: MAKE_ALERT, payload1: 1,payload2:"Login successful" });
     
     
  } catch (error) {
    console.log(error);
     
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg  });
    dispatch({ type: MAKE_ALERT, payload1: 0,payload2:error.response.data.msg });
    
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    
    const config = {
      Headers: { "Content-Type": "application/json" }, 
    };

    const { data } = await axios.post(`https://schooloil-api.onrender.com/api/v1/signup`, userData, config);
    
    localStorage.setItem("login",JSON.stringify(true))
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    dispatch({ type: MAKE_ALERT, payload1: 1,payload2:"Account created successfully. please update your account" });
    
  } catch (error) {
    console.log(error.response);
    dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.msg });
    dispatch({ type: MAKE_ALERT, payload1: 0,payload2:error.response.data.msg });
    
  }
};
// faculty registation
export const registerfaculty = (userData,user) => async (dispatch) => {
   try {
    dispatch({ type: REGISTER_USER_REQUEST });
    
    const config = {
      Headers: { "Content-Type": "application/json" }, 
    };

    const { data } = await axios.post(`https://schooloil-api.onrender.com/api/v1/signup/faculty`, userData, config);
    dispatch({ type: REGISTER_USER_SUCCESS, payload: user });
    
     dispatch({ type: MAKE_ALERT, payload1: 1,payload2:"Account created successfully." });
    
  } catch (error) {
    console.log(error.response);
    dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.msg });
    dispatch({ type: MAKE_ALERT, payload1: 0,payload2:error.response.data.msg });
    
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    const config = {
      Headers: { "Content-Type": "application/json" },
      muteHttpExceptions: true
    };
    
    console.log(token);
    const { data } = await axios.get(`https://schooloil-api.onrender.com/api/v1/user/me/${token}`,config);
    
    localStorage.setItem("login",JSON.stringify(true))
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    console.log(error);
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.msg });
  }
};
export const storeUser = (data) => async (dispatch) => { 
  dispatch({ type: LOAD_USER_SUCCESS, payload: data });
  
};

export const  logOut_user = () => async (dispatch) => {
  try {
    await axios.get(`https://schooloil-api.onrender.com/api/v1/logout`);
    dispatch({ type: LOAD_USER_FAIL });
    let theme =localStorage.getItem("theme")
    localStorage.clear()
    localStorage.setItem("theme",theme)
    localStorage.setItem("login",JSON.stringify(false))
    dispatch({ type: MAKE_ALERT, payload1: 1,payload2:"Log out successfully" });
    
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.msg });
    dispatch({ type: MAKE_ALERT, payload1: 0,payload2:"Fail to logout" });

  } 
};

export const updateUserBasicDetail = (updated_data) => async (dispatch) => {

  try {
    dispatch({ type: UPDATE_USER_REQUEST });
    const config = { Headers: { "Content-Type": "application/json" } };
    console.log(updated_data);
    const { data } = await axios.put(
      `https://schooloil-api.onrender.com/api/v1/user/update/${token}`,
      updated_data,
      config
    );
    console.log(data);

    if (typeof updated_data.status !== "undefined") {
    } else {
      dispatch({ type: UPDATE_USER_SUCCESS, payload: data.user });
    }
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAIL, payload: error.response.data.msg });
  }
};
 
 

 

// changing password
export const change_password = (passOBJ, user) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_REQUEST });

  try {
    const { data } = await axios.put(`https://schooloil-api.onrender.com/api/v1/user/updatePass/${token}`, passOBJ);
    console.log(data);
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.user });
    dispatch({ type: MAKE_ALERT, payload1: 1,payload2:"Password changed" });

   } catch (error) {
    dispatch({ type: MAKE_ALERT, payload1: 0,payload2:"Unable to change password" });

     dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.msg,
      payload2: user,
    });
  }
};

//checking is user exist or not
export const is_user_exist = (email, OTP) => async (dispatch) => {
  try {
    console.log(email);
    const config = { Headers: { "Content-Type": "application/json" } };
    const { data } = await axios.get(`https://schooloil-api.onrender.com/api/v1/user/isExist/${email}`,config  );
    if (data.success == true) {
      try {
        await axios.post(`https://schooloil-api.onrender.com/api/v1/user/gerateOTP/email`, {
          username: data.username,
          email: email,
          OTP: OTP,
        });
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log( error.response.data);
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
  }
};

//checking is user exist or not
export const login_withoutPassAc = (email, sendedOTP,recivedOTP) => async (dispatch) => {
  try {
    console.log(email);
    const config = { Headers: { "Content-Type": "application/json" } };
    const { data } = await axios.get(`https://schooloil-api.onrender.com/api/v1/user/login_withoutPass/${email}/${sendedOTP}/${recivedOTP}`,config  );
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    dispatch({ type: MAKE_ALERT, payload1: 1,payload2:"login successfull. please change you password" });


    
  } catch (error) {
     console.log(error.response.data.msg);
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
    dispatch({ type: MAKE_ALERT, payload1: 0,payload2:error.response.data.msg  });

  }
};



export const clareErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
