import axios from "axios";
import { MAKE_ALERT } from "../constants/alertConstants";
import {
  CREATE_LECTURE_FAIL,
  CREATE_LECTURE_REQUEST,
  CREATE_LECTURE_SUCCESS,
  DELETE_LECUTURE_FAIL,
  DELETE_LECUTURE_REQUEST,
  DELETE_LECUTURE_SUCCESS,
  GET_ALL_LECTURE_FAIL,
  GET_ALL_LECTURE_REQUEST,
  GET_ALL_LECTURE_SUCCESS,
  GET_LECUTURE_BY_ID_AND_REPLACE_PRESENTY_ARRAY_FAIL,
  GET_LECUTURE_BY_ID_AND_REPLACE_PRESENTY_ARRAY_REQUEST,
  GET_LECUTURE_BY_ID_AND_REPLACE_PRESENTY_ARRAY_SUCCESS,
  PUSH_ID_AND_UPDATE_FAIL,
  PUSH_ID_AND_UPDATE_REQUEST,
  PUSH_ID_AND_UPDATE_SUCCESS,
} from "../constants/lectureConstant"; 
import Cookies from 'universal-cookie'
const cookies = new Cookies();
const token = cookies.get('token');
const baseUrl = `https://schooloil-api.onrender.com`


// create create_lecture
export const create_lecture = (lectureData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_LECTURE_REQUEST });
    const config = { Headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `https://schooloil-api.onrender.com/api/v1/user/genrateL`,
      {...lectureData,token},
      config
    );
    console.log(data);
    dispatch({ type: CREATE_LECTURE_SUCCESS, payload: data.lecture });
    dispatch({ type: MAKE_ALERT, payload1: 1,payload2:"Lecture created" });

  } catch (error) {
    dispatch({
      type: CREATE_LECTURE_FAIL,
      payload: error.response.data.msg,
    });
    dispatch({ type: MAKE_ALERT, payload1: 0,payload2:"Fail to create lecture" });

  }
};

// create get all recent lectures
export const get_all_recent_lectures = (givenData,howMuchOld) => async (dispatch) => {
  const { id, from, to } = givenData;

  try {
    dispatch({ type: GET_ALL_LECTURE_REQUEST });

    const { data } = await axios.post(
      `https://schooloil-api.onrender.com/api/v1/user/getAllLectures/${id}/${from}/${to}`,{token}
    ); 
    console.log(data);

     console.log(howMuchOld);
     sessionStorage.setItem(howMuchOld,JSON.stringify(data.lectures))

    dispatch({ type: GET_ALL_LECTURE_SUCCESS, payload: data.lectures });
  } catch (error) {
    dispatch({
      type: GET_ALL_LECTURE_FAIL,
      payload: error.response.data.msg,
    });
  }
};

  

// create get all recent lectures
export const store_local_lectures_data = (lectures) => async (dispatch) => {
  
    dispatch({ type: GET_ALL_LECTURE_SUCCESS, payload: lectures });
  
};


// create get all recent lectures
export const add_user_to_mark_attendace =
  ({ updater, update }, lectures) =>
  async (dispatch) => {
    try {
      dispatch({ type: PUSH_ID_AND_UPDATE_REQUEST });

      const { data } = await axios.post(
        `https://schooloil-api.onrender.com/api/v1/user/markMyAttendance/${updater}/${update}`,{token}
      );
      console.log(data);
      dispatch({
        type: PUSH_ID_AND_UPDATE_SUCCESS,
        payload: data.lecture,
        payload2: lectures,
      });
    } catch (error) {
      dispatch({
        type: PUSH_ID_AND_UPDATE_FAIL,
        payload: error.response.data.msg,
      });
    }
  };

// update lecture attendce manualy
export const find_lecture_by_id_and_replace_attendance =
  (id, array, lectures) => async (dispatch) => {
    try {
      dispatch({ type: GET_LECUTURE_BY_ID_AND_REPLACE_PRESENTY_ARRAY_REQUEST });
      const config = { Headers: { "Content-Type": "application/json" } };

      const { data } = await axios.put(
        `https://schooloil-api.onrender.com/api/v1/user/attendance/repace`,
        { id, array,token },
        config
      );

      const index = lectures.findIndex((data) => data._id === id);
      let lect = lectures;    
      lect[index] = data.lecture;
      console.log(lectures);
      console.log(lect);

      console.log(data);
      dispatch({
        type: GET_LECUTURE_BY_ID_AND_REPLACE_PRESENTY_ARRAY_SUCCESS,
        payload: data.lecture,
        payload2: lect,
      });
    dispatch({ type: MAKE_ALERT, payload1: 1,payload2:"Attendance updated successfully" });


    } catch (error) {
      dispatch({
        type: GET_LECUTURE_BY_ID_AND_REPLACE_PRESENTY_ARRAY_FAIL,
        payload: error.response.data.msg,
      });
    dispatch({ type: MAKE_ALERT, payload1: 0,payload2:"Fail to mark attendance" });

    }
  };

//update lecture
export const find_lecture_by_id_and_update_info =
  (update, lectures) => async (dispatch) => {
    try {
      dispatch({ type: GET_LECUTURE_BY_ID_AND_REPLACE_PRESENTY_ARRAY_REQUEST });
      const config = { Headers: { "Content-Type": "application/json" } };

      console.log(update);

      const { data } = await axios.put(
        `https://schooloil-api.onrender.com/api/v1/user/lecture/info/udpate`,
        {...update,token},
        config
      );

      console.log(data);
      const index = lectures.findIndex((datab) => datab._id === update.id);
      let lect = lectures;
      lect[index] = data.lecture;
      console.log(lectures);
      console.log(lect);
      dispatch({
        type: GET_LECUTURE_BY_ID_AND_REPLACE_PRESENTY_ARRAY_SUCCESS,
        payload: data.lecture,
        payload2: lect,
      });
      dispatch({ type: MAKE_ALERT, payload1: 1,payload2:"lecture details updated" });


    } catch (error) {
      dispatch({
        type: GET_LECUTURE_BY_ID_AND_REPLACE_PRESENTY_ARRAY_FAIL,
        payload: error.response.data.msg,
      });
      dispatch({ type: MAKE_ALERT, payload1: 0,payload2:"Fail to update lecture" });

    }
  };

// create get all recent lectures
export const delete_created_lecture = (id, lectures) => async (dispatch) => {
   try {
    dispatch({ type: DELETE_LECUTURE_REQUEST });
   const { data } = await axios.post(
    `https://schooloil-api.onrender.com/api/v1/user/lecture/${id}`,{token} 
    );

    const index = lectures.findIndex((datab) => {
      return datab._id === id;
    });
    let lects = lectures;
    lects.splice(index, 1);
   

    dispatch({ type: DELETE_LECUTURE_SUCCESS, payload2: lects });
    dispatch({ type: MAKE_ALERT, payload1: 1,payload2:"Lecture deleted successfully" });

  } catch (error) {
    dispatch({
      type: DELETE_LECUTURE_FAIL,
      payload: error.response.data.msg,
    });
    dispatch({ type: MAKE_ALERT, payload1: 0,payload2:"Fail to delete" });

  }
};
