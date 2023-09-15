import React, {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_division_by_data, store_division_data } from "../../../actions/divisionAction";
import "./division.css";
import TimeTableForStudent from "../timeTable/timeTableForStudent";
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
    division,
    isDividionGeted,
    isDivisionDataStored,
  } = useSelector((state) => state.division);

  const [ setWindowSize] = useState(getWindowSize());


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
        </div>
    </>
  );
};

export default ClassForStudent;
