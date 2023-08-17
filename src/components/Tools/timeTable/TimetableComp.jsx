import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_time_table_by_id, set_local_timeTable } from "../../../actions/timeTableAction";
import HeaderComp from "../../layout/HeaderComp/HeaderComp";
import Loader from "../../layout/Loader/Loader";
import CreateLecture from "../lectures/CreateLecture";
import Note from "../../layout/note/Note"
import "./timeTable.css";
import CachedIcon from '@mui/icons-material/Cached';

const TimetableComp = (props) => {
  //hooks
  const dispatch = useDispatch();

  //selectors
  const { timeTable, isTimetableGetByID } = useSelector(
    (state) => state.timeTable
  );
  const { isDivisionUpdated, divisions, isDividionGeted, division } =
    useSelector((state) => state.division);

  //uesState
  const [current_lecture_className, setcurrent_lecture_className] =
    useState("");
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [currentDay, set_currentDay] = useState("");
  const [is_User_is_CR, set_is_User_is_CR] = useState(false);

  //variables
  const d = new Date();
  let day = d.getDay();
  let hours = d.getHours();
  let min = d.getMinutes();
  let timeString = d.toTimeString();
  console.log(d.getDate());
  console.log(d.toTimeString());
  let currentTime = timeString.slice(0, 5);

  //code feactures
  // const createLectureBTN = (e) => {
  //   console.log(props);
  //      e.preventDefault()
  //   if (props.props.userDetail.role === "CR") {
  //     set_is_User_is_CR(true);
  //   } else {
  //     set_is_User_is_CR(false);
  //   }
  // };

  //reload lectres 
  const laodTimeTable=()=>{
    dispatch(get_time_table_by_id(props.props.id));
  }

  //useEffects

  useEffect(() => {
    console.log(props);
    console.log(timeTable);
     let myTimeTable  = localStorage.getItem("TT_"+props.props.id)
     if (myTimeTable) {
      console.log("findOut");

      console.log(JSON.parse(myTimeTable));
      dispatch(set_local_timeTable( JSON.parse(myTimeTable)))
       
     }else{

       dispatch(get_time_table_by_id(props.props.id));
    }

  }, [props]);

  useEffect(() => {
    if (day === 0) {
      set_currentDay("sunday");
    } else if (day === 1) {
      set_currentDay("monday");
    } else if (day === 2) {
      set_currentDay("tuesday");
    } else if (day === 3) {
      set_currentDay("wednesday");
    } else if (day === 4) {
      set_currentDay("thursday"); 
    } else if (day === 5) {
      set_currentDay("friday");
    } else if (day === 6) {
      set_currentDay("saturday");
    }

    
  }, [isTimetableGetByID]);

  useEffect(() => {
    if (isTimetableGetByID) {
       if (
        currentTime >= timeTable.timeTable.Time.lecture1 &&
        currentTime < timeTable.timeTable.Time.lecture2
      ) {
        setcurrent_lecture_className(currentDay + "lecture1");
      } else if (
        currentTime >= timeTable.timeTable.Time.lecture2 &&
        currentTime < timeTable.timeTable.Time.lecture3
      ) {
        setcurrent_lecture_className(currentDay + "lecture2");
      } else if (
        currentTime >= timeTable.timeTable.Time.lecture3 &&
        currentTime < timeTable.timeTable.Time.lecture4
      ) {
        setcurrent_lecture_className(currentDay + "lecture3");
      } else if (
        currentTime >= timeTable.timeTable.Time.lecture4 &&
        currentTime < timeTable.timeTable.Time.lecture5
      ) {
        setcurrent_lecture_className(currentDay + "lecture4");
      } else if (
        currentTime >= timeTable.timeTable.Time.lecture5 &&
        currentTime < timeTable.timeTable.Time.lecture6
      ) {
        setcurrent_lecture_className(currentDay + "lecture5");
      } else if (
        currentTime >= timeTable.timeTable.Time.lecture6 &&
        currentTime < timeTable.timeTable.Time.lecture7
      ) {
        setcurrent_lecture_className(currentDay + "lecture6");
      } else if (
        currentTime >= timeTable.timeTable.Time.lecture7 &&
        currentTime < timeTable.timeTable.Time.lecture8
      ) {
        setcurrent_lecture_className(currentDay + "lecture7");
      } else if (
        currentTime >= timeTable.timeTable.Time.lecture8 &&
        currentTime < timeTable.timeTable.Time.lecture9
      ) {
        setcurrent_lecture_className(currentDay + "lecture8");
      } else if (
        currentTime >= timeTable.timeTable.Time.lecture9 &&
        currentTime < timeTable.timeTable.Time.lecture10
      ) {
        setcurrent_lecture_className(currentDay + "lecture9");
      } else if (currentTime >= timeTable.timeTable.Time.lecture10) {
        setcurrent_lecture_className(currentDay + "lecture10");
      }
    }
  }, [isTimetableGetByID]);
 
  return (
    <>
     
        <div className={`${props.classes} top50  `}>
          <div className="flex_spaceBtw_center">
          <div style={props.props.main.div_box} className="dic5656">Class {props.props.class}</div>
          <div ><CachedIcon className="fontLink" onClick={laodTimeTable} style={props.props.main.fontColor} ></CachedIcon></div>
          </div>
          <div style={props.props.main.div_box} className="glassTheme" >

          {
            isTimetableGetByID?(
            <table className="timeTableDiv " >
            <tr>
              <th>Time</th>
              <th
                className={
                  currentDay === "monday" ? "currentDay" : `notCurrentDay`
                }
              >
                Mon
              </th>
              <th
                className={
                  currentDay === "tuesday" ? "currentDay" : `notCurrentDay`
                }
              >
                Tue
              </th>
              <th
                className={
                  currentDay === "wednesday" ? "currentDay" : `notCurrentDay`
                }
              >
                Wed
              </th>
              <th
                className={
                  currentDay === "thursday" ? "currentDay" : `notCurrentDay`
                }
              >
                Thu
              </th>
              <th
                className={
                  currentDay === "friday" ? "currentDay" : `notCurrentDay`
                }
              >
                Fri
              </th>
              <th
                className={
                  currentDay === "saturday" ? "currentDay" : `notCurrentDay`
                }
              >
                Sat
              </th>
              <th
                className={
                  currentDay === "sunday" ? "currentDay" : `notCurrentDay`
                }
              >
                Sun
              </th>
            </tr>
            <tr style={props.props.main.low_Resolution_font}>
              <td> 
                <span>{timeTable.timeTable.Time.lecture1}</span>
              </td>
              <td
                className={
                  currentDay === "monday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  
                  className={
                    current_lecture_className === "mondaylecture1"
                      ? "p0 timeTableInput"
                      : `lectureSpan  `
                  }
                >
                  {timeTable.timeTable.Monday.lecture1}
                </span>
              </td>
              <td
                className={
                  currentDay === "tuesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "tuesdaylecture1"
                      ? "p0"
                      : ` lectureSpan`
                  }
                >
                  {timeTable.timeTable.Tuesday.lecture1}
                </span>
              </td>
              <td
                className={
                  currentDay === "wednesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "wednesdaylecture1"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Wednesday.lecture1}
                </span>
              </td>
              <td
                className={
                  currentDay === "thursday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "thursdaylecture1"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Thursday.lecture1}
                </span>
              </td>
              <td
                className={
                  currentDay === "friday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "fridaylecture1"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Friday.lecture1}
                </span>
              </td>
              <td
                className={
                  currentDay === "saturday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "saturdaylecture1"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Saturday.lecture1}
                </span>
              </td>
              <td
                className={
                  currentDay === "sunday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "slecture1"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Sunday.lecture1}
                </span>
              </td>
            </tr>
            <tr style={props.props.main.low_Resolution_font}>
              <td>
                <span>{timeTable.timeTable.Time.lecture2}</span>
              </td>
              <td
                className={
                  currentDay === "monday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "mondaylecture2"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Monday.lecture2}
                </span>
              </td>
              <td
                className={
                  currentDay === "tuesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "tuesdaylecture2"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Tuesday.lecture2}
                </span>
              </td>
              <td
                className={
                  currentDay === "wednesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "wednesdaylecture2"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Wednesday.lecture2}
                </span>
              </td>
              <td
                className={
                  currentDay === "thursday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "thursdaylecture2"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Thursday.lecture2}
                </span>
              </td>
              <td
                className={
                  currentDay === "friday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "fridaylecture2"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Friday.lecture2}
                </span>
              </td>
              <td
                className={
                  currentDay === "saturday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "saturdaylecture2"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Saturday.lecture2}
                </span>
              </td>
              <td
                className={
                  currentDay === "sunday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "slecture2"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Sunday.lecture2}
                </span>
              </td>
              <td></td>
            </tr>
            <tr style={props.props.main.low_Resolution_font}>
              <td>
                <span>{timeTable.timeTable.Time.lecture3}</span>
              </td>
              <td
                className={
                  currentDay === "monday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "mondaylecture3"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Monday.lecture3}
                </span>
              </td>
              <td
                className={
                  currentDay === "tuesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "tuesdaylecture3"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Tuesday.lecture3}
                </span>
              </td>
              <td
                className={
                  currentDay === "wednesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "wednesdaylecture3"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Wednesday.lecture3}
                </span>
              </td>
              <td
                className={
                  currentDay === "thursday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "thursdaylecture3"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Thursday.lecture3}
                </span>
              </td>
              <td
                className={
                  currentDay === "friday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "fridaylecture3"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Friday.lecture3}
                </span>
              </td>
              <td
                className={
                  currentDay === "saturday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "saturdaylecture3"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Saturday.lecture3}
                </span>
              </td>
              <td
                className={
                  currentDay === "sunday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "slecture3"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Sunday.lecture3}
                </span>
              </td>
              <td></td>
            </tr>
            <tr style={props.props.main.low_Resolution_font}>
              <td>
                <span>{timeTable.timeTable.Time.lecture4}</span>
              </td>
              <td
                className={
                  currentDay === "monday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "mondaylecture4"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Monday.lecture4}
                </span>
              </td>
              <td
                className={
                  currentDay === "tuesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "tuesdaylecture4"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Tuesday.lecture4}
                </span>
              </td>
              <td
                className={
                  currentDay === "wednesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "wednesdaylecture4"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Wednesday.lecture4}
                </span>
              </td>
              <td
                className={
                  currentDay === "thursday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "thursdaylecture4"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Thursday.lecture4}
                </span>
              </td>
              <td
                className={
                  currentDay === "friday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "fridaylecture4"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Friday.lecture4}
                </span>
              </td>
              <td
                className={
                  currentDay === "saturday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "saturdaylecture4"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Saturday.lecture4}
                </span>
              </td>
              <td
                className={
                  currentDay === "sunday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "slecture4"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Sunday.lecture4}
                </span>
              </td>
              <td></td>
            </tr>
            <tr style={props.props.main.low_Resolution_font}>
              <td>
                <span>{timeTable.timeTable.Time.lecture5}</span>
              </td>
              <td
                className={
                  currentDay === "monday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "mondaylecture5"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Monday.lecture5}
                </span>
              </td>
              <td
                className={
                  currentDay === "tuesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "tuesdaylecture5"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Tuesday.lecture5}
                </span>
              </td>
              <td
                className={
                  currentDay === "wednesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "wednesdaylecture5"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Wednesday.lecture5}
                </span>
              </td>
              <td
                className={
                  currentDay === "thursday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "thursdaylecture5"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Thursday.lecture5}
                </span>
              </td>
              <td
                className={
                  currentDay === "friday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "fridaylecture5"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Friday.lecture5}
                </span>
              </td>
              <td
                className={
                  currentDay === "saturday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "saturdaylecture5"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Saturday.lecture5}
                </span>
              </td>
              <td
                className={
                  currentDay === "sunday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "slecture5"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Sunday.lecture5}
                </span>
              </td>
              <td></td>
            </tr>
            <tr style={props.props.main.low_Resolution_font}>
              <td>
                <span>{timeTable.timeTable.Time.lecture6}</span>
              </td>
              <td
                className={
                  currentDay === "monday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "mondaylecture6"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Monday.lecture6}
                </span>
              </td>
              <td
                className={
                  currentDay === "tuesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "tuesdaylecture6"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Tuesday.lecture6}
                </span>
              </td>
              <td
                className={
                  currentDay === "wednesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "wednesdaylecture6"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Wednesday.lecture6}
                </span>
              </td>
              <td
                className={
                  currentDay === "thursday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "thursdaylecture6"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Thursday.lecture6}
                </span>
              </td>
              <td
                className={
                  currentDay === "friday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "fridaylecture6"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Friday.lecture6}
                </span>
              </td>
              <td
                className={
                  currentDay === "saturday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "saturdaylecture6"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Saturday.lecture6}
                </span>
              </td>
              <td
                className={
                  currentDay === "sunday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "slecture6"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Sunday.lecture6}
                </span>
              </td>
              <td></td>
            </tr>
            <tr style={props.props.main.low_Resolution_font}>
              <td>
                <span>{timeTable.timeTable.Time.lecture7}</span>
              </td>
              <td
                className={
                  currentDay === "monday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "mondaylecture7"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Monday.lecture7}
                </span>
              </td>
              <td
                className={
                  currentDay === "tuesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "tuesdaylecture7"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Tuesday.lecture7}
                </span>
              </td>
              <td
                className={
                  currentDay === "wednesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "wednesdaylecture7"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Wednesday.lecture7}
                </span>
              </td>
              <td
                className={
                  currentDay === "thursday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "thursdaylecture7"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Thursday.lecture7}
                </span>
              </td>
              <td
                className={
                  currentDay === "friday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "fridaylecture7"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Friday.lecture7}
                </span>
              </td>
              <td
                className={
                  currentDay === "saturday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "saturdaylecture7"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Saturday.lecture7}
                </span>
              </td>
              <td
                className={
                  currentDay === "sunday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "slecture7"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Sunday.lecture7}
                </span>
              </td>
              <td></td>
            </tr>
            <tr style={props.props.main.low_Resolution_font}>
              <td>
                <span>{timeTable.timeTable.Time.lecture8}</span>
              </td>
              <td
                className={
                  currentDay === "monday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "mondaylecture8"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Monday.lecture8}
                </span>
              </td>
              <td
                className={
                  currentDay === "tuesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "tuesdaylecture8"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Tuesday.lecture8}
                </span>
              </td>
              <td
                className={
                  currentDay === "wednesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "wednesdaylecture8"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Wednesday.lecture8}
                </span>
              </td>
              <td
                className={
                  currentDay === "thursday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "thursdaylecture8"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Thursday.lecture8}
                </span>
              </td>
              <td
                className={
                  currentDay === "friday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "fridaylecture8"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Friday.lecture8}
                </span>
              </td>
              <td
                className={
                  currentDay === "saturday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "saturdaylecture8"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Saturday.lecture8}
                </span>
              </td>
              <td
                className={
                  currentDay === "sunday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "slecture8"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Sunday.lecture8}
                </span>
              </td>
              <td></td>
            </tr>
            <tr style={props.props.main.low_Resolution_font}>
              <td>
                <span>{timeTable.timeTable.Time.lecture9}</span>
              </td>
              <td
                className={
                  currentDay === "monday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "mondaylecture9"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Monday.lecture9}
                </span>
              </td>
              <td
                className={
                  currentDay === "tuesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "tuesdaylecture9"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Tuesday.lecture9}
                </span>
              </td>
              <td
                className={
                  currentDay === "wednesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "wednesdaylecture9"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Wednesday.lecture9}
                </span>
              </td>
              <td
                className={
                  currentDay === "thursday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "thursdaylecture9"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Thursday.lecture9}
                </span>
              </td>
              <td
                className={
                  currentDay === "friday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "fridaylecture9"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Friday.lecture9}
                </span>
              </td>
              <td
                className={
                  currentDay === "saturday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "saturdaylecture9"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Saturday.lecture9}
                </span>
              </td>
              <td
                className={
                  currentDay === "sunday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "slecture9"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Sunday.lecture9}
                </span>
              </td>
              <td></td>
            </tr>
            <tr style={props.props.main.low_Resolution_font}>
              <td>
                <span>{timeTable.timeTable.Time.lecture10}</span>
              </td>
              <td
                className={
                  currentDay === "monday"
                    ? "currentDay_td_pack currentDay_td_pack_lastElm"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "mondaylecture10"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Monday.lecture10}
                </span>
              </td>
              <td
                className={
                  currentDay === "tuesday"
                    ? "currentDay_td_pack currentDay_td_pack_lastElm"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "tuesdaylecture10"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Tuesday.lecture10}
                </span>
              </td>
              <td
                className={
                  currentDay === "wednesday"
                    ? "currentDay_td_pack currentDay_td_pack_lastElm"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "wednesdaylecture10"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Wednesday.lecture10}
                </span>
              </td>
              <td
                className={
                  currentDay === "thursday"
                    ? "currentDay_td_pack currentDay_td_pack_lastElm"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "thursdaylecture10"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Thursday.lecture10}
                </span>
              </td>
              <td
                className={
                  currentDay === "friday"
                    ? "currentDay_td_pack currentDay_td_pack_lastElm"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "fridaylecture10"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Friday.lecture10}
                </span>
              </td>
              <td
                className={
                  currentDay === "saturday"
                    ? "currentDay_td_pack currentDay_td_pack_lastElm"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "saturdaylecture10"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Saturday.lecture10}
                </span>
              </td>
              <td
                className={
                  currentDay === "sunday"
                    ? "currentDay_td_pack currentDay_td_pack_lastElm"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "slecture10"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  {timeTable.timeTable.Sunday.lecture10}
                </span>
              </td>
              <td></td>
            </tr>
          </table>):(
            <table className="timeTableDiv " >
            <tr>
              <th>Time</th>
              <th
                className={
                  currentDay === "monday" ? "currentDay" : `notCurrentDay`
                }
              >
                Mon
              </th>
              <th
                className={
                  currentDay === "tuesday" ? "currentDay" : `notCurrentDay`
                }
              >
                Tue
              </th>
              <th
                className={
                  currentDay === "wednesday" ? "currentDay" : `notCurrentDay`
                }
              >
                Wed
              </th>
              <th
                className={
                  currentDay === "thursday" ? "currentDay" : `notCurrentDay`
                }
              >
                Thu
              </th>
              <th
                className={
                  currentDay === "friday" ? "currentDay" : `notCurrentDay`
                }
              >
                Fri
              </th>
              <th
                className={
                  currentDay === "saturday" ? "currentDay" : `notCurrentDay`
                }
              >
                Sat
              </th>
              <th
                className={
                  currentDay === "sunday" ? "currentDay" : `notCurrentDay`
                }
              >
                Sun
              </th>
            </tr>
            <tr style={props.props.main.low_Resolution_font}>
              <td> 
              <span>NA</span>
              </td>
              <td
                className={
                  currentDay === "monday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  
                  className={
                    current_lecture_className === "mondaylecture1"
                      ? "p0 timeTableInput"
                      : `lectureSpan  `
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "tuesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "tuesdaylecture1"
                      ? "p0"
                      : ` lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "wednesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "wednesdaylecture1"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "thursday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "thursdaylecture1"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "friday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "fridaylecture1"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "saturday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "saturdaylecture1"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "sunday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "slecture1"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
            </tr>
            <tr style={props.props.main.low_Resolution_font}>
              <td>
              <span>NA</span>
              </td>
              <td
                className={
                  currentDay === "monday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "mondaylecture2"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "tuesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "tuesdaylecture2"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "wednesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "wednesdaylecture2"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "thursday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "thursdaylecture2"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "friday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "fridaylecture2"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "saturday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "saturdaylecture2"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "sunday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "slecture2"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td></td>
            </tr>
            <tr style={props.props.main.low_Resolution_font}>
              <td>
              <span>NA</span>
              </td>
              <td
                className={
                  currentDay === "monday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "mondaylecture3"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "tuesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "tuesdaylecture3"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "wednesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "wednesdaylecture3"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "thursday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "thursdaylecture3"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "friday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "fridaylecture3"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "saturday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "saturdaylecture3"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "sunday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "slecture3"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td></td>
            </tr>
            <tr style={props.props.main.low_Resolution_font}>
              <td>
              <span>NA</span>
              </td>
              <td
                className={
                  currentDay === "monday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "mondaylecture4"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "tuesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "tuesdaylecture4"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "wednesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "wednesdaylecture4"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "thursday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "thursdaylecture4"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "friday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "fridaylecture4"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "saturday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "saturdaylecture4"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "sunday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "slecture4"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td></td>
            </tr>
            <tr style={props.props.main.low_Resolution_font}>
              <td>
              <span>NA</span>
              </td>
              <td
                className={
                  currentDay === "monday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "mondaylecture5"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "tuesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "tuesdaylecture5"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "wednesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "wednesdaylecture5"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "thursday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "thursdaylecture5"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "friday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "fridaylecture5"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "saturday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "saturdaylecture5"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "sunday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "slecture5"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td></td>
            </tr>
            <tr style={props.props.main.low_Resolution_font}>
              <td>
              <span>NA</span>
              </td>
              <td
                className={
                  currentDay === "monday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "mondaylecture6"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "tuesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "tuesdaylecture6"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "wednesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "wednesdaylecture6"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "thursday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "thursdaylecture6"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "friday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "fridaylecture6"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "saturday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "saturdaylecture6"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "sunday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "slecture6"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td></td>
            </tr>
            <tr style={props.props.main.low_Resolution_font}>
              <td>
              <span>NA</span>
              </td>
              <td
                className={
                  currentDay === "monday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "mondaylecture7"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "tuesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "tuesdaylecture7"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "wednesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "wednesdaylecture7"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "thursday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "thursdaylecture7"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "friday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "fridaylecture7"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "saturday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "saturdaylecture7"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "sunday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "slecture7"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td></td>
            </tr>
            <tr style={props.props.main.low_Resolution_font}>
              <td>
              <span>NA</span>
              </td>
              <td
                className={
                  currentDay === "monday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "mondaylecture8"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "tuesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "tuesdaylecture8"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "wednesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "wednesdaylecture8"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "thursday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "thursdaylecture8"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "friday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "fridaylecture8"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "saturday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "saturdaylecture8"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "sunday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "slecture8"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td></td>
            </tr>
            <tr style={props.props.main.low_Resolution_font}>
              <td>
                <span>NA</span>
              </td>
              <td
                className={
                  currentDay === "monday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "mondaylecture9"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "tuesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "tuesdaylecture9"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "wednesday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "wednesdaylecture9"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "thursday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "thursdaylecture9"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "friday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "fridaylecture9"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "saturday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "saturdaylecture9"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "sunday"
                    ? "currentDay_td_pack"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "slecture9"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td></td>
            </tr>
            <tr style={props.props.main.low_Resolution_font}>
              <td>
                <span>NA</span>
              </td>
              <td
                className={
                  currentDay === "monday"
                    ? "currentDay_td_pack currentDay_td_pack_lastElm"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "mondaylecture10"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "tuesday"
                    ? "currentDay_td_pack currentDay_td_pack_lastElm"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "tuesdaylecture10"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "wednesday"
                    ? "currentDay_td_pack currentDay_td_pack_lastElm"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "wednesdaylecture10"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "thursday"
                    ? "currentDay_td_pack currentDay_td_pack_lastElm"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "thursdaylecture10"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "friday"
                    ? "currentDay_td_pack currentDay_td_pack_lastElm"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "fridaylecture10"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "saturday"
                    ? "currentDay_td_pack currentDay_td_pack_lastElm"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "saturdaylecture10"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td
                className={
                  currentDay === "sunday"
                    ? "currentDay_td_pack currentDay_td_pack_lastElm"
                    : `notCurrentDay`
                }
              >
                <span
                  className={
                    current_lecture_className === "slecture10"
                      ? "p0"
                      : `lectureSpan`
                  }
                >
                  NA
                </span>
              </td>
              <td></td>
            </tr>
          </table>
          )
          }
          

          </div>
          <Note msg="The Schedule Can Be Changed According To The Faculty, And That Will Not Be Updated." type="empty"></Note>
          
        </div>
       
    </>
  );
};

export default TimetableComp;
