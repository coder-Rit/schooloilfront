import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
 
  getAllDivision,
} from "../../../actions/divisionAction";
import "./division.css";
import AllDivisions from "../../divison/AllDivisions";
import HeaderComp from "../../layout/HeaderComp/HeaderComp";
import AddIcon from "@mui/icons-material/Add";
import CachedIcon from '@mui/icons-material/Cached';
 
const Divisions = (props) => {
  //hooks
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  //use state
  const { userDetail } = useSelector(
    (state) => state.userDetail
  );



 

  const redirectTo_update_division = () => {
    // dispatch(make_division_empty(divisions))
    localStorage.removeItem("SelectedDivision")
    navigateTo("/user/tools/divisons/update");


  };

  const loadDivisions =()=>{
    
    dispatch(getAllDivision(userDetail));
  }
  
 



  

  

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
