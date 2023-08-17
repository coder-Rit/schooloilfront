
import {
    CHANGE_THEME,
     
  } from "../constants/settingConstant";

  // update faculty or add
export const change_theme_setting = (prop) => async (dispatch) => { 
       dispatch({ type: CHANGE_THEME, payload: prop }); 
  };
  
  
   