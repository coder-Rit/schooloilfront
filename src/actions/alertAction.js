import { CLEAR_ALERT } from "../constants/alertConstants";

 
   
  export const clearAlert = ( ) => async (dispatch) => {
    dispatch({type:CLEAR_ALERT})
  };
  
  