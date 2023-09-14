import React, { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unstable_HistoryRouter, useNavigate } from "react-router-dom";
import {
  find_division_by_data_and_update,
  getDivisionByID,
  setDivisionID,
  store_division_data,
} from "../../../actions/divisionAction";
import {
  create_time_table,
  get_time_table_by_id,
  setTimeTbaleID,
  set_local_timeTable,
  updateTimeTableAction,
  update_time_table_by_id_in_data,
} from "../../../actions/timeTableAction";
import Button from "@mui/material/Button";
import ToolsPage from "../toolsPage";
import AllDivisions from "../../divison/AllDivisions";
import HeaderComp from "../../layout/HeaderComp/HeaderComp";
import useSizing from "../../../hooks/useSizing";
import { ToastContainer, toast } from "react-toastify";
import {clearAlert} from "../../../actions/alertAction";

const UpdateTimeTable = (props) => {
  //ho0ks
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const windowSizing = useSizing()



  //use selector

  const { user } = useSelector((state) => state.user);
  const {
    timeTableID,
    timeTable,
    isTimeTableUpdate,
    isDivisionGetByID,
    isTimeTableIdGeted,
    isTimeTableCreated,
    isTimetableGetByID,
  } = useSelector((state) => state.timeTable);

  const {
    isDivisionUpdate,
    id,
    division,
    divisions,
    isIdUploaded,
    isDividionGeted,
    isDivisionDataStored,
    isTimeTableID_updatedIn_division,
  } = useSelector((state) => state.division);
  const { isUserDetailUpdated, userDetail } = useSelector(
    (state) => state.userDetail
  );

  //use state
  const [tabelState, set_tabelState] = useState({
    _id:"",
    time_lecture_1: "",
    time_lecture_2: "",
    time_lecture_3: "",
    time_lecture_4: "",
    time_lecture_5: "",
    time_lecture_6: "",
    time_lecture_7: "",
    time_lecture_8: "",
    time_lecture_9: "",
    time_lecture_10: "",
    Monday_lect_1: "NA",
    Tuesday_lect_1: "NA",
    Wednesday_lect_1: "NA",
    Thursday_lect_1: "NA",
    Friday_lect_1: "NA",
    Saturday_lect_1: "NA",
    Sunday_lect_1: "NA",
    Monday_lect_2: "NA",
    Tuesday_lect_2: "NA",
    Wednesday_lect_2: "NA",
    Thursday_lect_2: "NA",
    Friday_lect_2: "NA",
    Saturday_lect_2: "NA",
    Sunday_lect_2: "NA",
    Monday_lect_3: "NA",
    Tuesday_lect_3: "NA",
    Wednesday_lect_3: "NA",
    Thursday_lect_3: "NA",
    Friday_lect_3: "NA",
    Saturday_lect_3: "NA",
    Sunday_lect_3: "NA",
    Monday_lect_4: "NA",
    Tuesday_lect_4: "NA",
    Wednesday_lect_4: "NA",
    Thursday_lect_4: "NA",
    Friday_lect_4: "NA",
    Saturday_lect_4: "NA",
    Sunday_lect_4: "NA",
    Monday_lect_5: "NA",
    Tuesday_lect_5: "NA",
    Wednesday_lect_5: "NA",
    Thursday_lect_5: "NA",
    Friday_lect_5: "NA",
    Saturday_lect_5: "NA",
    Sunday_lect_5: "NA",
    Monday_lect_6: "NA",
    Tuesday_lect_6: "NA",
    Wednesday_lect_6: "NA",
    Thursday_lect_6: "NA",
    Friday_lect_6: "NA",
    Saturday_lect_6: "NA",
    Sunday_lect_6: "NA",
    Monday_lect_7: "NA",
    Tuesday_lect_7: "NA",
    Wednesday_lect_7: "NA",
    Thursday_lect_7: "NA",
    Friday_lect_7: "NA",
    Saturday_lect_7: "NA",
    Sunday_lect_7: "NA",
    Monday_lect_8: "NA",
    Tuesday_lect_8: "NA",
    Wednesday_lect_8: "NA",
    Thursday_lect_8: "NA",
    Friday_lect_8: "NA",
    Saturday_lect_8: "NA",
    Sunday_lect_8: "NA",
    Monday_lect_9: "NA",
    Tuesday_lect_9: "NA",
    Wednesday_lect_9: "NA",
    Thursday_lect_9: "NA",
    Friday_lect_9: "NA",
    Saturday_lect_9: "NA",
    Sunday_lect_9: "NA",
    Monday_lect_10: "NA",
    Tuesday_lect_10: "NA",
    Wednesday_lect_10: "NA",
    Thursday_lect_10: "NA",
    Friday_lect_10: "NA",
    Saturday_lect_10: "NA",
    Sunday_lect_10: "NA",
  });

  const [divisionData, set_divisionData] = useState({});
  const [subjectList, set_SubjectList] = useState([]);
  const { status, msg } = useSelector((state) => state.alert);


  // destructuring of data
  const {
    _id,
    time_lecture_1,
    time_lecture_2,
    time_lecture_3,
    time_lecture_4,
    time_lecture_5,
    time_lecture_6,
    time_lecture_7,
    time_lecture_8,
    time_lecture_9,
    time_lecture_10,
    Monday_lect_1,
    Tuesday_lect_1,
    Wednesday_lect_1,
    Thursday_lect_1,
    Friday_lect_1,
    Saturday_lect_1,
    Sunday_lect_1,
    Monday_lect_2,
    Tuesday_lect_2,
    Wednesday_lect_2,
    Thursday_lect_2,
    Friday_lect_2,
    Saturday_lect_2,
    Sunday_lect_2,
    Monday_lect_3,
    Tuesday_lect_3,
    Wednesday_lect_3,
    Thursday_lect_3,
    Friday_lect_3,
    Saturday_lect_3,
    Sunday_lect_3,
    Monday_lect_4,
    Tuesday_lect_4,
    Wednesday_lect_4,
    Thursday_lect_4,
    Friday_lect_4,
    Saturday_lect_4,
    Sunday_lect_4,
    Monday_lect_5,
    Tuesday_lect_5,
    Wednesday_lect_5,
    Thursday_lect_5,
    Friday_lect_5,
    Saturday_lect_5,
    Sunday_lect_5,
    Monday_lect_6,
    Tuesday_lect_6,
    Wednesday_lect_6,
    Thursday_lect_6,
    Friday_lect_6,
    Saturday_lect_6,
    Sunday_lect_6,
    Monday_lect_7,
    Tuesday_lect_7,
    Wednesday_lect_7,
    Thursday_lect_7,
    Friday_lect_7,
    Saturday_lect_7,
    Sunday_lect_7,
    Monday_lect_8,
    Tuesday_lect_8,
    Wednesday_lect_8,
    Thursday_lect_8,
    Friday_lect_8,
    Saturday_lect_8,
    Sunday_lect_8,
    Monday_lect_9,
    Tuesday_lect_9,
    Wednesday_lect_9,
    Thursday_lect_9,
    Friday_lect_9,
    Saturday_lect_9,
    Sunday_lect_9,
    Monday_lect_10,
    Tuesday_lect_10,
    Wednesday_lect_10,
    Thursday_lect_10,
    Friday_lect_10,
    Saturday_lect_10,
    Sunday_lect_10,
  } = tabelState;

  // code functioanlity
  const OnTimeTableValueChange = (e) => {
    set_tabelState({ ...tabelState, [e.target.name]: e.target.value });
  };

  //onlclick
  const updateTheTimeTable = (e) => {
    e.preventDefault();

    let array = [];
    //for converting time 12hours format to 24hours
    const convertTime12to24 = (time12h) => {
      const [time, modifier] = time12h.split(" ");

      let [hours, minutes] = time.split(":");

      if (hours === "12") {
        hours = "00";
      }

      if (modifier === "PM") {
        hours = parseInt(hours, 10) + 12;
      }

      return `${hours}:${minutes}`;
    };

    let perfectDataForUpdate = {
      postedBy: userDetail._id,
      clgShortName: userDetail.clgShortName,
      
      timeTable: {
        Time:
          time_lecture_1.length < 6
            ? {
                lecture1: time_lecture_1,
                lecture2: time_lecture_2,
                lecture3: time_lecture_3,
                lecture4: time_lecture_4,
                lecture5: time_lecture_5,
                lecture6: time_lecture_6,
                lecture7: time_lecture_7,
                lecture8: time_lecture_8,
                lecture9: time_lecture_9,
                lecture10: time_lecture_10,
              }
            : {
                lecture1: convertTime12to24(time_lecture_1),
                lecture2: convertTime12to24(time_lecture_2),
                lecture3: convertTime12to24(time_lecture_3),
                lecture4: convertTime12to24(time_lecture_4),
                lecture5: convertTime12to24(time_lecture_5),
                lecture6: convertTime12to24(time_lecture_6),
                lecture7: convertTime12to24(time_lecture_7),
                lecture8: convertTime12to24(time_lecture_8),
                lecture9: convertTime12to24(time_lecture_9),
                lecture10: convertTime12to24(time_lecture_10),
              },
        Monday: {
          lecture1: Monday_lect_1,
          lecture2: Monday_lect_2,
          lecture3: Monday_lect_3,
          lecture4: Monday_lect_4,
          lecture5: Monday_lect_5,
          lecture6: Monday_lect_6,
          lecture7: Monday_lect_7,
          lecture8: Monday_lect_8,
          lecture9: Monday_lect_9,
          lecture10: Monday_lect_10,
        },
        Tuesday: {
          lecture1: Tuesday_lect_1,
          lecture2: Tuesday_lect_2,
          lecture3: Tuesday_lect_3,
          lecture4: Tuesday_lect_4,
          lecture5: Tuesday_lect_5,
          lecture6: Tuesday_lect_6,
          lecture7: Tuesday_lect_7,
          lecture8: Tuesday_lect_8,
          lecture9: Tuesday_lect_9,
          lecture10: Tuesday_lect_10,
        },
        Wednesday: {
          lecture1: Wednesday_lect_1,
          lecture2: Wednesday_lect_2,
          lecture3: Wednesday_lect_3,
          lecture4: Wednesday_lect_4,
          lecture5: Wednesday_lect_5,
          lecture6: Wednesday_lect_6,
          lecture7: Wednesday_lect_7,
          lecture8: Wednesday_lect_8,
          lecture9: Wednesday_lect_9,
          lecture10: Wednesday_lect_10,
        },
        Thursday: {
          lecture1: Thursday_lect_1,
          lecture2: Thursday_lect_2,
          lecture3: Thursday_lect_3,
          lecture4: Thursday_lect_4,
          lecture5: Thursday_lect_5,
          lecture6: Thursday_lect_6,
          lecture7: Thursday_lect_7,
          lecture8: Thursday_lect_8,
          lecture9: Thursday_lect_9,
          lecture10: Thursday_lect_10,
        },
        Friday: {
          lecture1: Friday_lect_1,
          lecture2: Friday_lect_2,
          lecture3: Friday_lect_3,
          lecture4: Friday_lect_4,
          lecture5: Friday_lect_5,
          lecture6: Friday_lect_6,
          lecture7: Friday_lect_7,
          lecture8: Friday_lect_8,
          lecture9: Friday_lect_9,
          lecture10: Friday_lect_10,
        },
        Saturday: {
          lecture1: Saturday_lect_1,
          lecture2: Saturday_lect_2,
          lecture3: Saturday_lect_3,
          lecture4: Saturday_lect_4,
          lecture5: Saturday_lect_5,
          lecture6: Saturday_lect_6,
          lecture7: Saturday_lect_7,
          lecture8: Saturday_lect_8,
          lecture9: Saturday_lect_9,
          lecture10: Saturday_lect_10,
        },
        Sunday: {
          lecture1: Sunday_lect_1,
          lecture2: Sunday_lect_2,
          lecture3: Sunday_lect_3,
          lecture4: Sunday_lect_4,
          lecture5: Sunday_lect_5,
          lecture6: Sunday_lect_6,
          lecture7: Sunday_lect_7,
          lecture8: Sunday_lect_8,
          lecture9: Sunday_lect_9,
          lecture10: Sunday_lect_10,
        },
      },
    };

    

    //checking the time is in perfect manner

    if (
      perfectDataForUpdate.timeTable.Time.lecture1 <
        perfectDataForUpdate.timeTable.Time.lecture2 &&
      perfectDataForUpdate.timeTable.Time.lecture2 <
        perfectDataForUpdate.timeTable.Time.lecture3 &&
      perfectDataForUpdate.timeTable.Time.lecture3 <
        perfectDataForUpdate.timeTable.Time.lecture4 &&
      perfectDataForUpdate.timeTable.Time.lecture4 <
        perfectDataForUpdate.timeTable.Time.lecture5 &&
      perfectDataForUpdate.timeTable.Time.lecture5 <
        perfectDataForUpdate.timeTable.Time.lecture6 &&
      perfectDataForUpdate.timeTable.Time.lecture6 <
        perfectDataForUpdate.timeTable.Time.lecture7 &&
      perfectDataForUpdate.timeTable.Time.lecture7 <
        perfectDataForUpdate.timeTable.Time.lecture8 &&
      perfectDataForUpdate.timeTable.Time.lecture8 <
        perfectDataForUpdate.timeTable.Time.lecture9 &&
      perfectDataForUpdate.timeTable.Time.lecture9 <
        perfectDataForUpdate.timeTable.Time.lecture10
    ) {
      if (division.timeTableID === null) {
        dispatch(create_time_table(perfectDataForUpdate,division,divisions));
      } else {
        dispatch(update_time_table_by_id_in_data({_id,...perfectDataForUpdate}));
      }
    } else {
      console.log("somthing wrong with time");
    }

    //wrong way to use state isValues
    //do seprate reducer states for create and update and other things
  };

  //jsx components
  const SelectListOfSubject = () => {
    return subjectList.map((sub) => {
      return <option value={sub}>{sub}</option>;
    });
  };

  const notify_success = (msg) => toast.success(`  ${msg} 👍 `, props.alert);
  const notify_error = (msg) => toast.error(` ${msg}`, props.alert);

  //use effect

  // useEffect(() => {
  //   if (typeof isDivisionDataStored === "undefined") {
  //     let divisionDatatemp = window.sessionStorage.getItem("divisionData");
  //     divisionDatatemp = JSON.parse(divisionDatatemp);
  //     set_divisionData(divisionDatatemp);
  //     set_SubjectList(divisionDatatemp.subjects);
  //   }
  // }, []);

  useEffect(() => {
  
     let myTimeTable  = localStorage.getItem("TT_"+division.timeTableID)
     if (myTimeTable) {
      dispatch(set_local_timeTable( JSON.parse(myTimeTable)))
       
     }else{

       dispatch(get_time_table_by_id(division.timeTableID));
    }

  }, [props]);

  useEffect(() => { 
    //dispatch(setTimeTbaleDATA())

      let subListTemp = [...division.subjects, "Break", "NA"];
      set_SubjectList([...division.subjects, "Break", "NA"]);
      let localObj = {
        div: division.div,
        course: division.course,
        clgShortName: division.clgShortName,
        year: division.year,
        subjects: subListTemp,
      };
      set_divisionData(localObj);

  }, [ ]);


  


  useEffect(() => {
    if (isTimeTableCreated) {
      console.log(timeTable);
      
    //  dispatch(find_division_by_data_and_update({division, dataForUpdate: { timeTableID: timeTable._id } },divisions,0,"timetable"));
      
    }
  }, [isTimeTableCreated]);

  //geting time table if exit
  // useEffect(() => {
  //   if (window.sessionStorage.getItem("refreshCount") === null) {
  //     window.sessionStorage.setItem("refreshCount", 1);
  //   } else {
  //     window.sessionStorage.removeItem("refreshCount");
  //     window.sessionStorage.removeItem("divisionData");
  //     navigateTo("/user/tools/timeTable");
  //   }

  //   if (division.timeTableID !== null) {
  //     console.log("test 2");
  //     dispatch(get_time_table_by_id(division.timeTableID));
  //   }
  // }, []);

  useEffect(() => {
    if (isTimeTableID_updatedIn_division) {
      navigateTo("/user/tools/timeTable");
    }
    
  }, [isTimeTableID_updatedIn_division])
  


  //updating state

  useEffect(() => {
    if (isTimetableGetByID) {
      console.log("test 1");
      const {
        Time,
        Monday,
        Tuesday,
        Wednesday,
        Friday,
        Thursday,
        Saturday,
        Sunday,
      } = timeTable.timeTable;
       set_tabelState({
        _id:timeTable._id,
        time_lecture_1: Time.lecture1,
        time_lecture_2: Time.lecture2,
        time_lecture_3: Time.lecture3,
        time_lecture_4: Time.lecture4,
        time_lecture_5: Time.lecture5,
        time_lecture_6: Time.lecture6,
        time_lecture_7: Time.lecture7,
        time_lecture_8: Time.lecture8,
        time_lecture_9: Time.lecture9,
        time_lecture_10: Time.lecture10,
        Monday_lect_1: Monday.lecture1,
        Tuesday_lect_1: Tuesday.lecture1,
        Wednesday_lect_1: Wednesday.lecture1,
        Thursday_lect_1: Thursday.lecture1,
        Friday_lect_1: Friday.lecture1,
        Saturday_lect_1: Saturday.lecture1,
        Sunday_lect_1: Sunday.lecture1,
        Monday_lect_2: Monday.lecture2,
        Tuesday_lect_2: Tuesday.lecture2,
        Wednesday_lect_2: Wednesday.lecture2,
        Thursday_lect_2: Thursday.lecture2,
        Friday_lect_2: Friday.lecture2,
        Saturday_lect_2: Saturday.lecture2,
        Sunday_lect_2: Sunday.lecture2,
        Monday_lect_3: Monday.lecture3,
        Tuesday_lect_3: Tuesday.lecture3,
        Wednesday_lect_3: Wednesday.lecture3,
        Thursday_lect_3: Thursday.lecture3,
        Friday_lect_3: Friday.lecture3,
        Saturday_lect_3: Saturday.lecture3,
        Sunday_lect_3: Sunday.lecture3,
        Monday_lect_4: Monday.lecture4,
        Tuesday_lect_4: Tuesday.lecture4,
        Wednesday_lect_4: Wednesday.lecture4,
        Thursday_lect_4: Thursday.lecture4,
        Friday_lect_4: Friday.lecture4,
        Saturday_lect_4: Saturday.lecture4,
        Sunday_lect_4: Sunday.lecture4,
        Monday_lect_5: Monday.lecture5,
        Tuesday_lect_5: Tuesday.lecture5,
        Wednesday_lect_5: Wednesday.lecture5,
        Thursday_lect_5: Thursday.lecture5,
        Friday_lect_5: Friday.lecture5,
        Saturday_lect_5: Saturday.lecture5,
        Sunday_lect_5: Sunday.lecture5,
        Monday_lect_6: Monday.lecture6,
        Tuesday_lect_6: Tuesday.lecture6,
        Wednesday_lect_6: Wednesday.lecture6,
        Thursday_lect_6: Thursday.lecture6,
        Friday_lect_6: Friday.lecture6,
        Saturday_lect_6: Saturday.lecture6,
        Sunday_lect_6: Sunday.lecture6,
        Monday_lect_7: Monday.lecture7,
        Tuesday_lect_7: Tuesday.lecture7,
        Wednesday_lect_7: Wednesday.lecture7,
        Thursday_lect_7: Thursday.lecture7,
        Friday_lect_7: Friday.lecture7,
        Saturday_lect_7: Saturday.lecture7,
        Sunday_lect_7: Sunday.lecture7,
        Monday_lect_8: Monday.lecture8,
        Tuesday_lect_8: Tuesday.lecture8,
        Wednesday_lect_8: Wednesday.lecture8,
        Thursday_lect_8: Thursday.lecture8,
        Friday_lect_8: Friday.lecture8,
        Saturday_lect_8: Saturday.lecture8,
        Sunday_lect_8: Sunday.lecture8,
        Monday_lect_9: Monday.lecture9,
        Tuesday_lect_9: Tuesday.lecture9,
        Wednesday_lect_9: Wednesday.lecture9,
        Thursday_lect_9: Thursday.lecture9,
        Friday_lect_9: Friday.lecture9,
        Saturday_lect_9: Saturday.lecture9,
        Sunday_lect_9: Sunday.lecture9,
        Monday_lect_10: Monday.lecture10,
        Tuesday_lect_10: Tuesday.lecture10,
        Wednesday_lect_10: Wednesday.lecture10,
        Thursday_lect_10: Thursday.lecture10,
        Friday_lect_10: Friday.lecture10,
        Saturday_lect_10: Saturday.lecture10,
        Sunday_lect_10: Sunday.lecture10,
      });
    }
  }, [isTimetableGetByID]);

  useEffect(() => {
    if (status === 1) {
      notify_success(msg);
    }
    if (status === 0) {
      notify_error(msg);
    }
    dispatch(clearAlert())
  }, [status]);

  return (
    <Fragment>
       <div className="mobleDiv4865" style={props.main.main}>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={props.main.alertMode}
          />
          <HeaderComp type="Update Time Table"></HeaderComp>
        <div className="mobileDiv5656  flex flex_column gap10 "  style={props.main.sub_body}>
        {/* <div style={props.main.div_box} className="dic5656">Class {division.div}</div> */}
        <div className="tableDiv glassTheme overflow_X heigth400"  style={props.main.div_box}>
          <table>
            <tr>
              <th className="table_th">Time</th>
              <th className="table_th">Mon</th>
              <th className="table_th">Tue</th>
              <th className="table_th">Wed</th>
              <th className="table_th">Thu</th>
              <th className="table_th">Fri</th>
              <th className="table_th">Sat</th>
              <th className="table_th">Sun</th>
            </tr>
            <tr>
              <td>
                <input
                className="timeTableInput"
                  type="time"
                  value={tabelState.time_lecture_1}
                  onChange={OnTimeTableValueChange}
                  name="time_lecture_1"
                />
              </td>
              {/*time*/}
              <td>
                <select
                  className="timeTableInput"
                  name="Monday_lect_1"
                  value={tabelState.Monday_lect_1}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Tuesday_lect_1"
                  value={tabelState.Tuesday_lect_1}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Wednesday_lect_1"
                  value={tabelState.Wednesday_lect_1}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Thursday_lect_1"
                  value={tabelState.Thursday_lect_1}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Friday_lect_1"
                  value={tabelState.Friday_lect_1}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Saturday_lect_1"
                  value={tabelState.Saturday_lect_1}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Sunday_lect_1"
                  value={tabelState.Sunday_lect_1}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <input
                className="timeTableInput"
                  type="time"
                  value={tabelState.time_lecture_2}
                  onChange={OnTimeTableValueChange}
                  name="time_lecture_2"
                />
              </td>
              {/*time*/}
              <td>
                <select
                  className="timeTableInput"
                  name="Monday_lect_2"
                  value={tabelState.Monday_lect_2}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Tuesday_lect_2"
                  value={tabelState.Tuesday_lect_2}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Wednesday_lect_2"
                  value={tabelState.Wednesday_lect_2}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Thursday_lect_2"
                  value={tabelState.Thursday_lect_2}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Friday_lect_2"
                  value={tabelState.Friday_lect_2}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Saturday_lect_2"
                  value={tabelState.Saturday_lect_2}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Sunday_lect_2"
                  value={tabelState.Sunday_lect_2}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
            </tr>

            <tr>
              <td>
                <input
                className="timeTableInput"
                  type="time"
                  value={tabelState.time_lecture_3}
                  onChange={OnTimeTableValueChange}
                  name="time_lecture_3"
                />
              </td>
              {/*time*/}
              <td>
                <select
                  className="timeTableInput"
                  name="Monday_lect_3"
                  value={tabelState.Monday_lect_3}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Tuesday_lect_3"
                  value={tabelState.Tuesday_lect_3}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Wednesday_lect_3"
                  value={tabelState.Wednesday_lect_3}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Thursday_lect_3"
                  value={tabelState.Thursday_lect_3}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Friday_lect_3"
                  value={tabelState.Friday_lect_3}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Saturday_lect_3"
                  value={tabelState.Saturday_lect_3}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Sunday_lect_3"
                  value={tabelState.Sunday_lect_3}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <input
                className="timeTableInput"
                  type="time"
                  value={tabelState.time_lecture_4}
                  onChange={OnTimeTableValueChange}
                  name="time_lecture_4"
                />
              </td>
              {/*time*/}
              <td>
                <select
                  className="timeTableInput"
                  name="Monday_lect_4"
                  value={tabelState.Monday_lect_4}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Tuesday_lect_4"
                  value={tabelState.Tuesday_lect_4}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Wednesday_lect_4"
                  value={tabelState.Wednesday_lect_4}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Thursday_lect_4"
                  value={tabelState.Thursday_lect_4}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Friday_lect_4"
                  value={tabelState.Friday_lect_4}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Saturday_lect_4"
                  value={tabelState.Saturday_lect_4}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Sunday_lect_4"
                  value={tabelState.Sunday_lect_4}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <input
                className="timeTableInput"
                  type="time"
                  value={tabelState.time_lecture_5}
                  onChange={OnTimeTableValueChange}
                  name="time_lecture_5"
                />
              </td>
              {/*time*/}
              <td>
                <select
                  className="timeTableInput"
                  name="Monday_lect_5"
                  value={tabelState.Monday_lect_5}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Tuesday_lect_5"
                  value={tabelState.Tuesday_lect_5}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Wednesday_lect_5"
                  value={tabelState.Wednesday_lect_5}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Thursday_lect_5"
                  value={tabelState.Thursday_lect_5}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Friday_lect_5"
                  value={tabelState.Friday_lect_5}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Saturday_lect_5"
                  value={tabelState.Saturday_lect_5}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Sunday_lect_5"
                  value={tabelState.Sunday_lect_5}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <input
                className="timeTableInput"
                  type="time"
                  value={tabelState.time_lecture_6}
                  onChange={OnTimeTableValueChange}
                  name="time_lecture_6"
                />
              </td>
              {/*time*/}
              <td>
                <select
                  className="timeTableInput"
                  name="Monday_lect_6"
                  value={tabelState.Monday_lect_6}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Tuesday_lect_6"
                  value={tabelState.Tuesday_lect_6}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Wednesday_lect_6"
                  value={tabelState.Wednesday_lect_6}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Thursday_lect_6"
                  value={tabelState.Thursday_lect_6}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Friday_lect_6"
                  value={tabelState.Friday_lect_6}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Saturday_lect_6"
                  value={tabelState.Saturday_lect_6}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Sunday_lect_6"
                  value={tabelState.Sunday_lect_6}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <input
                className="timeTableInput"
                  type="time"
                  value={tabelState.time_lecture_7}
                  onChange={OnTimeTableValueChange}
                  name="time_lecture_7"
                />
              </td>
              {/*time*/}
              <td>
                <select
                  className="timeTableInput"
                  name="Monday_lect_7"
                  value={tabelState.Monday_lect_7}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Tuesday_lect_7"
                  value={tabelState.Tuesday_lect_7}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Wednesday_lect_7"
                  value={tabelState.Wednesday_lect_7}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Thursday_lect_7"
                  value={tabelState.Thursday_lect_7}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Friday_lect_7"
                  value={tabelState.Friday_lect_7}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Saturday_lect_7"
                  value={tabelState.Saturday_lect_7}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Sunday_lect_7"
                  value={tabelState.Sunday_lect_7}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <input
                className="timeTableInput"
                  type="time"
                  value={tabelState.time_lecture_8}
                  onChange={OnTimeTableValueChange}
                  name="time_lecture_8"
                />
              </td>
              {/*time*/}
              <td>
                <select
                  className="timeTableInput"
                  name="Monday_lect_8"
                  value={tabelState.Monday_lect_8}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Tuesday_lect_8"
                  value={tabelState.Tuesday_lect_8}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Wednesday_lect_8"
                  value={tabelState.Wednesday_lect_8}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Thursday_lect_8"
                  value={tabelState.Thursday_lect_8}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Friday_lect_8"
                  value={tabelState.Friday_lect_8}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Saturday_lect_8"
                  value={tabelState.Saturday_lect_8}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Sunday_lect_8"
                  value={tabelState.Sunday_lect_8}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <input
                className="timeTableInput"
                  type="time"
                  value={tabelState.time_lecture_9}
                  onChange={OnTimeTableValueChange}
                  name="time_lecture_9"
                />
              </td>
              {/*time*/}
              <td>
                <select
                  className="timeTableInput"
                  name="Monday_lect_9"
                  value={tabelState.Monday_lect_9}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Tuesday_lect_9"
                  value={tabelState.Tuesday_lect_9}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Wednesday_lect_9"
                  value={tabelState.Wednesday_lect_9}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Thursday_lect_9"
                  value={tabelState.Thursday_lect_9}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Friday_lect_9"
                  value={tabelState.Friday_lect_9}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Saturday_lect_9"
                  value={tabelState.Saturday_lect_9}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Sunday_lect_9"
                  value={tabelState.Sunday_lect_9}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <input
                className="timeTableInput"
                  type="time"
                  value={tabelState.time_lecture_10}
                  onChange={OnTimeTableValueChange}
                  name="time_lecture_10"
                />
              </td>
              {/*time*/}
              <td>
                <select
                  className="timeTableInput"
                  name="Monday_lect_10"
                  value={tabelState.Monday_lect_10}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Tuesday_lect_10"
                  value={tabelState.Tuesday_lect_10}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Wednesday_lect_10"
                  value={tabelState.Wednesday_lect_10}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Thursday_lect_10"
                  value={tabelState.Thursday_lect_10}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Friday_lect_10"
                  value={tabelState.Friday_lect_10}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Saturday_lect_10"
                  value={tabelState.Saturday_lect_10}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
              <td>
                <select
                  className="timeTableInput"
                  name="Sunday_lect_10"
                  value={tabelState.Sunday_lect_10}
                  onChange={OnTimeTableValueChange}
                >
                  <SelectListOfSubject />
                </select>
              </td>
            </tr>
          </table>
        </div>
          <div>
            <button
            className="btn_ligth"
              onClick={updateTheTimeTable}
            >
              Update
            </button>
          </div>
        <div className="fakeDiv_mobileAt_updateTimeTabl"></div>
        </div>
        <ToolsPage></ToolsPage>
      </div>
    </Fragment>

  );
};

export default UpdateTimeTable;
