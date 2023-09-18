import React, { Fragment } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
 
 
import AllDivisions from "../../divison/AllDivisions";
import HeaderComp from "../../layout/HeaderComp/HeaderComp";
import useSizing from "../../../hooks/useSizing";

const Avalable_Divisions_For_Time_Table = (props) => {

   

  useEffect(() => {
    window.sessionStorage.clear();
  }, []);

  return (
    <Fragment>
       <div className="mobleDiv4865" style={props.main.main}>
          <HeaderComp type="Time Table"></HeaderComp>
          <div className=" mobileDiv5656 " style={props.main.sub_body}>
            <AllDivisions
              type="timeTable"
              hitpoints="2"
              main={props.main}
            ></AllDivisions>
            <div className="fakeDiv_mobile"></div>
          </div>
        </div>
    </Fragment>
  );
};

export default Avalable_Divisions_For_Time_Table;
