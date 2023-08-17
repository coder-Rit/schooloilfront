import {
  UPDATE_TIME_TABLE_FAIL,
  UPDATE_TIME_TABLE_REQUEST,
  CLEAR_ERRORS,
  UPDATE_TIME_TABLE_SUCCESS,
  SET_TIME_TABLE_DATA,
  GET_TIME_TABLE_BY_ID_FAIL,
  GET_TIME_TABLE_BY_ID_SUCCESS,
  GET_TIME_TABLE_BY_ID_REQUEST,
  CREATE_TIME_TABLE_SUCCESS,
  CREATE_TIME_TABLE_FAIL,
  CREATE_TIME_TABLE_REQUEST,
  CLEARE_TIMRTABLE_DATA,
} from "../constants/timeTableConstants";

export const timeTableReducer = (
  state = { timeTable: {}, timeTableID: "" },
  action
) => {
  switch (action.type) {
    case UPDATE_TIME_TABLE_REQUEST:
    case GET_TIME_TABLE_BY_ID_REQUEST:
    case CREATE_TIME_TABLE_REQUEST:
      return {
        isTimeTableUpdate: false,
        isTimeTableCreated: false,
        isTimetableGetByID: false,
        loading: true,
      };
      case CREATE_TIME_TABLE_SUCCESS:
        return {
          ...state,
          isTimeTableCreated: true,
          isTimeTableUpdate: false,
          isTimetableGetByID: false,
          loading: false,
          timeTable: action.payload,
        };
    case UPDATE_TIME_TABLE_SUCCESS:
      return {
        ...state,
        isTimeTableUpdate: true,
        loading: false,
        timeTable: action.payload,
      };
    
    case GET_TIME_TABLE_BY_ID_SUCCESS:
      return {
        ...state,
        isTimeTableUpdate: false,
        timeTableID: action.payload1,
        isTimetableGetByID: true,
        loading: false,
        timeTable: action.payload,
      };
    case CLEARE_TIMRTABLE_DATA:
      return {
        ...state,
        isTimeTableUpdate: false,
        timeTableID: "",
        isTimetableGetByID: false,
        loading: false,
        timeTable: {},
      };
    case UPDATE_TIME_TABLE_FAIL:
    case GET_TIME_TABLE_BY_ID_FAIL:
    case CREATE_TIME_TABLE_FAIL:
      return {
        ...state,
        isTimeTableUpdate: false,
        isTimetableGetByID: false,
        loading: false,
        isTimeTableCreated: false,
        error: action.payload,
      };

    case SET_TIME_TABLE_DATA:
      return {
        ...state,
        timeTable: action.payload,
        isTimeTableIDGeted: true,
        loading:false
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
