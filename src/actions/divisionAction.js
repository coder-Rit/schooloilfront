import {
  UPDATE_DIVISION_FAIL,
  UPDATE_DIVISION_REQUEST,
  UPDATE_DIVISION_SUCCESS,
  GET_ALL_DIVISION_FAIL,
  GET_ALL_DIVISION_REQUEST,
  GET_ALL_DIVISION_SUCCESSS,
  GET_DIVISION_ID,
  CLEAR_ERRORS,
  GET_DIVISION_BY_REQUEST,
  GET_DIVISION_BY_SUCCESS,
  GET_DIVISION_BY_FAIL,
  SET_UPDATE_VAL,
  FIND_DIVISION_BY_DATA_AND_UPDATE_REQUEST,
  FIND_DIVISION_BY_DATA_AND_UPDATE_SUCCESS,
  FIND_DIVISION_BY_DATA_AND_UPDATE_FAIL,
  STORE_DIVISION_DATA,
  FIND_DIVISION_BY_ID_AND_UPDATE_ENnUMBER_REQUEST,
  FIND_DIVISION_BY_ID_AND_UPDATE_ENnUMBER_SUCCESS,
  FIND_DIVISION_BY_ID_AND_UPDATE_ENnUMBER_FAIL,
  DELETE_DIVISION_REQUEST,
  DELETE_DIVISION_SUCCESS,
  DELETE_DIVISION_FAIL,
  CLEARE_DIVISION_DATA,
} from "../constants/divisionConstants";
import axios from "axios";
 import { MAKE_ALERT } from "../constants/alertConstants";
import Cookies from 'universal-cookie'
const cookies = new Cookies();
const token = cookies.get('token')

export const updateDivision =
  (divisionData, OldDivisionsList) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_DIVISION_REQUEST });
      const config = { Headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `/api/v1/division/update/${token}`,
        {divisionData},
        config
      );
      let newListOFDivision;
      let updatedList = OldDivisionsList;

      if (divisionData._id != null) {
        let index = OldDivisionsList.findIndex(
          (x) => x._id == divisionData._id
        );
        updatedList[index] = { ...divisionData, _id: data.division._id };

        newListOFDivision = [...updatedList];
      } else {
        newListOFDivision = [data.division, ...updatedList];
      }

      localStorage.setItem(
        "listOFdivisions",
        JSON.stringify(newListOFDivision)
      );

      console.log(data);
      dispatch({
        type: UPDATE_DIVISION_SUCCESS,
        payload: data.division,
        payload2: newListOFDivision,
      });
   
        
        dispatch({ type: MAKE_ALERT, payload1: 1,payload2:divisionData._id == null? "Division created":"Division updated"  });
       

    } catch (error) {
      dispatch({
        type: UPDATE_DIVISION_FAIL,
        payload: error.response.data.msg,
      });
      dispatch({ type: MAKE_ALERT, payload1: 0,payload2:divisionData._id == null? "Fail to create division":"Fail to update division"  });

 
    }
  };

export const getAllDivision = (params) => async (dispatch) => {
  const { course, clgShortName, year, department } = params;
  const config = { Headers: { "Content-Type": "application/json" } };

  try {
    dispatch({ type: GET_ALL_DIVISION_REQUEST });
    const { data } = await axios.post(
      `/api/v1/divisions/${token}`,
      { course, clgShortName, year, department,status:"inUse" },
      config
    );
    console.log(data);
    localStorage.setItem("listOFdivisions", JSON.stringify(data.divisions));
    let SelectedDivision = localStorage.getItem("SelectedDivision");
    if (SelectedDivision) {
      dispatch({
        type: GET_ALL_DIVISION_SUCCESSS,
        payload2: data.divisions,
        payload: SelectedDivision,
      });
    } else {
      localStorage.setItem(
        "SelectedDivision",
        JSON.stringify(data.divisions[0])
      );
      dispatch({
        type: GET_ALL_DIVISION_SUCCESSS,
        payload2: data.divisions,
        payload: data.divisions[0],
      });
    }
  } catch (error) {
    dispatch({ type: GET_ALL_DIVISION_FAIL, payload: error.response.data.msg });
  }
};
export const setAlldivisions = (divisionList, division) => async (dispatch) => {
  dispatch({
    type: GET_ALL_DIVISION_SUCCESSS,
    payload2: divisionList,
    payload: division,
  });
};

export const setDivisionID = (id) => async (dispatch) => {
  dispatch({ type: GET_DIVISION_ID, payload1: id });
};

export const getDivisionByID = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_DIVISION_BY_REQUEST });
    const { data } = await axios.get(`/api/v1/division/${id}/${token}`);
    console.log(data);
    dispatch({
      type: GET_DIVISION_BY_SUCCESS,
      payload2: data.division,
      payload1: id,
    });
  } catch (error) {
    dispatch({ type: GET_DIVISION_BY_FAIL, payload: error.response.data.msg });
  }
};

// setting valuse fo isDivisionUpdated: false for prevent form undef.map
export const change_updated_val = () => async (dispatch) => {
  dispatch({ type: SET_UPDATE_VAL });
};

//find division by data and update

export const find_division_by_data_and_update =
  (combinedData, divisions, index, type) => async (dispatch) => {
    try {
      dispatch({ type: FIND_DIVISION_BY_DATA_AND_UPDATE_REQUEST });
      const config = { Headers: { "Content-Type": "application/json" } };
      console.log(combinedData);

      let newData = divisions;
      if (type === "div") {
        const { data } = await axios.post(
          `/api/v1/division/updateBydata/${token}`,
          combinedData,
          config
        );

        if (typeof index !== "undefined") {
          console.log(index);
          if (divisions[index].status === "onBackUp") {
            newData[index].status = "inUse";
          }
          if (divisions[index].status === "inUse") {
            newData[index].status = "onBackUp";
          }
          console.log(newData);
          localStorage.setItem("listOFdivisions", JSON.stringify(newData));
          dispatch({
            type: GET_ALL_DIVISION_SUCCESSS,
            payload2: newData,
            payload: newData[0],
          });
          if (typeof index !== "undefined") {
            dispatch({ type: MAKE_ALERT, payload1: 1,payload2: "Division removed"  });

          }
          
          
        } else {
          dispatch({
            type: FIND_DIVISION_BY_DATA_AND_UPDATE_SUCCESS,
            payload: data.updatedDivision,
          });
          dispatch({ type: MAKE_ALERT, payload1: 0,payload2: "Fail to update division"  });
        }
      }

      // if (type === "timetable") {
      //   const { data } = await axios.post(
      //     `/api/v1/division/updateBydata`,
      //     {
      //       dataForFinding: combinedData.division._id,
      //       dataForUpdate: combinedData.dataForUpdate,
      //     },
      //     config
      //   );

      //   let index = divisions.findIndex(
      //     (x) => x._id == combinedData.division._id
      //   );
      //   newData[index] = {
      //     ...combinedData.division,
      //     timeTableID: combinedData.dataForUpdate.timeTableID,
      //   };

      //   localStorage.setItem("listOFdivisions", JSON.stringify(newData));

      // }
      // dispatch({
      //   type: FIND_DIVISION_BY_DATA_AND_UPDATE_SUCCESS,
      //   payload2: newData,
      //   payload: newData[index],
      // });

    } catch (error) {
      dispatch({
        type: FIND_DIVISION_BY_DATA_AND_UPDATE_FAIL,
        payload: error.response.data.msg,
      });
    }
  };

export const store_division_data =
  (division, divisions) => async (dispatch) => {
    dispatch({
      type: GET_DIVISION_BY_SUCCESS,
      payload1: divisions,
      payload2: division,
    });
  };

export const get_division_by_data = (givenData) => async (dispatch) => {
  const { div, course, clgShortName, year } = givenData;
  try {
    dispatch({ type: GET_DIVISION_BY_REQUEST });
    const { data } = await axios.get(
      `/api/v1/division/myDivision/${div}/${course}/${clgShortName}/${year}/${token}`
    );

    console.log(data);
    let div_with_selected = data.division;
    delete div_with_selected.EN;

    localStorage.removeItem("studentDivision");
    localStorage.setItem("studentDivision", JSON.stringify(div_with_selected));
    dispatch({ type: GET_DIVISION_BY_SUCCESS, payload2: div_with_selected });
  } catch (error) {
    dispatch({ type: GET_DIVISION_BY_FAIL, payload: error.response.data.msg });
  }
};

export const find_division_by_id_and_update_En_number =
  (id, enNumber) => async (dispatch) => {
    try {
      dispatch({ type: FIND_DIVISION_BY_ID_AND_UPDATE_ENnUMBER_REQUEST });
      const config = { Headers: { "Content-Type": "application/json" } };
      const data2 = {
        id,
        en: enNumber,
      };

      const { data } = await axios.put(
        `/api/v1/division/enupdate/${token}`,
        data2,
        config
      );
      console.log(data);
      dispatch({
        type: FIND_DIVISION_BY_ID_AND_UPDATE_ENnUMBER_SUCCESS,
        payload2: data.division,
      });
    } catch (error) {
      console.log(error.response.data);
      dispatch({
        type: FIND_DIVISION_BY_ID_AND_UPDATE_ENnUMBER_FAIL,
        payload: error.response.data.msg,
      });
    }
  };

export const delete_division = (id, divisions, index) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_DIVISION_REQUEST });

    const { data } = await axios.delete(`/api/v1/division/delete/${id}/${token}`);
    console.log(data);

    let newDivison = divisions;
    newDivison.splice(index, 1);

    dispatch({ type: DELETE_DIVISION_SUCCESS });
    dispatch({ type: GET_ALL_DIVISION_SUCCESSS, payload: newDivison });
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: DELETE_DIVISION_FAIL, payload: error.response.data.msg });
  }
};

//make divison empty

export const make_division_empty = (divisions) => async (dispatch) => {
  dispatch({ type: CLEARE_DIVISION_DATA, payload2: divisions });
};

export const clareErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
