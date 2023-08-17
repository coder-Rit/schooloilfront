import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getUserDetail,
  getUserDetailFaculty,
  set_user_detail_to_view_account,
} from "../../actions/updateUserAction";
import "./toolsPage.css";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core";
 
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ClassIcon from "@mui/icons-material/Class";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import EqualizerIcon from "@mui/icons-material/Equalizer";

const useStyles = makeStyles({
  Button: {
    backgroundColor: "black",
  },
  selected: {},
});

const ToolsPage = () => {
  //hooks
  let dispatch = useDispatch();
  const navigateTo = useNavigate();
  const classes = useStyles();

  //from store
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { userDetail, isUserDetailUpdated } = useSelector(
    (state) => state.userDetail
  );
  const { divisions, isDividionGeted, isDivisionUpdated } = useSelector(
    (state) => state.division
  );
  const { theme } = useSelector((state) => state.settings);


  //state
  const [selectedBTN, setselectedBTN] = useState({});

  const is_userDetailUpdated = (props) => {
    if (userDetail === null) {
      return props;
    }
  };


  


  // ui fuctionality
  const redirectTo_TimeTable = () => {
    if (userDetail === null) {
      navigateTo("/user/account");
    }else{

      navigateTo("/user/tools/timeTable");
    }
  };
  const redirectTo_Divisions = () => {
    if (userDetail === null) {
      navigateTo("/user/account");
    } else {
      if (user.role === "teacher" ) {
        navigateTo("/user/tools/divisions");
      } else {
        navigateTo("/user/tools/myClass");
      }
    }
  };

  const redirectTo_MarkAttendace = () => {
    if (userDetail === null) {
      navigateTo("/user/account");
    } else {
      navigateTo("/user/tools/lectures");
    }
  };

  const redirectToMyLecture = () => {
    if (userDetail === null) {
      navigateTo("/user/account");
    }else{

      navigateTo("/user/tools/myLectures");
    }
  };

  const redirectToAttendace = () => {
    if (userDetail === null) {
      navigateTo("/user/account");
    }else{
     
        
      navigateTo("/user/tools/myStudents");
    }
  };

  const redirectTo_attendace = () => {
    if (userDetail === null) {
      navigateTo("/user/account");
    } else {
      dispatch(set_user_detail_to_view_account(userDetail));
        navigateTo("/user/student");
    }
  };

  const redirectToAccount = () => {
    navigateTo("/user/account");
  };

  const styles = theme === "dark_theme"
      ? {
          toolpage: {
            backgroundColor: "#000",
            color: "white",
          },
          toolpage_buttons: {
            color: "white",
          },
        }
      : { toolpage: {}, toolpage_buttons: {} }
    

  // useEffect(() => {
  //   if (isUserDetailUpdated) {
  //     console.log(userDetail);
  //     dispatch(getAllDivision(userDetail));

  //   }
  // }, [isUserDetailUpdated]);

  return (
    <Fragment>
      <div className="time_table_btns" style={styles.toolpage}>
        <div className="appName">
          <span className="comName" style={styles.toolpage}>
            schoolOil
          </span>
        </div>

        <div className="navLinksDiv">
          {isAuthenticated ? (
            user.role === "teacher" ? (
              <>
                <div
                  // className={
                  //   window.location.pathname === "/user/tools/myLectures"
                  //     ? "iconNName_btnSelected iconNName_btn"
                  //     : "iconNName_btn"
                  // }
                  onClick={() => {
                    redirectToMyLecture();
                  }}
                >
                  <ClassIcon
                    style={
                      window.location.pathname === "/user/tools/myLectures"
                        ? { color: " #8a2be2" }
                        : {}
                    }
                  ></ClassIcon>

                  <span variant="contained" className="toolTiltal">
                    {" "}
                    My Lectures
                  </span>
                </div>
                <div
                  // className={
                  //   window.location.pathname === "/user/tools/timeTable" ||
                  //   window.location.pathname === "/user/tools/timeTable/update"
                  //     ? "iconNName_btnSelected iconNName_btn"
                  //     : "iconNName_btn"
                  // }
                  onClick={() => {
                    redirectTo_TimeTable();
                  }}
                >
                  <CalendarMonthIcon
                    style={
                      window.location.pathname === "/user/tools/timeTable" ||
                      window.location.pathname === "/user/tools/timeTable/update"
                        ? { color: " #8a2be2" }
                        : styles.toolpage_buttons
                    }
                  ></CalendarMonthIcon>
                  <span variant="contained" className="toolTiltal">
                    {" "}
                    Time Table
                  </span>
                </div>
                <div
                  // className={
                  //   window.location.pathname === "/user/tools/myStudents" ||
                  //   window.location.pathname === "/user/student"
                  //     ? "iconNName_btnSelected iconNName_btn"
                  //     : "iconNName_btn"
                  // }
                  onClick={() => {
                    redirectToAttendace();
                  }}
                >
                  <PeopleAltIcon
                    style={
                      window.location.pathname === "/user/tools/myStudents" ||
                      window.location.pathname === "/user/student"
                        ? { color: " #8a2be2" }
                        : styles.toolpage_buttons
                    }
                  ></PeopleAltIcon>
                  <span variant="contained" className="toolTiltal">
                    {" "}
                    Students
                  </span>
                </div>
              </>
            ) : (
              <>
                <div
                  // className={
                  //   window.location.pathname === "/user/tools/lectures"
                  //     ? "iconNName_btnSelected iconNName_btn"
                  //     : "iconNName_btn"
                  // }
                  onClick={() => {
                    redirectTo_MarkAttendace();
                  }}
                >
                  <BookmarkAddedIcon
                    style={
                      window.location.pathname === "/user/tools/lectures"
                        ? { color: " #8a2be2" }
                        : styles.toolpage_buttons
                    }
                  ></BookmarkAddedIcon>

                  <span variant="contained" className="toolTiltal">
                    {" "}
                    Mark Attendance
                  </span>
                </div>
                <div
                  // className={
                  //   window.location.pathname === "/user/student"
                  //     ? "iconNName_btnSelected iconNName_btn"
                  //     : "iconNName_btn"
                  // }
                  onClick={() => {
                    redirectTo_attendace();
                  }}
                >
                  <EqualizerIcon
                    style={
                      window.location.pathname === "/user/student"
                        ? { color: " #8a2be2" }
                        : styles.toolpage_buttons
                    }
                  ></EqualizerIcon>
                  <span variant="contained" className="toolTiltal">
                    {" "}
                    Attendace
                  </span>
                </div>
              </>
            )
          ) : null}
          <div
            // className={
            //   window.location.pathname === "/user/tools/divisions" ||
            //   window.location.pathname === "/user/tools/myClass"
            //     ? "iconNName_btnSelected iconNName_btn"
            //     : "iconNName_btn"
            // }
            onClick={() => {
              redirectTo_Divisions();
            }}
          >
            <MeetingRoomIcon
              style={
                window.location.pathname === "/user/tools/divisions" ||
              window.location.pathname === "/user/tools/myClass"
                  ? { color: " #8a2be2" }
                  : styles.toolpage_buttons
              }
            ></MeetingRoomIcon>
            <span variant="contained" className="toolTiltal">
              {" "}
              Division
            </span>
          </div>
          <div
            // className={
            //   window.location.pathname === "/user/account"
            //     ? "iconNName_btnSelected iconNName_btn"
            //     : "iconNName_btn"
            // }
            onClick={() => {
              redirectToAccount();
            }}
          >
            <AccountBoxIcon
              style={
                window.location.pathname === "/user/account"
                  ? { color: " #8a2be2" }
                  : styles.toolpage_buttons
              }
            ></AccountBoxIcon>
            <span variant="contained" className="toolTiltal">
              {" "}
              Account
            </span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ToolsPage;
