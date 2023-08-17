import {
  GET_ALL_USER_DETAIL_FAIL,
  GET_ALL_USER_DETAIL_REQUEST,
  GET_ALL_USER_DETAIL_SUCCESS,
  CLEAR_ERRORS,
  GET_ALL_USER_DETAIL_BY_DATA_FAIL,
  GET_ALL_USER_DETAIL_BY_DATA_SUCCESS,
  GET_ALL_USER_DETAIL_BY_DATA_REQUEST,
} from "../constants/userDetailConstants";

export const userListReducer = (state = { all_user: {},facultyList:[] }, action) => {
  switch (action.type) {
    case GET_ALL_USER_DETAIL_REQUEST:
      case GET_ALL_USER_DETAIL_BY_DATA_REQUEST:
      return {
        loading: true,
        is_all_user_data_ready: false,
        isFacultyListGainByData:false
      };
    case GET_ALL_USER_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        is_all_user_data_ready: true,
        userList: action.payload,
      };
      case GET_ALL_USER_DETAIL_BY_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        is_all_user_data_ready: true,
        isFacultyListGainByData:true,
        facultyList: action.payload,
      };

    case GET_ALL_USER_DETAIL_FAIL:
      case GET_ALL_USER_DETAIL_BY_DATA_FAIL: 
      return {
        ...state,
        loading: false,
        is_all_user_data_ready: false,
        userList: null,
        facultyList:null,
        isFacultyListGainByData:false,
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
