import React, { Fragment, useEffect, useState } from "react";
import HeaderComp from "../../layout/HeaderComp/HeaderComp";
import TimetableComp from "./TimetableComp";

import "./timeTable.css";
const TimeTableForStudent = (props) => {
  const [windowSize, setWindowSize] = useState(getWindowSize());

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
      <TimetableComp
            props={props}
            classes="tableDiv markDiv4564"
          ></TimetableComp>
    </>
  );
};

export default TimeTableForStudent;
