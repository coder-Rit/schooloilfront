import React, { Fragment } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
 
 
import ToolsPage from "../toolsPage";
import AllDivisions from "../../divison/AllDivisions";
import HeaderComp from "../../layout/HeaderComp/HeaderComp";
import useSizing from "../../../hooks/useSizing";
import { getAllDivision, setAlldivisions } from "../../../actions/divisionAction";
import { update_time_table_by_id_in_data } from "../../../actions/timeTableAction";

const Avalable_Divisions_For_Time_Table = (props) => {
  const dispatch = useDispatch();
  const windowSizing = useSizing();

  const { user, isAuthenticated } = useSelector((state) => state.user);
  

  const { isUserDetailUpdated, userDetail, loading } = useSelector(
    (state) => state.userDetail
  );

  const {
    divisions,
    division,
    isDividionGeted,
    isDivisionUpdated,
    isDivisionDataStored,
  } = useSelector((state) => state.division);

  

  useEffect(() => {
    window.sessionStorage.clear();
  }, []);

  return (
    <Fragment>
       <div className="mobleDiv4865" style={props.main.main}>
          <HeaderComp type="Time Table"></HeaderComp>
          <div className=" mobileDiv5656 boxShodow" style={props.main.sub_body}>
            <AllDivisions
              type="timeTable"
              hitpoints="2"
              main={props.main}
            ></AllDivisions>
            <div className="fakeDiv_mobile"></div>
          </div>
          <ToolsPage></ToolsPage>
        </div>
    </Fragment>
  );
};

export default Avalable_Divisions_For_Time_Table;
