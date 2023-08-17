import {
  UPDATE_USER_DETAIL_FAIL,
  UPDATE_USER_DETAIL_SUCCESS,
  UPDATE_USER_DETAIL_REQUEST,
  GET_USER_DETAIL_FAIL,
  GET_USER_DETAIL_SUCCESSS,
  GET_USER_DETAIL_REQUEST, 
  CLEAR_ERRORS,
  GET_ALL_USER_DETAIL_BY_DATA_SUCCESS,
  GET_ALL_USER_DETAIL_BY_DATA_REQUEST,
  GET_ALL_USER_DETAIL_BY_DATA_FAIL
} from "../constants/userDetailConstants";

export const updateUserReducer = (state = { userDetail: {}   }, action) => {
  
  switch (action.type) {
    case UPDATE_USER_DETAIL_REQUEST:
      case GET_USER_DETAIL_REQUEST: 
    
      return {
        loading: true,
        isUserDetailUpdated: false,
        
        
      };

     case GET_USER_DETAIL_SUCCESSS:
 
      return {
        ...state,
        loading: false,
        isUserDetailUpdated: true,
        isUserDetailUpdated_real: false, 
        userDetail: action.payload,  
      };
    case UPDATE_USER_DETAIL_SUCCESS:
  
      return {
        ...state,
        loading: false,
        isUserDetailUpdated: true,
        isUserDetailUpdated_real: true, 
        userDetail: action.payload,  
      };
     
      
      case UPDATE_USER_DETAIL_FAIL:
        case GET_USER_DETAIL_FAIL: 
        
        return {
          ...state,
          loading: false,
          isUserDetailUpdated: false, 
          isFacultyListGainByData:false,
          userDetail: null,  
          error: action.payload,
          
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
