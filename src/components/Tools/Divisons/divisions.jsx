import React, { Fragment } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  delete_division,
 
  getAllDivision,
  make_division_empty,
  setDivisionID,
  store_division_data,
} from "../../../actions/divisionAction";
import { getUserDetailFaculty } from "../../../actions/updateUserAction";
import { DIVISION_ID } from "../../../constants/divisionConstants";
import Loader from "../../layout/Loader/Loader";
import "./division.css";
import Button from "@mui/material/Button";
import ToolsPage from "../toolsPage";
import AllDivisions from "../../divison/AllDivisions";
import HeaderComp from "../../layout/HeaderComp/HeaderComp";
import AddIcon from "@mui/icons-material/Add";
import useSizing from "../../../hooks/useSizing";
import CachedIcon from '@mui/icons-material/Cached';
 
const Divisions = (props) => {
  //hooks
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const windowSizing = useSizing();

  //use state
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { isUserDetailUpdated, userDetail } = useSelector(
    (state) => state.userDetail
  );

  const {
    divisions,
    division,
    isDividionGeted,
    isDivisionUpdated,
    isDivisionDataStored,
  } = useSelector((state) => state.division);

 

  const redirectTo_update_division = () => {
    // dispatch(make_division_empty(divisions))
    localStorage.removeItem("SelectedDivision")
    navigateTo("/user/tools/divisons/update");


  };

  const loadDivisions =()=>{
    
    dispatch(getAllDivision(userDetail));
  }
  // useEffect(() => {
  //   if (typeof divisions === "undefined") {
  //     dispatch(getAllDivision(userDetail));
  //   } else {
  //     if (
  //       typeof isDividionGeted === "undefined" &&
  //       JSON.stringify(divisions) === JSON.stringify([])
  //     ) {
  //      
  //     }
  //   }
  // }, [isUserDetailUpdated]);
 



  

  

  return (
    <Fragment>
      <div className="mobleDiv4865" style={props.main.main}>
           
           <HeaderComp type="Division"></HeaderComp>
           <div className=" mobileDiv5656 boxShodow mobileDiv665 " style={props.main.sub_body}>
             <div className="allDivisionsAtDivisionDiv_main_mobile">
               <div>
                 <AllDivisions type="division"  main={props.main}></AllDivisions>
               </div>
               <div className="flex_baselineEnd_center"><CachedIcon className="fontLink" onClick={loadDivisions} style={props.main.fontColor} ></CachedIcon></div>
 
               <div className="flex_center_center top30">
                 <button
                   variant="contained"
                   className="btn_ligth flex_center_center "
                   style={{width:"150px",height:"auto"}}
                   onClick={redirectTo_update_division}
                 >
                   <AddIcon></AddIcon>&nbsp;Add new division
                 </button>
               </div>
  
               
               <div className="fakeDiv_mobile">
 
               </div>
 
             </div>
           </div>
         </div>
    </Fragment>
  );
};

export default Divisions;
