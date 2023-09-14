import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
 import {
  getUserDetailFaculty,
  set_user_detail_to_view_account,
} from "../../../actions/updateUserAction";
import { get_All_user, set_All_user } from "../../../actions/userListActions";
import "./students.css";
import Button from "@mui/material/Button";
import ToolsPage from "../toolsPage";
import AllDivisions from "../../divison/AllDivisions";
import HeaderComp from "../../layout/HeaderComp/HeaderComp";
import useSizing from "../../../hooks/useSizing";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Note from "../../layout/note/Note";
import CachedIcon from '@mui/icons-material/Cached';
import Loader from "../../layout/Loader/Loader";

const MyStudents = (props) => {
  //hooks
  const dispatch = useDispatch();
  const navigateTo = useNavigate(); 
   const windowSizing = useSizing()

  //data form store
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const { isUserDetailUpdated, userDetail, loading } = useSelector(
    (state) => state.userDetail
  );

  const { divisions, isDividionGeted, isDivisionUpdated,division } = useSelector(
    (state) => state.division
  );

  const { userList, is_all_user_data_ready } = useSelector(   
    (state) => state.userList
  );


   
  const [showBandedStudent, set_showBandedStudent] = useState("undispayBanded")
  
  //code fuctionalty
  // const getStudentList = (data) => {
  //   const tempOBJ = {
  //     course: userDetail.course,
  //     year: data.year,
  //     div: data.div,
  //     clgShortName: user.clgShortName,
  //     department: userDetail.department,
  //   };
  //   dispatch(get_All_user(tempOBJ));
  // };


  const redirectToUserAccount = (betaData) => {
    dispatch(set_user_detail_to_view_account(betaData));
    navigateTo("/user/student");
  };
  const loadUsers =()=>{
    const tempOBJ = {
          course: userDetail.course,
          year: division.year,
          div: division.div,
          clgShortName: userDetail.clgShortName,
          department: userDetail.department,
          id:division._id
        };
        dispatch(get_All_user(tempOBJ));
  }

  // //use effect
 

  // useEffect(() => {
  //   if (is_all_user_data_ready) {
  //     let userlist  = localStorage.getItem(division._id)
  //     console.log(userList);
  //     dispatch(set_All_user(userlist))
  //   }
   
  // }, [is_all_user_data_ready])
  

  // useEffect(() => {
  //   window.sessionStorage.removeItem("account_Detail");
  // }, []);

  


  return (
    <Fragment>

<div className="mobleDiv4865" style={props.main.main}>
<HeaderComp type="Student"></HeaderComp>
  <div className="mobileDiv5656 boxShodow" style={props.main.sub_body}>
  <Fragment>
          <AllDivisions type="student"  main={props.main}></AllDivisions>
          <div className="flex_baselineEnd_center"><CachedIcon className="fontLink" onClick={loadUsers} style={props.main.fontColor} ></CachedIcon></div>

{
  
}
          <div className="allStudentDiv glassTheme" style={props.main.div_box} >
            {is_all_user_data_ready
              ?  userList.length==0?(
                <div className="" > 
                 <Note msg="No student belong to this division" type="empty"></Note>
                </div>
              ):userList
                  .sort((a, b) => a.rollNumber - b.rollNumber)
                  .map((betaData) => {
                    if (betaData.status === "unBan") {
                      return (
                           <div className="sub_studnetDiv" onClick={() => redirectToUserAccount(betaData)}>
                            
                           
                              
                            <span >
                              
                              {betaData.rollNumber}
                            </span>
                            <div className="studentName">
                              
                                {betaData.Name} 
                                
                            </div>
                            <OpenInNewIcon></OpenInNewIcon>
                            
                          </div>
                        
                      );
                    }
                  })
              : <span class="loader"></span>}
          </div>

          <span onClick={()=>set_showBandedStudent(showBandedStudent==="displayBandend"?"undispayBanded":"displayBandend")}>Banded Student</span>
          <div className={`allStudentDiv glassTheme banRed ${showBandedStudent}`}>

          
          {is_all_user_data_ready
            ? userList
                .sort((a, b) => a.rollNumber - b.rollNumber)
                .map((betaData) => {
                  if (betaData.status === "Ban") {
                    return (
                      <div className="sub_studnetDiv" onClick={() => redirectToUserAccount(betaData)}>
                            
                           
                             
                            <span >
                              
                              {betaData.rollNumber}
                            </span>
                            <div className="studentName">
                              
                                {betaData.Name} 
                              
                            </div>
                            <OpenInNewIcon></OpenInNewIcon>
                            
                          </div>
                    );
                  }
                })
            : <span class="loader"></span>}
             </div>
             <div className="fakeDiv_mobile_sutdnt"></div>
        </Fragment>
  </div>
</div>
     
    
    </Fragment>
  );
};

export default MyStudents;
