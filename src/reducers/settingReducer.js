import {
    
    CHANGE_THEME, STORE_TOKEN,
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

      case STORE_TOKEN: 
        return { 
          ...state,
          token:action.payload
        };
          
      default:
        return state;
    }
  };
  