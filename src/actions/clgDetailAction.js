import {
  DETAIL_FAIL,
  DETAIL_REQUEST,
  DETAIL_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/clgDetialConstants";
import axios from "axios";
const baseUrl = ``



export const getCollegeDetails = (clgCode) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_REQUEST });

   
   
    const { data } = await axios.get(
      `${baseUrl}/api/v1/collegeCode/${clgCode}` 
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
      `${baseUrl}/api/v1/clgShortName/${clgShortName}` 
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
