import {
  UPDATE_USER_DETAIL_FAIL,
  UPDATE_USER_DETAIL_SUCCESS,
  UPDATE_USER_DETAIL_REQUEST,
  GET_USER_DETAIL_FAIL,
  GET_USER_DETAIL_SUCCESSS,
  GET_USER_DETAIL_REQUEST,
  CLEAR_ERRORS,
  
  GET_ALL_USER_DETAIL_SUCCESS,
  GET_ALL_USER_DETAIL_REQUEST,
  
  GET_USER_DETAIL_copy_FAIL,
  GET_USER_DETAIL_copy_REQUEST,
  GET_USER_DETAIL_copy_SUCCESSS,
  FIND_USERDETAIL_BY_ID_UPDATE_ROLE_FAIL,
  FIND_USERDETAIL_BY_ID_UPDATE_ROLE_SUCCESSS,
  FIND_USERDETAIL_BY_ID_UPDATE_ROLE_REQUEST,  
} from "../constants/userDetailConstants";
import axios from "axios";
import { MAKE_ALERT } from "../constants/alertConstants";
import Cookies from 'universal-cookie'
const cookies = new Cookies();
let token = cookies.get("token");


export const updateUser = (userUpdatedDetail) => async (dispatch) => {
  try {
 
    const { data } = await axios.post(
      `https://schooloil-api.onrender.com/api/v1/updateNcreate`,
      {...userUpdatedDetail,token}
    );
    console.log(data);
   
  

    dispatch({ type: MAKE_ALERT, payload1: 1,payload2:"Account updated" });

  } catch (error) {
    console.log(error);
    dispatch({ type: MAKE_ALERT, payload1: 0,payload2:"Fail to update account, "+ error.response.data.msg });
   
  }
};



export const updateUsers_Email = (userUpdatedDetail) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_DETAIL_REQUEST });

    const { data } = await axios.post(
      `https://schooloil-api.onrender.com/api/v1/updateStudentEmail`,
      {...userUpdatedDetail,token} 
    );
    
    let updatedUser = data.user

    updatedUser.email=userUpdatedDetail.email


    console.log(updatedUser);
   
    localStorage.setItem("studentDetail",JSON.stringify(updatedUser))
 

    dispatch({ type: MAKE_ALERT, payload1: 1,payload2:"Email Updated" });

    dispatch({ type: UPDATE_USER_DETAIL_SUCCESS, payload: updatedUser });
  } catch (error) {
    console.log(error);
    dispatch({ type: MAKE_ALERT, payload1: 0,payload2:" Email NOT Updated, "+ error.response.data.msg });
   
    dispatch({ type: UPDATE_USER_DETAIL_FAIL, payload: error.response.data.msg });
  }
};

//sotring data for local
export const store_student_local_data = (localData) => async (dispatch) => {

    dispatch({ type: GET_USER_DETAIL_SUCCESSS, payload: localData });
  
};

//add students 
export const addMultipleStudents = (list) => async (dispatch) => { 
  
  try {
     const { data } = await axios.post(
      `https://schooloil-api.onrender.com/api/v1/addstudents` ,{...list,token}
    );
    console.log(data);

    dispatch({ type: MAKE_ALERT, payload1: 1,payload2:"Account updated" });


     
  } catch (error) {
    dispatch({ type: MAKE_ALERT, payload1: 0,payload2:"Fail to update account, "+ error.response.data.msg });

    console.log( error.response.data.msg);
  }
};


 
// userDetails for students
export const getUserDetailbyEN = (enNumber,role) => async (dispatch) => { 
  
  try {

    if(role==="student"){

      dispatch({ type: GET_USER_DETAIL_REQUEST });  
    }else{
      dispatch({ type: GET_ALL_USER_DETAIL_REQUEST });
    }
      
    const { data } = await axios.post(
      `https://schooloil-api.onrender.com/api/v1/user/detail/${enNumber}`,{token} 
    );
    console.log(data);

    if(role==="student"){
      localStorage.removeItem("studentDetail")
      localStorage.setItem("studentDetail",JSON.stringify(data.userDetail))
      dispatch({ type: GET_USER_DETAIL_SUCCESSS, payload: data.userDetail });
    }
    else{
    dispatch({ type: GET_ALL_USER_DETAIL_SUCCESS, payload: [data.userDetail] });

 
    }
    
  } catch (error) {
    dispatch({ type: GET_USER_DETAIL_FAIL, payload: error.response.data.msg });
  }
};
// userDetails for students
export const getUserDetail_copy = (email) => async (dispatch) => { 
  
  try {
    dispatch({ type: GET_USER_DETAIL_copy_REQUEST });  
    const obj ={
      name:"ritesh",
      token:token
    }

 
       
    const { data } = await axios.post(
      `https://schooloil-api.onrender.com/api/v1/user/detail/${email}`,{obj}
    );
    
    dispatch({ type: GET_USER_DETAIL_copy_SUCCESSS, payload: data.userDetail });
  } catch (error) {
    dispatch({ type: GET_USER_DETAIL_copy_FAIL, payload: error.response.data.msg });
  }
};


 // update faculty or add
export const updatefaculty = (userUpdatedDetail) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_DETAIL_REQUEST });

    console.log(userUpdatedDetail);
    const config = { Headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `https://schooloil-api.onrender.com/api/v1/update/faculty`,
      userUpdatedDetail  
    );
    console.log(data) 
    localStorage.removeItem("teacherDetail")
    localStorage.setItem("teacherDetail",JSON.stringify(userUpdatedDetail))
    
     
    dispatch({ type: UPDATE_USER_DETAIL_SUCCESS, payload: userUpdatedDetail });
    dispatch({ type: MAKE_ALERT, payload1: 1,payload2:"Account updated" });
  } catch (error) {
    console.log(error);
    dispatch({ type: UPDATE_USER_DETAIL_FAIL, payload: error.response.data.msg });
    dispatch({ type: MAKE_ALERT, payload1: 0,payload2:"Fail to update account, " +error.response.data.msg });
  }
};



// userDetails for faculty
export const getUserDetailFaculty = (email) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_DETAIL_REQUEST });  



     const { data } = await axios.post(
       `https://schooloil-api.onrender.com/api/v1/faculty/detail/${email}`,{token}
     );
   

    localStorage.removeItem("teacherDetail")
    localStorage.setItem("teacherDetail",JSON.stringify(data.userDetail))
    dispatch({ type: GET_USER_DETAIL_SUCCESSS, payload: data.userDetail });
  } catch (error) {
    dispatch({ type: GET_USER_DETAIL_FAIL, payload: error.response.data.msg });
  }
};

export const store_faculty_local_data = (localData) => async (dispatch) => {

  dispatch({ type: GET_USER_DETAIL_SUCCESSS, payload: localData });

};

 export const set_user_detail_to_view_account=(userDetail)=>async(dispatch)=>{
 // dispatch({type:SET_USER_DETAIL_TO_VIEW_ACCOUNT,payload:userDetail})
     localStorage.setItem("studentDetail",JSON.stringify(userDetail))
 dispatch({type:GET_USER_DETAIL_copy_SUCCESSS,payload:userDetail})
 }
 


  // update faculty or add
export const find_student_by_id_and_update_role = (id,role) => async (dispatch) => {
  try {
    dispatch({ type: FIND_USERDETAIL_BY_ID_UPDATE_ROLE_REQUEST });

     const config = { Headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `https://schooloil-api.onrender.com/api/v1/user/student/update/role/${id}/${role}` 
    );
    console.log(data.userDetail);
    dispatch({ type: FIND_USERDETAIL_BY_ID_UPDATE_ROLE_SUCCESSS, payload: data.userDetail });
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: FIND_USERDETAIL_BY_ID_UPDATE_ROLE_FAIL, payload: error.response.data.msg });
  }
};



 

export const clareErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
