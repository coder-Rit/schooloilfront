import axios from "axios";
import { MAKE_ALERT } from "../constants/alertConstants";
import { GET_ALL_DIVISION_SUCCESSS } from "../constants/divisionConstants";
import {
  CLEARE_TIMRTABLE_DATA,
  CREATE_TIME_TABLE_FAIL,
  CREATE_TIME_TABLE_REQUEST,
  CREATE_TIME_TABLE_SUCCESS,
  GET_TIME_TABLE_BY_ID_FAIL,
  GET_TIME_TABLE_BY_ID_REQUEST,
  GET_TIME_TABLE_BY_ID_SUCCESS,
  SET_TIME_TABLE_DATA,
  UPDATE_TIME_TABLE_FAIL,
  UPDATE_TIME_TABLE_REQUEST,
  UPDATE_TIME_TABLE_SUCCESS,
} from "../constants/timeTableConstants";

import Cookies from 'universal-cookie'
const cookies = new Cookies();
const token = cookies.get('token')
// create  time table
export const create_time_table = (timeTable,division, divisions) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_TIME_TABLE_REQUEST });
    const config = { Headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `https://schooloil-api.onrender.com/api/v1/timeTable/update/${token}`,
      timeTable,
      config
    );
console.log(data);

    localStorage.setItem(
      "TT_" + data.timeTable.timeTable._id,
      JSON.stringify(data.timeTable)
    );


    //updating timet table id in divisions
    let newData = divisions;
 
    await axios.post(
      `https://schooloil-api.onrender.com/api/v1/division/updateBydata/${token}`,
      {
        dataForFinding: division._id,
        dataForUpdate: { timeTableID:  data.timeTable._id},
      },
      config
    );

    let index = divisions.findIndex((x) => x._id == division._id);
    newData[index] = {
      ...division,
      timeTableID:  data.timeTable._id,
    };

    localStorage.setItem("listOFdivisions", JSON.stringify(newData));

    dispatch({
      type: GET_ALL_DIVISION_SUCCESSS,
      payload2: newData,
      payload: newData[index],
    });


    dispatch({ type: CREATE_TIME_TABLE_SUCCESS, payload: data.timeTable });
    dispatch({ type: MAKE_ALERT, payload1: 1,payload2:"Timetable created."  });
    
  } catch (error) {
    dispatch({
      type: CREATE_TIME_TABLE_FAIL,
      payload: error.response.data.msg,
    });
    dispatch({ type: MAKE_ALERT, payload1: 0,payload2:" Fail to create timetable."  });
  }
};

// update time table
export const update_time_table_by_id_in_data =
  (timeTableData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_TIME_TABLE_REQUEST });
      const config = { Headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `https://schooloil-api.onrender.com/api/v1/timeTable/update/${token}`,
        timeTableData,
        config
      );
      console.log(data);



      localStorage.setItem(
        "TT_" + timeTableData._id,
        JSON.stringify(timeTableData)
      );


     
      dispatch({
        type: UPDATE_TIME_TABLE_SUCCESS,
        payload: timeTableData,
      });
      dispatch({ type: MAKE_ALERT, payload1: 1,payload2:" Timetable updated successfully ."  });
    } catch (error) {
      dispatch({
        type: UPDATE_TIME_TABLE_FAIL,
        payload: error.response.data.msg,
      });
       dispatch({ type: MAKE_ALERT, payload1: 0,payload2:"Fail to update timetable."  });
    }
  };

//seting the time table is
export const setTimeTbaleDATA = (data) => async (dispatch) => {
  dispatch({ type: SET_TIME_TABLE_DATA, payload: data });
};

// get time table by id
export const get_time_table_by_id = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_TIME_TABLE_BY_ID_REQUEST });
    const { data } = await axios.get(`https://schooloil-api.onrender.com/api/v1/timeTable/${id}/${token}`);
    console.log(data);
    localStorage.removeItem(id);
    localStorage.setItem("TT_" + id, JSON.stringify(data.timeTable));

    dispatch({
      type: GET_TIME_TABLE_BY_ID_SUCCESS,
      payload: data.timeTable,
      payload1: id,
    });
  } catch (error) {
    dispatch({
      type: GET_TIME_TABLE_BY_ID_FAIL,
      payload: error.response.data.msg,
    });
  }
};

// get time table by id
export const set_local_timeTable = (timeTable) => async (dispatch) => {
  dispatch({
    type: GET_TIME_TABLE_BY_ID_SUCCESS,
    payload: timeTable,
    payload1: "",
  });
};

//make timetable empty

export const make_timeTable_empty = () => async (dispatch) => {
  dispatch({ type: CLEARE_TIMRTABLE_DATA });
};
