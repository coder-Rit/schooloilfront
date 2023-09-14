import React, { useEffect, useState } from "react";
 import { useDispatch, useSelector } from "react-redux";
import {
  get_division_by_data,
  store_division_data,
} from "../../../actions/divisionAction";
import {
  add_user_to_mark_attendace,
  delete_created_lecture,
  get_all_recent_lectures,
  store_local_lectures_data,
} from "../../../actions/lectureActions";
import { getUserDetail } from "../../../actions/updateUserAction";
 import "./lecture.css";
 import ToolsPage from "../toolsPage";
import HeaderComp from "../../layout/HeaderComp/HeaderComp";
import LectureDiv from "../../layout/LectureDiv";
import Note from "../../layout/note/Note";
import CachedIcon from '@mui/icons-material/Cached';

const TodaysLectures = (props) => {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  //hookes
  const dispatch = useDispatch();

  const { isUserDetailUpdated, userDetail,   } = useSelector(
    (state) => state.userDetail
  );
  const { division, isDividionGeted } = useSelector((state) => state.division);

  const { isAllLecturesGained, lectures, isPresentyModified ,loading} = useSelector(
    (state) => state.lecture
  );


  const laodLectures =()=>{

    var start = new Date();
    start.setUTCHours(0, 0, 0, 0); 
    var end = new Date();
    end.setUTCHours(23, 59, 59, 999); 
 
    dispatch(
      get_all_recent_lectures({
        id: division._id,
        from: start.getTime(),
        to: end.getTime(),
      },"24hourLectures")
    );
  }


  useEffect(() => {
    if (isUserDetailUpdated) {
        let localDivisionData = localStorage.getItem("studentDivision");
      if (localDivisionData) {
        dispatch(store_division_data(JSON.parse(localDivisionData), []));
      } else {
        dispatch(
          get_division_by_data({
            div: userDetail.div,
            course: userDetail.course,
            clgShortName: userDetail.clgShortName,
            year: userDetail.year,
          })
        );
      }
    }
  }, [ isUserDetailUpdated]);


  useEffect(() => {
 console.log(156);
      // let last_24_hoursLectures = sessionStorage.getItem("24hourLectures");
      // if (last_24_hoursLectures) {
      //   dispatch(
      //     store_local_lectures_data(JSON.parse(last_24_hoursLectures))
      //   );
      // } else {
       laodLectures()
      // }
   
  }, [ ]);


  return (
    <>
      <div className="mobleDiv4865" style={props.main.main}>
          <HeaderComp type="Mark Attendance"></HeaderComp>
          <div
            className="mobileDiv5656 markDiv4564"
            style={props.main.sub_body}
          >
            <div className="flex_center_center gap30"  style={{margin:"20px 0px 0px 0px"}}>

            <h3>Today's Lectures </h3>
            <CachedIcon className="fontLink" onClick={laodLectures} ></CachedIcon>
            </div>
            <hr />
            <div className="allLectures" style={{color:"white"}}>
              {isAllLecturesGained ? (
                lectures.length == 0 ? (
                  <Note msg="No Lecture Avalable Till Now." type="empty"></Note>
                ) : (
                  lectures.map((data) => {
                    return <LectureDiv lectureData={data}></LectureDiv>;
                  })
                )
              ) : <span class="loader"></span>}
            </div>
          </div>
        </div>
    </>
  );
};

export default TodaysLectures;
