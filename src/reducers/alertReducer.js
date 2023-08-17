import {
    CLEAR_ALERT,
    MAKE_ALERT
  } from "../constants/alertConstants";
  
  export const alertReducer = (state = { status:2,msg:"" }, action) => {
    switch (action.type) {
     
      case MAKE_ALERT:
        return {
          ...state, 
          status: action.payload1,
          msg: action.payload2,
        };
      case CLEAR_ALERT:
        return {
          ...state, 
          status: 2,
          msg: "",
        };
       
      default:
        return state;
    }
  };
  