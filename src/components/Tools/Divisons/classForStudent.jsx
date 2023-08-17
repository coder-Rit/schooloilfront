import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_division_by_data, store_division_data } from "../../../actions/divisionAction";
import { getUserDetail } from "../../../actions/updateUserAction";
import "./division.css";
import TimeTableForStudent from "../timeTable/timeTableForStudent";
import { get_faculty_members_by_data } from "../../../actions/userListActions";
import ToolsPage from "../toolsPage";
import HeaderComp from "../../layout/HeaderComp/HeaderComp";

const ClassForStudent = (props) => {
  //hoook
  const dispatch = useDispatch();

  //data form store
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const { isUserDetailUpdated, userDetail } = useSelector(
    (state) => state.userDetail
  );

  const {
    isDivisionUpdate,
    id,
    division,
    isIdUploaded,
    isDividionGeted,
    isDivisionDataStored,
    isTimeTableID_updatedIn_division,
  } = useSelector((state) => state.division);

  const [windowSize, setWindowSize] = useState(getWindowSize());
  // //use effect
  // useEffect(() => {
  //   if (isAuthenticated && typeof isUserDetailUpdated === "undefined") {
  //     dispatch(getUserDetail(user.email));
  //   }
  // }, [isAuthenticated, isUserDetailUpdated]);

  useEffect(() => {
    if (isUserDetailUpdated && user.role === "student") {
      let localDivisionData = localStorage.getItem("studentDivision"); 
      if (localDivisionData) {
        dispatch(store_division_data(JSON.parse(localDivisionData), []));
      } else {
        dispatch(get_division_by_data(userDetail));
        
      }


    }
  }, [isUserDetailUpdated, isAuthenticated]);

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <>
      {windowSize.innerWidth >= 768 ? (
        <div className="userAcountMainDiv" style={props.main.main}>
          <div className="toolsNavigator">
            <ToolsPage></ToolsPage>
          </div>

          {(isDividionGeted || isDivisionDataStored) && isUserDetailUpdated ? (
            <TimeTableForStudent
              id={division.timeTableID}
              class={division.div}
              userDetail={userDetail}
            ></TimeTableForStudent>
            
          ) : null}
          <HeaderComp type="Time Table"></HeaderComp>
        </div>
      ) : (
        <div className="mobleDiv4865" style={props.main.main}>
          <HeaderComp type="Time Table"></HeaderComp>
          {(isDividionGeted || isDivisionDataStored) && isUserDetailUpdated ? (
            <TimeTableForStudent
              id={division.timeTableID}
              class={division.div}
              userDetail={userDetail}
              main={props.main}
            ></TimeTableForStudent>
          ) :   null}
          <ToolsPage></ToolsPage>
        </div>
      )}
    </>
  );
};

export default ClassForStudent;
