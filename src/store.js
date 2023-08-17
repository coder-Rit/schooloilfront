import { applyMiddleware, combineReducers, createStore } from "redux";

import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./reducers/userReducer";
import { clgDetailReducer } from "./reducers/clgDetailReducer";
import { updateUserReducer } from "./reducers/updateUserReducer";
import { divisionReducer } from "./reducers/divisionReducer";
import { userListReducer } from "./reducers/allUserListReducer";
import { timeTableReducer } from "./reducers/timeTableReducer";
import { lectureReducer } from "./reducers/lectureReducer";
import { viewAccountDetailReducer } from "./reducers/viewAccountDetailReducer";
import { settingReducer } from "./reducers/settingReducer";
import { alertReducer } from "./reducers/alertReducer";

const combinedReducer = combineReducers({
  user: userReducer,
  clgDetail:clgDetailReducer,
  userDetail:updateUserReducer,
  division:divisionReducer,
  userList:userListReducer,
  timeTable:timeTableReducer,
  lecture:lectureReducer,
  accountDetail:viewAccountDetailReducer,
  settings:settingReducer,
  alert:alertReducer,
  
});
let initalState = {};

const middleWare = [thunk];

const store = createStore( 
  combinedReducer,
  initalState, 
  composeWithDevTools(applyMiddleware(...middleWare))
);
export default store;
