import {
    
    CHANGE_THEME,
  } from "../constants/settingConstant";
  
  export const settingReducer = (
    state = {  
        theme:"light_theme"
     },
    action
  ) => {
    switch (action.type) {
      case CHANGE_THEME: 
        return { 
          ...state,
          theme:action.payload
        };
          
      default:
        return state;
    }
  };
  