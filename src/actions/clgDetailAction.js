import {
  DETAIL_FAIL,
  DETAIL_REQUEST,
  DETAIL_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/clgDetialConstants";
import axios from "axios";
import Cookies from 'universal-cookie'
const cookies = new Cookies();
const token = cookies.get('token')

export const getCollegeDetails = (clgCode) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_REQUEST });

   
   
    const { data } = await axios.get(
      `/api/v1/collegeCode/${clgCode}/${token}` 
    );
console.log(data.clgDetail);
        dispatch({ type: DETAIL_SUCCESS, payload: data.clgDetail });
     
  } catch (error) {
    console.log(error.response.data.msg);
    dispatch({ type: DETAIL_FAIL, payload: error.response.data.msg });
  }
};

export const getCollegeDetailsByName = (clgShortName) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_REQUEST }); 
   
    const { data } = await axios.get(
      `/api/v1/clgShortName/${clgShortName}/${token}` 
    );
console.log(data.clgDetail);
        dispatch({ type: DETAIL_SUCCESS, payload: data.clgDetail });
     
  } catch (error) {
    console.log(error.response.data.msg);
    dispatch({ type: DETAIL_FAIL, payload: error.response.data.msg });
  }
};

export const clareErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
