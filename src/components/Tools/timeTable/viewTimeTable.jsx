import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
 
import { get_time_table_by_id } from "../../../actions/timeTableAction";
import AllDivisions from "../../divison/AllDivisions";
 import Loader from "../../layout/Loader/Loader";
import ToolsPage from "../toolsPage";
import "./timeTable.css";

const ViewTimeTable = (props) => {
  //hookes
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const { timeTable, loading, isTimetableGetByID } = useSelector(
    (state) => state.timeTable
  );
  const { isUserDetailUpdated, userDetail } = useSelector(
    (state) => state.userDetail
  );
  const { isDivisionUpdated, divisions,isDividionGeted,division } = useSelector(
    (state) => state.division
  );

  //use State

  const [timeTable_state, set_timeTable_state] = useState({});
  const [viewTimetableByLocalData, set_viewTimetableByLocalData] = useState(false);
const [Eff,setEff]=useState("")
  //useEffect

  useEffect(() => {
    console.log(123);
    console.log(division);
    if (window.sessionStorage.getItem("timeTable")===null) {
      dispatch(get_time_table_by_id(division.timeTableID));
    }
  }, []);


  useEffect(() => {
    if ( window.sessionStorage.getItem("timeTable")===null && isTimetableGetByID) {
      window.sessionStorage.setItem("timeTable", JSON.stringify(timeTable));
      set_timeTable_state(timeTable);
      console.log(timeTable);
      set_viewTimetableByLocalData(true)
    } else if (window.sessionStorage.getItem("timeTable")!==null) {
      const newData = window.sessionStorage.getItem("timeTable");
      let newTimeTable = JSON.parse(newData);

      set_timeTable_state(newTimeTable);
      set_viewTimetableByLocalData(true)
    }
  }, [isTimetableGetByID]);

  setTimeout(() => {
    setEff("p0")
  }, 3000);


  
  // useEffect(() => {
  //   console.log(divisions);

  //   if (typeof divisions === "undefined") {
  //     dispatch(getAllDivision(userDetail));

      
  //   }else{
  //     if  ( typeof isDividionGeted ==="undefined" && JSON.stringify(divisions)  ===JSON.stringify([]) ) { 
  //     dispatch(getAllDivision(userDetail));
  //    } 

  //   }
    
  //   }, [isUserDetailUpdated]);

  return (
    <div className="userAcountMainDiv" style={props.main.main}> 

    <div className="toolsNavigator" >

    <ToolsPage></ToolsPage>
    </div>
      <div>
 
      { viewTimetableByLocalData ? (
         <table className="table">
         <tr>
           <th>Time</th>
           <th>Monday</th>
           <th>Tuesday</th>
           <th>Wednesday</th>
           <th>Thursday</th>
           <th>Friday</th>
           <th>Saturday</th>
           <th>Sunday</th>
         </tr>
         <tr>
           <td>
             <div>{timeTable_state.timeTable.Time.lecture1}</div>
           </td>
           <td>
             <div className={`lectureDiv ${Eff}`} >
               {timeTable_state.timeTable.Monday.lecture1}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Tuesday.lecture1}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Wednesday.lecture1}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Thursday.lecture1}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Friday.lecture1}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Saturday.lecture1}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Sunday.lecture1}
             </div>
           </td>
         </tr>
         <tr>
           <td>
             <div>{timeTable_state.timeTable.Time.lecture2}</div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Monday.lecture2}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Tuesday.lecture2}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Wednesday.lecture2}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Thursday.lecture2}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Friday.lecture2}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Saturday.lecture2}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Sunday.lecture2}
             </div>
           </td>
           <td></td>
         </tr>
         <tr>
           <td>
             <div>{timeTable_state.timeTable.Time.lecture3}</div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Monday.lecture3}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Tuesday.lecture3}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Wednesday.lecture3}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Thursday.lecture3}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Friday.lecture3}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Saturday.lecture3}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Sunday.lecture3}
             </div>
           </td>
           <td></td>
         </tr>
         <tr>
           <td>
             <div>{timeTable_state.timeTable.Time.lecture4}</div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Monday.lecture4}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Tuesday.lecture4}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Wednesday.lecture4}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Thursday.lecture4}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Friday.lecture4}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Saturday.lecture4}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Sunday.lecture4}
             </div>
           </td>
           <td></td>
         </tr>
         <tr>
           <td>
             <div>{timeTable_state.timeTable.Time.lecture5}</div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Monday.lecture5}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Tuesday.lecture5}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Wednesday.lecture5}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Thursday.lecture5}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Friday.lecture5}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Saturday.lecture5}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Sunday.lecture5}
             </div>
           </td>
           <td></td>
         </tr>
         <tr>
           <td>
             <div>{timeTable_state.timeTable.Time.lecture6}</div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Monday.lecture6}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Tuesday.lecture6}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Wednesday.lecture6}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Thursday.lecture6}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Friday.lecture6}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Saturday.lecture6}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Sunday.lecture6}
             </div>
           </td>
           <td></td>
         </tr>
         <tr>
           <td>
             <div>{timeTable_state.timeTable.Time.lecture7}</div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Monday.lecture7}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Tuesday.lecture7}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Wednesday.lecture7}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Thursday.lecture7}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Friday.lecture7}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Saturday.lecture7}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Sunday.lecture7}
             </div>
           </td>
           <td></td>
         </tr>
         <tr>
           <td>
             <div>{timeTable_state.timeTable.Time.lecture8}</div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Monday.lecture8}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Tuesday.lecture8}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Wednesday.lecture8}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Thursday.lecture8}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Friday.lecture8}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Saturday.lecture8}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Sunday.lecture8}
             </div>
           </td>
           <td></td>
         </tr>
         <tr>
           <td>
             <div>{timeTable_state.timeTable.Time.lecture9}</div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Monday.lecture9}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Tuesday.lecture9}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Wednesday.lecture9}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Thursday.lecture9}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Friday.lecture9}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Saturday.lecture9}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Sunday.lecture9}
             </div>
           </td>
           <td></td>
         </tr>
         <tr>
           <td>
             <div>{timeTable_state.timeTable.Time.lecture10}</div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Monday.lecture10}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Tuesday.lecture10}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Wednesday.lecture10}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Thursday.lecture10}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Friday.lecture10}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Saturday.lecture10}
             </div>
           </td>
           <td>
             <div className="lectureDiv">
               {timeTable_state.timeTable.Sunday.lecture10}
             </div>
           </td>
           <td></td>
         </tr>
       </table>
      ) : (
        <Loader />
        
      )}
      </div>
     </div>
  );
};

export default ViewTimeTable;
