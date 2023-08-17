import {
    UPDATE_DIVISION_FAIL,
    UPDATE_DIVISION_REQUEST,
    UPDATE_DIVISION_SUCCESS,
    GET_DIVISION_BY_FAIL,
    GET_DIVISION_BY_SUCCESS,
    GET_DIVISION_BY_REQUEST,
    GET_ALL_DIVISION_FAIL,
    GET_ALL_DIVISION_REQUEST,
    GET_DIVISION_ID,
    GET_ALL_DIVISION_SUCCESSS,
    CLEAR_ERRORS,
    SET_UPDATE_VAL,
    FIND_DIVISION_BY_DATA_AND_UPDATE_FAIL,
    FIND_DIVISION_BY_DATA_AND_UPDATE_SUCCESS,
    FIND_DIVISION_BY_DATA_AND_UPDATE_REQUEST,
    STORE_DIVISION_DATA,
  
  } from "../constants/divisionConstants";
  
  export const divisionReducer = (
    state = {
      divisions: [], 
    },
    action
  ) => {
    switch (action.type) {
     
      case GET_ALL_DIVISION_REQUEST: 
        return {
          loading: true, 
          isDivisionDataStored: false,
        };
       case GET_ALL_DIVISION_SUCCESSS:
        return {
          ...state, 
          divisions: action.payload, 
          isDivisionDataStored: false,
  
        };
      
    
      case GET_ALL_DIVISION_FAIL:
    
        return {
          ...state,
          loading: false,
           error: action.payload, 
          isDivisionDataStored: false,
  
          
  
        };
        
      case STORE_DIVISION_DATA:
        return {
          ...state,
          division: action.payload1,
          isDivisionDataStored: true,
          divisions:action.payload2,
        };
  
     
  
  
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
  
      default:
        return state;
    }
  };
  