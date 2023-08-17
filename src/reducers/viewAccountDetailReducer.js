import { CLEAR_ERRORS } from "../constants/userConstants";
import {
  FIND_USERDETAIL_BY_ID_UPDATE_ROLE_FAIL,
  FIND_USERDETAIL_BY_ID_UPDATE_ROLE_REQUEST,
  FIND_USERDETAIL_BY_ID_UPDATE_ROLE_SUCCESSS,
  GET_USER_DETAIL_copy_FAIL,
  GET_USER_DETAIL_copy_REQUEST,
  GET_USER_DETAIL_copy_SUCCESSS,
  SET_USER_DETAIL_TO_VIEW_ACCOUNT,
} from "../constants/userDetailConstants";

export const viewAccountDetailReducer = (
  state = { accountDetail: {} },
  action
) => {
  switch (action.type) {
    case SET_USER_DETAIL_TO_VIEW_ACCOUNT:
      return {
        ...state,
        loading: false,
        isUserDataSeted: true,
        accountDetail: action.payload,
      };
    case GET_USER_DETAIL_copy_REQUEST:
    case FIND_USERDETAIL_BY_ID_UPDATE_ROLE_REQUEST:
      return {
        loading: true,
        isUsserDetailGainedForViewAccount: false,
      };
    case GET_USER_DETAIL_copy_SUCCESSS:
    case FIND_USERDETAIL_BY_ID_UPDATE_ROLE_SUCCESSS:
      return {
        ...state,
        loading: false,
        isUsserDetailGainedForViewAccount: true,
        accountDetail: action.payload,
      };
    case GET_USER_DETAIL_copy_FAIL:
    case FIND_USERDETAIL_BY_ID_UPDATE_ROLE_FAIL:
      return {
        ...state,
        loading: false,
        isUsserDetailGainedForViewAccount: false,
        accountDetail: null,
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
