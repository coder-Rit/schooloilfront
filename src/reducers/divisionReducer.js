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
  FIND_DIVISION_BY_ID_AND_UPDATE_ENnUMBER_FAIL,
  FIND_DIVISION_BY_ID_AND_UPDATE_ENnUMBER_REQUEST,
  FIND_DIVISION_BY_ID_AND_UPDATE_ENnUMBER_SUCCESS,
  DELETE_DIVISION_REQUEST,
  DELETE_DIVISION_SUCCESS,
  DELETE_DIVISION_FAIL,
  CLEARE_DIVISION_DATA,
} from "../constants/divisionConstants";

export const divisionReducer = (
  state = {
    divisions: [],
    division: {},
    id: "",
  },
  action
) => {
  switch (action.type) {
    case UPDATE_DIVISION_REQUEST:
    case GET_ALL_DIVISION_REQUEST:
    case GET_DIVISION_BY_REQUEST:
    case FIND_DIVISION_BY_DATA_AND_UPDATE_REQUEST:
    case FIND_DIVISION_BY_ID_AND_UPDATE_ENnUMBER_REQUEST:
    case DELETE_DIVISION_REQUEST:
      return {
        loading: true,
        isDivisionUpdated: false,
        isIdUploaded: false,
        isTimeTableID_updatedIn_division: false,
        isdeleted:false,
        isDivisionDataStored: false,
      };
    case UPDATE_DIVISION_SUCCESS:
    case GET_ALL_DIVISION_SUCCESSS:
       return {
        ...state,
        loading: false,
        isDivisionUpdated: true,
        division: action.payload,
        divisions: action.payload2,
        isIdUploaded: false,
        isDivisionDataStored: false,

      };
    case CLEARE_DIVISION_DATA:
       return {
        ...state,
        loading: false,
        isDivisionUpdated: true,
        division: {},
        divisions: action.payload2,
        isIdUploaded: false,
        isDivisionDataStored: false,

      };
    case FIND_DIVISION_BY_DATA_AND_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDivisionUpdated: false, //special case
        isTimeTableID_updatedIn_division: true,
        division: action.payload,
        divisions: action.payload2,
      };
      case FIND_DIVISION_BY_ID_AND_UPDATE_ENnUMBER_SUCCESS:
        case GET_DIVISION_BY_SUCCESS:
          return {
            ...state,
            isDividionGeted: true,
         id: action.payload1,
        division: action.payload2,
         isIdUploaded: false,
        loading:false
      };
    case DELETE_DIVISION_SUCCESS:
      return {
        ...state,
        loading: false,
        isDivisionUpdated: true, 
        isTimeTableID_updatedIn_division: true,
        isdeleted:true
        
      };
    case UPDATE_DIVISION_FAIL:
    case GET_ALL_DIVISION_FAIL:
    case GET_DIVISION_BY_FAIL:
    case FIND_DIVISION_BY_DATA_AND_UPDATE_FAIL:
    case FIND_DIVISION_BY_ID_AND_UPDATE_ENnUMBER_FAIL:
    case DELETE_DIVISION_FAIL:
      return {
        ...state,
        loading: false,
        isDivisionUpdated: false,
        error: action.payload,
        isIdUploaded: false,
        isTimeTableID_updatedIn_division: false,
        isdeleted:false,
        isDivisionDataStored: false,

        

      };
      case "GET_ALL_DIVISION_FAIL2":
       return  {
        
        isDivisionUpdated:false
        }
    case GET_DIVISION_ID:
      return {
        ...state,
        id: action.payload1,
        isDividionGeted: false,
        isIdUploaded: true,
      };
    case SET_UPDATE_VAL:
      return {
        ...state,
        isDivisionUpdated: false,
      };

    case STORE_DIVISION_DATA:
      return {
        ...state,
        division: action.payload1,
        
        isDivisionDataStored: true,
        divisions:action.payload2,
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
