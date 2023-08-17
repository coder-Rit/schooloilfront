import {
  CLEAR_ERRORS,
  CREATE_LECTURE_REQUEST,
  CREATE_LECTURE_SUCCESS,
  CREATE_LECTURE_FAIL,
  GET_ALL_LECTURE_REQUEST,
  GET_ALL_LECTURE_FAIL,
  GET_ALL_LECTURE_SUCCESS,
  PUSH_ID_AND_UPDATE_FAIL,
  PUSH_ID_AND_UPDATE_REQUEST,
  PUSH_ID_AND_UPDATE_SUCCESS,
  DELETE_LECUTURE_FAIL,
  DELETE_LECUTURE_SUCCESS,
  DELETE_LECUTURE_REQUEST,
  GET_LECUTURE_BY_DIVISION_ID_REQUEST,
  GET_LECUTURE_BY_DIVISION_ID_SUCCESS,
  GET_LECUTURE_BY_DIVISION_ID_FAIL,
  GET_LECUTURE_BY_ID_AND_REPLACE_PRESENTY_ARRAY_SUCCESS,
  GET_LECUTURE_BY_ID_AND_REPLACE_PRESENTY_ARRAY_REQUEST,
  GET_LECUTURE_BY_ID_AND_REPLACE_PRESENTY_ARRAY_FAIL,
} from "../constants/lectureConstant";

export const lectureReducer = (
  state = { lecture: {}, lectures: [] },
  action
) => {
  switch (action.type) {
    case CREATE_LECTURE_REQUEST:
    case GET_ALL_LECTURE_REQUEST:
    case PUSH_ID_AND_UPDATE_REQUEST:
    case DELETE_LECUTURE_REQUEST:
    case GET_LECUTURE_BY_DIVISION_ID_REQUEST:
    case GET_LECUTURE_BY_ID_AND_REPLACE_PRESENTY_ARRAY_REQUEST:
       return {
        loading: true,
        isLectureCreated: false,
        isAllLecturesGained: false,
        isIDPushInLecture: false,
        isLectureDeleted:false,
        isPresentyModified:false,
       
      };

    case CREATE_LECTURE_SUCCESS:
      return {
        ...state,
        loading: false,
        lecture: action.payload,
        isLectureCreated: true,
        isIDPushInLecture: false,
        isLectureDeleted:false,
        isPresentyModified:false
      };
    case GET_ALL_LECTURE_SUCCESS:
    case GET_LECUTURE_BY_DIVISION_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        lectures: action.payload,
        isLectureCreated: true,
        isAllLecturesGained: true,
        isIDPushInLecture: false,
        isLectureDeleted:false,
        isPresentyModified:false
      };

    case PUSH_ID_AND_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        lecture: action.payload,
        lectures:action.payload2,
        isLectureCreated: true,
        isAllLecturesGained: true,
        isIDPushInLecture: true,
        isLectureDeleted:false,
        isPresentyModified:false
      };
    case GET_LECUTURE_BY_ID_AND_REPLACE_PRESENTY_ARRAY_SUCCESS:
      return {
        ...state,
        loading: false,
        lecture: action.payload,
        lectures:action.payload2,
        isLectureCreated: true,
        isAllLecturesGained: true,
        isIDPushInLecture: true,
        isLectureDeleted:false,
        isPresentyModified:true
      };
      case DELETE_LECUTURE_SUCCESS:
        return {
          ...state,
          loading: false,
          lectures:action.payload2,
          isLectureCreated: true,
          isAllLecturesGained: true,
          isIDPushInLecture: true,
          isLectureDeleted:true,
          isPresentyModified:true
      };

    case CREATE_LECTURE_FAIL:
    case GET_ALL_LECTURE_FAIL:
    case PUSH_ID_AND_UPDATE_FAIL:
    case DELETE_LECUTURE_FAIL:
    case GET_LECUTURE_BY_DIVISION_ID_FAIL:
    case GET_LECUTURE_BY_ID_AND_REPLACE_PRESENTY_ARRAY_FAIL:
      return {
        ...state,
        loading: false,
        isLectureCreated: false,
        lecture: null,
        lectures: null,
        isAllLecturesGained: false,
        isIDPushInLecture: false,
        isLectureDeleted:false,
        isPresentyModified:false,
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
