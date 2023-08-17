import {
  DETAIL_FAIL,
  DETAIL_REQUEST,
  DETAIL_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/clgDetialConstants";

export const clgDetailReducer = (
  state = {
    clgDetail: {},
  },
  action
) => {
  switch (action.type) {
    case DETAIL_REQUEST:
      return {
        loadingClg: true,
        isValueUdated: false,
        isError:false
      };
    case DETAIL_SUCCESS:
      return {
        ...state,
        loadingClg: false,
        isValueUdated: true,
        clgDetail: action.payload,
        isError:false
      };
    case DETAIL_FAIL:
      return {
        ...state,
        loadingClg: false,
        isValueUdated: false,
        error: action.payload,
        isError:true
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
