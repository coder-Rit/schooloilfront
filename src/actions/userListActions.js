import axios from "axios";
import {

  GET_ALL_USER_DETAIL_BY_DATA_FAIL,
  GET_ALL_USER_DETAIL_BY_DATA_REQUEST,
  GET_ALL_USER_DETAIL_BY_DATA_SUCCESS,
  GET_ALL_USER_DETAIL_FAIL,
  GET_ALL_USER_DETAIL_REQUEST,
  GET_ALL_USER_DETAIL_SUCCESS,
} from "../constants/userDetailConstants";
 
const baseUrl = ``

// get selected userDetail
export const get_All_user = (tempOBJ) => async (dispatch) => {
  const { course, year, div, clgShortName,department,id } = tempOBJ; 
  console.log(tempOBJ);
  try {
    dispatch({ type: GET_ALL_USER_DETAIL_REQUEST });
    const { data } = await axios.get(
      `${baseUrl}/api/v1/getstudents/${course}/${clgShortName}/${department}/${year}/${div}`
      
    );
    console.log(data); 

   localStorage.setItem(id,JSON.stringify(data.userList)) 
    dispatch({ type: GET_ALL_USER_DETAIL_SUCCESS, payload: data.userList });
  } catch (error) {
    dispatch({
      type: GET_ALL_USER_DETAIL_FAIL,
      payload: error.response.data.msg,
    });
  }
};
export const set_All_user = (userList) => async (dispatch) => {

    dispatch({ type: GET_ALL_USER_DETAIL_SUCCESS, payload: userList });
   
};
export const make_list_empty = () => async (dispatch) => {

    dispatch({ type: GET_ALL_USER_DETAIL_REQUEST });
   
};


// get faculty member by data
export const get_faculty_members_by_data = (tempOBJ) => async (dispatch) => {
   const { course, year, clgShortName,department } = tempOBJ; 
  try {
    dispatch({ type: GET_ALL_USER_DETAIL_BY_DATA_REQUEST });
    const { data } = await axios.get(
      `${baseUrl}/api/v1/faculty/details/${clgShortName}/${department}/${course}/${year}`
      
    );
    console.log(data);

    dispatch({ type: GET_ALL_USER_DETAIL_BY_DATA_SUCCESS, payload: data.allFacultyMembers  });
  } catch (error) {
    dispatch({
      type: GET_ALL_USER_DETAIL_BY_DATA_FAIL,
      payload: error.response.data.msg,
    });
  }
};
