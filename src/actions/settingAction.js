
import {
    CHANGE_THEME, STORE_TOKEN,
     
  } from "../constants/settingConstant";

  // update faculty or add
export const change_theme_setting = (prop) => async (dispatch) => { 
       dispatch({ type: CHANGE_THEME, payload: prop }); 
  };

  
export const store_jwt_token = (JWT) => async (dispatch) => { 
       dispatch({ type: STORE_TOKEN, payload: JWT }); 
  };
  
  
   