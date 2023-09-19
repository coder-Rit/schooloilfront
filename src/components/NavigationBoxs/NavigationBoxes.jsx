import React from "react";
import "./NavigationBoxes.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { set_user_detail_to_view_account } from "../../actions/updateUserAction";
import { Skeleton } from "@mui/material";
import { useEffect } from "react";

const NavigationBoxes = (props) => {
  const navigateTo = useNavigate();
  let dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { userDetail } = useSelector((state) => state.userDetail);
  const { isDivisionUpdated ,isDividionGeted} = useSelector((state) => state.division);

  const redirectTo_TimeTable = () => {
    
      navigateTo("/user/tools/timeTable");
  };
  const redirectTo_Divisions = () => {
    
      if (user.role === "teacher") {
        navigateTo("/user/tools/divisions");
      } else {
        navigateTo("/user/tools/myClass");
    }
  };

  const redirectTo_TodaysLecture = () => {
   
      navigateTo("/user/tools/lectures");
  };

  const redirectToMyLecture = () => {
  
      navigateTo("/user/tools/myLectures");
  };

  const redirectToAttendace = () => {
  
      navigateTo("/user/tools/myStudents");
  };

  const redirectTo_attendace = () => {
  
      dispatch(set_user_detail_to_view_account(userDetail));
      navigateTo("/user/student");
  };

  const addStudent = () => {
   
      dispatch(set_user_detail_to_view_account(userDetail));
      navigateTo("/addStudent");
  };

  const redirectToAccount = () => {
    navigateTo("/user/account");
  };

  const RederComp = Array(5).fill(
    <div className=" border_radius10   ">
      <div
        className="flex_center_center pointer  glassTheme whiteBorder  navBox  "
        onClick={redirectTo_attendace}
        style={props.main.div_box}
      >
        <Skeleton
          variant="circular"
          width={35}
          height={35}
          sx={{ bgcolor: "grey.450" }}
        />
      </div>
      <Skeleton
        variant="rounded"
        sx={{
          width: "90%",
          margin: "15px auto",
          height: "20px",
          bgcolor: "grey.450",
        }}
      />
    </div>
  );

  useEffect(() => {
    console.log(isDivisionUpdated);
  }, [isDivisionUpdated]);

  return (
    <div className="navBox-container  ">
      {user.role !== "student" ? (
        <>
          {isDivisionUpdated ? (
            <>
              <div className="border_radius10   ">
                <div
                  className="flex_center_center pointer  glassTheme whiteBorder  navBox "
                  onClick={redirectToMyLecture}
                  style={props.main.div_box}
                >
                  <img
                    src="../Images/lectures.png"
                    className="navImg "
                    alt=""
                  />
                </div>
                <h5
                  className="textCenter margin0 top15 unBold"
                  style={props.main.fontColor}
                >
                  Lectures
                </h5>
              </div>
              <div className="border_radius10   ">
                <div
                  className="flex_center_center pointer  glassTheme whiteBorder  navBox "
                  onClick={redirectTo_TimeTable}
                  style={props.main.div_box}
                >
                  <img
                    src="../Images/timeTable.png"
                    className="navImg "
                    alt=""
                  />
                </div>
                <h5
                  className="textCenter margin0 top15 unBold"
                  style={props.main.fontColor}
                >
                  Time Table
                </h5>
              </div>
              <div className="border_radius10   ">
                <div
                  className="flex_center_center pointer  glassTheme whiteBorder  navBox "
                  onClick={redirectToAttendace}
                  style={props.main.div_box}
                >
                  <img
                    src="../Images/students.png"
                    className="navImg "
                    alt=""
                  />
                </div>
                <h5
                  className="textCenter margin0 top15 unBold"
                  style={props.main.fontColor}
                >
                  Students
                </h5>
              </div>
              <div className="border_radius10   ">
                <div
                  className="flex_center_center pointer  glassTheme whiteBorder  navBox "
                  onClick={redirectTo_Divisions}
                  style={props.main.div_box}
                >
                  <img
                    src="../Images/classroom.png"
                    className="navImg "
                    alt=""
                  />
                </div>
                <h5
                  className="textCenter margin0 top15 unBold"
                  style={props.main.fontColor}
                >
                  Divisions
                </h5>
              </div>
              <div className="border_radius10   ">
                <div
                  className="flex_center_center pointer  glassTheme whiteBorder  navBox "
                  onClick={addStudent}
                  style={props.main.div_box}
                >
                  <img
                    src="../Images/addStudents.png"
                    className="navImg "
                    alt=""
                  />
                </div>
                <h5
                  className="textCenter margin0 top15 unBold"
                  style={props.main.fontColor}
                >
                  Add students
                </h5>
              </div>
              <div className="border_radius10   ">
                <div
                  className="flex_center_center pointer  glassTheme whiteBorder  navBox "
                  style={props.main.div_box}
                >
                  <img
                    src="../Images/addFaculty.png"
                    className="navImg "
                    alt=""
                  />
                </div>
                <h5
                  className="textCenter margin0 top15 unBold"
                  style={props.main.fontColor}
                >
                  Add Faculty
                </h5>
              </div>

              <div className="border_radius10   tempBlock">
                <div
                  className="flex_center_center pointer  glassTheme whiteBorder  navBox "
                  style={props.main.div_box}
                >
                  <img
                    src="../Images/assignment.png"
                    className="navImg "
                    alt=""
                  />
                </div>
                <h5
                  className="textCenter margin0 top15 unBold"
                  style={props.main.fontColor}
                >
                  Assignment
                </h5>
                <h5
                  className="textCenter margin0  unBold"
                  style={props.main.fontColor}
                >
                  comming soon
                </h5>
              </div>
              <div className="border_radius10   tempBlock">
                <div
                  className="flex_center_center pointer  glassTheme whiteBorder  navBox "
                  style={props.main.div_box}
                >
                  <img src="../Images/growth.png" className="navImg " alt="" />
                </div>
                <h5
                  className="textCenter margin0 top15 unBold"
                  style={props.main.fontColor}
                >
                  Performance
                </h5>
                <h5
                  className="textCenter margin0  unBold"
                  style={props.main.fontColor}
                >
                  comming soon
                </h5>
              </div>
              <div className="border_radius10   tempBlock">
                <div
                  className="flex_center_center pointer  glassTheme whiteBorder  navBox "
                  style={props.main.div_box}
                >
                  <img
                    src="../Images/feedback.png"
                    className="navImg "
                    alt=""
                  />
                </div>
                <h5
                  className="textCenter margin0 top15 unBold"
                  style={props.main.fontColor}
                >
                  FeedBack
                </h5>
                <h5
                  className="textCenter margin0  unBold"
                  style={props.main.fontColor}
                >
                  comming soon
                </h5>
              </div>
            </>
          ) : (
            RederComp.map((data) => data)
          )}
        </>
      ) : (
        <>
          {isDividionGeted ? (
            <>
              <div className=" border_radius10   ">
                <div
                  className="flex_center_center pointer  glassTheme whiteBorder  navBox  "
                  onClick={redirectTo_attendace}
                  style={props.main.div_box}
                >
                  <img
                    src="../Images/speedometer.png"
                    className="navImg "
                    alt=""
                  />
                </div>
                <h5
                  className="textCenter margin0 top15 unBold   "
                  style={props.main.fontColor}
                >
                  Attendence
                </h5>
              </div>

              <div className="  border_radius10    ">
                <div
                  className="flex_center_center pointer  glassTheme whiteBorder  navBox   "
                  onClick={redirectTo_TodaysLecture}
                  style={props.main.div_box}
                >
                  <img src="../Images/list.png" className="navImg  " alt="" />
                </div>
                <h5
                  className="textCenter margin0 top15 unBold"
                  style={props.main.fontColor}
                >
                  Lectures
                </h5>
              </div>
              <div className=" border_radius10   ">
                <div
                  className="flex_center_center pointer  glassTheme whiteBorder  navBox   "
                  onClick={redirectTo_Divisions}
                  style={props.main.div_box}
                >
                  <img
                    src="../Images/timeTable.png"
                    className="navImg "
                    alt=""
                  />
                </div>
                <h5
                  className="textCenter margin0 top15 unBold"
                  style={props.main.fontColor}
                >
                  Time Table
                </h5>
              </div>

              <div className="border_radius10   tempBlock">
                <div
                  className="flex_center_center pointer  glassTheme whiteBorder  navBox "
                  style={props.main.div_box}
                >
                  <img
                    src="../Images/assignment.png"
                    className="navImg "
                    alt=""
                  />
                </div>
                <h5
                  className="textCenter margin0 top15 unBold"
                  style={props.main.fontColor}
                >
                  Assignments
                </h5>
                <h5
                  className="textCenter margin0  unBold"
                  style={props.main.fontColor}
                >
                  comming soon
                </h5>
              </div>
              <div className="border_radius10   tempBlock">
                <div
                  className="flex_center_center pointer  glassTheme whiteBorder  navBox "
                  style={props.main.div_box}
                >
                  <img src="../Images/growth.png" className="navImg " alt="" />
                </div>
                <h5
                  className="textCenter margin0 top15 unBold"
                  style={props.main.fontColor}
                >
                  Performance
                </h5>
                <h5
                  className="textCenter margin0  unBold"
                  style={props.main.fontColor}
                >
                  comming soon
                </h5>
              </div>
              <div className="border_radius10   tempBlock">
                <div
                  className="flex_center_center pointer  glassTheme whiteBorder  navBox "
                  style={props.main.div_box}
                >
                  <img
                    src="../Images/feedback.png"
                    className="navImg "
                    alt=""
                  />
                </div>
                <h5
                  className="textCenter margin0 top15 unBold"
                  style={props.main.fontColor}
                >
                  News
                </h5>
                <h5
                  className="textCenter margin0  unBold"
                  style={props.main.fontColor}
                >
                  comming soon
                </h5>
              </div>
            </>
          ) : (
            RederComp.map((data) => data)
          )}
        </>
      )}
    </div>
  );
};

export default NavigationBoxes;
