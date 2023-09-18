import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAlldivisions } from "../../../actions/divisionAction";
import { get_all_recent_lectures } from "../../../actions/lectureActions";
import "./students.css";
import HeaderComp from "../../layout/HeaderComp/HeaderComp";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useSizing from "../../../hooks/useSizing";
import Note from "../../layout/note/Note";
import CachedIcon from "@mui/icons-material/Cached";
import { Skeleton } from "@mui/material";

const Student = (props) => {
  //hooks
  const dispatch = useDispatch();

  //data form store

  const { user, isAuthenticated } = useSelector((state) => state.user);

  const { accountDetail, isUsserDetailGainedForViewAccount } = useSelector(
    (state) => state.accountDetail
  );

  const { division, isDividionGeted, divisions } = useSelector(
    (state) => state.division
  );

  const { isAllLecturesGained, lectures } = useSelector(
    (state) => state.lecture
  );

  //use state
  const [acountdetails, set_acountdetails] = useState({});
  const [Current_selected, set_Current_selected] = useState("lastWeek");

  const [presentageOfPresence_Lecture, SET_presentageOfPresence_Lecture] =
    useState(Number);
  const [presentageOfPresence_Practical, SET_presentageOfPresence_Practical] =
    useState(0);
  const [No_of_doned_Lecture, SET_No_of_doned_Lecture] = useState(Number);
  const [No_of_Undoned_Lecture, SET_No_of_Undoned_Lecture] = useState(Number);
  const [No_of_doned_Practical, SET_No_of_doned_Practical] = useState(Number);
  const [No_of_Undoned_Practical, SET_No_of_Undoned_Practical] =
    useState(Number);
  const [Stroke_lecture, SET_Stroke_lecture] = useState(String);
  const [sub_Fill_lecture, SET_sub_Fill_lecture] = useState(String);
  const [Stroke_practical, SET_Stroke_practical] = useState(String);
  const [sub_Fill_practical, SET_sub_Fill_practical] = useState(String);

  //calass

  //code functionality

  const lecturesData = (howMuchOld) => {
    const startMili = new Date().getTime() - howMuchOld; //last month
    const endMili = new Date().getTime();

    const dataForReq = {
      id: division._id,
      from: startMili,
      to: endMili,
    };

    dispatch(get_all_recent_lectures(dataForReq, Current_selected));
  };

  const calculatePresenty = (typeOfPresnety) => {
    let batchnameArray = [];
    let filterdLecturesByBatch = [];
    let numberOfLectureDid = 0;
    Object.values(division.batches)
      .filter((BetaData) => {
        return (
          parseInt(BetaData.rollFrom) <= accountDetail.rollNumber &&
          parseInt(BetaData.RollTo) >= accountDetail.rollNumber
        );
      })
      .map((data) => {
        batchnameArray.push(data.name);
      });

    filterdLecturesByBatch = lectures.filter((data) => {
      return (
        batchnameArray.includes(data.batch) && data.type === typeOfPresnety
      );
    });

    filterdLecturesByBatch.map((data) => {
      if (data.presentStudents.includes(accountDetail._id)) {
        numberOfLectureDid += 1;
        console.log(true);
      }
    });

    if (typeOfPresnety === "Lecture") {
      SET_presentageOfPresence_Lecture(
        ((numberOfLectureDid / filterdLecturesByBatch.length) * 100).toFixed(1)
      );
      SET_No_of_doned_Lecture(numberOfLectureDid);
      SET_No_of_Undoned_Lecture(
        filterdLecturesByBatch.length - numberOfLectureDid
      );
    } else {
      SET_presentageOfPresence_Practical(
        ((numberOfLectureDid / filterdLecturesByBatch.length) * 100).toFixed(1)
      );
      SET_No_of_doned_Practical(numberOfLectureDid);
      SET_No_of_Undoned_Practical(
        filterdLecturesByBatch.length - numberOfLectureDid
      );
    }
  };

  //reload attendance
  const laodAttendnce = () => {
    if (Current_selected === "lastWeek") {
      lecturesData(604800000, "lastWeek"); //last week
    } else if (Current_selected === "lastMonth") {
      lecturesData(2592000000, "lastMonth"); //last month
    } else if (Current_selected === "last5Month") {
      lecturesData(2592000000 * 5, "last5Month"); //five month
    }
  };

  // tip elem 
  const Tip = ()=>{

    const forLectures =Math.ceil(
      (No_of_Undoned_Lecture + No_of_doned_Lecture) * 0.75
    ) - No_of_doned_Lecture
    const forPracticals =Math.ceil(
      (No_of_Undoned_Practical + No_of_doned_Practical) * 0.75
    ) - No_of_doned_Practical

    if (forLectures>0||forPracticals>0) {
      
      return (

        <Note
        msg={`  ${
          forLectures
        } lectures For +75%,  ${
          forPracticals
        } Practicals For +75%`}
        type="tip"
      ></Note>
      )
    }else{
     return null
    }

  }

  //useeffect

  useEffect(() => {
    if (Current_selected === "lastWeek") {
      lecturesData(604800000, "lastWeek"); //last week
    } else if (Current_selected === "lastMonth") {
      lecturesData(2592000000, "lastMonth"); //last month
    } else if (Current_selected === "last5Month") {
      lecturesData(2592000000 * 5, "last5Month"); //last month
    }
  }, [Current_selected]);

  useEffect(() => {
    // 1st
    let student = JSON.parse(localStorage.getItem("studentDetail"));
    set_acountdetails(student);
    console.log(student);
  }, []);

  useEffect(() => {
    //2ed
    if (isDividionGeted) {
      console.log(1234);
      set_Current_selected("lastWeek");
    }

    if (user.role === "teacher") {
      dispatch(setAlldivisions(divisions, division));
    }
  }, [isDividionGeted]);

  useEffect(() => {
    //3rd

    console.log(
      isAllLecturesGained,
      isDividionGeted,
      isUsserDetailGainedForViewAccount
    );
    if (isAllLecturesGained && isUsserDetailGainedForViewAccount) {
      calculatePresenty("Practical");
      calculatePresenty("Lecture");
    }
  }, [
    isAllLecturesGained,
    isDividionGeted,
    isUsserDetailGainedForViewAccount,
    Current_selected,
  ]);

  useEffect(() => {
    if (presentageOfPresence_Lecture >= 85) {
      SET_Stroke_lecture("#15ff00");
      SET_sub_Fill_lecture("#ecffeb");
    } else if (
      presentageOfPresence_Lecture < 85 &&
      presentageOfPresence_Lecture >= 75
    ) {
      SET_Stroke_lecture("#FFB700");
      SET_sub_Fill_lecture("#fffdd6");
    } else {
      SET_Stroke_lecture("#FC0202");
      SET_sub_Fill_lecture("#ffd6d6");
    }

    if (presentageOfPresence_Practical >= 85) {
      SET_Stroke_practical("#15ff00");
      SET_sub_Fill_practical("#ecffeb");
    } else if (
      presentageOfPresence_Practical < 85 &&
      presentageOfPresence_Practical >= 75
    ) {
      SET_Stroke_practical("#FFB700");
      SET_sub_Fill_practical("#fffdd6");
    } else {
      SET_Stroke_practical("#FC0202");
      SET_sub_Fill_practical("#ffd6d6");
    }
  }, [
    presentageOfPresence_Lecture,
    presentageOfPresence_Practical,
    Current_selected,
  ]);


  const ProgressSkelton = Array(1).fill( <div className="attendaceDivAtStudent">
  {/* fake */}
  <div
    className="presentyDataDiv glassTheme whiteBorder"
    style={props.main.div_box}
  >
    <div>
      <span>
        {" "}
        <Skeleton
          variant="rounded"
          width={80}
          height={20}
          sx={{ bgcolor: "grey.450" }}
        />{" "}
      </span>
    </div>
    <div>
      <span className="paddingAdjester"></span>

      <div
        className="circlBarDiv flex_center_center"
        style={{
          width: "40vw",
          height: "40vw",
          maxHeight: 150,
          maxWidth: 170,
          position: "relative",
        }}
      >
        <Skeleton
          variant="circular"
          width={"40vw"}
          height={"40vw"}
          sx={{ bgcolor: "grey.450", position: "absolute" }}
        />
        <div
          className="flex_center_center "
          style={{
            position: "absolute",
            width: "32vw",
            height: "32vw",
            maxHeight: 150,
            maxWidth: 170,
            background: "white",
            borderRadius: "50%",
          }}
        >
          {" "}
          <Skeleton
            variant="rounded"
            width={"50px"}
            height={"28px"}
            sx={{ bgcolor: "grey.450", position: "absolute" }}
          />
        </div>
      </div>
      <span className="paddingAdjester"></span>
    </div>
    <div>
      <div>
        <span>
          {" "}
          <Skeleton
            variant="rounded"
            width={"21px"}
            height={"21px"}
            sx={{ bgcolor: "grey.450" }}
          />
        </span>
        <span className="top5">
          {" "}
          <Skeleton
            variant="rounded"
            width={"50px"}
            height={"21px"}
            sx={{ bgcolor: "grey.450" }}
          />
        </span>
      </div>
      <div>
        <span>
          {" "}
          <Skeleton
            variant="rounded"
            width={"21px"}
            height={"21px"}
            sx={{ bgcolor: "grey.450" }}
          />
        </span>
        <span className="top5">
          {" "}
          <Skeleton
            variant="rounded"
            width={"50px"}
            height={"21px"}
            sx={{ bgcolor: "grey.450" }}
          />
        </span>
      </div>
    </div>
  </div>
  <div
    className="presentyDataDiv glassTheme whiteBorder"
    style={props.main.div_box}
  >
    <div>
      <span>
        {" "}
        <Skeleton
          variant="rounded"
          width={80}
          height={20}
          sx={{ bgcolor: "grey.450" }}
        />{" "}
      </span>
    </div>
    <div>
      <span className="paddingAdjester"></span>

      <div
        className="circlBarDiv flex_center_center"
        style={{
          width: "40vw",
          height: "40vw",
          maxHeight: 150,
          maxWidth: 170,
          position: "relative",
        }}
      >
        <Skeleton
          variant="circular"
          width={"40vw"}
          height={"40vw"}
          sx={{ bgcolor: "grey.450", position: "absolute" }}
        />
        <div
          className="flex_center_center "
          style={{
            position: "absolute",
            width: "32vw",
            height: "32vw",
            maxHeight: 150,
            maxWidth: 170,
            background: "white",
            borderRadius: "50%",
          }}
        >
          {" "}
          <Skeleton
            variant="rounded"
            width={"50px"}
            height={"28px"}
            sx={{ bgcolor: "grey.450", position: "absolute" }}
          />
        </div>
      </div>
      <span className="paddingAdjester"></span>
    </div>
    <div>
      <div>
        <span>
          {" "}
          <Skeleton
            variant="rounded"
            width={"21px"}
            height={"21px"}
            sx={{ bgcolor: "grey.450" }}
          />
        </span>
        <span className="top5">
          {" "}
          <Skeleton
            variant="rounded"
            width={"50px"}
            height={"21px"}
            sx={{ bgcolor: "grey.450" }}
          />
        </span>
      </div>
      <div>
        <span>
          {" "}
          <Skeleton
            variant="rounded"
            width={"21px"}
            height={"21px"}
            sx={{ bgcolor: "grey.450" }}
          />
        </span>
        <span className="top5">
          {" "}
          <Skeleton
            variant="rounded"
            width={"50px"}
            height={"21px"}
            sx={{ bgcolor: "grey.450" }}
          />
        </span>
      </div>
    </div>
  </div>
</div>)

  return (
    <>
      <div className="mobleDiv4865" style={props.main.main}>
        <HeaderComp
          type={
            typeof acountdetails.email !== "undefined"
              ? `${acountdetails.Name} `
              : null
          }
        ></HeaderComp>

        <div
          className="mobileDiv84392 mobileDiv5656 "
          style={props.main.sub_body}
        >
          {isAuthenticated ? (
            typeof acountdetails.email !== "undefined" &&
            // isDividionGeted &&
            user.role != "student" ? (
              <>
                <div className="div786 glassTheme" style={props.main.div_box}>
                  <div>
                    <div className="profileImageDiv">
                      <img
                        src={acountdetails.avatar.url}
                        className="view_account_img"
                        alt=""
                      />
                    </div>

                    <div>
                      <span>Roll number: {acountdetails.rollNumber}</span>
                      <span>Depart.: {acountdetails.department}</span>
                      <span>enNumber: {acountdetails.enNumber}</span>
                      <span>
                        {" "}
                        {acountdetails.role} at division {division.div}{" "}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div>
                      <span>{acountdetails.Name} </span>
                    </div>
                    <div className="contactInfo">
                      <span> {acountdetails.phoneNumber}</span>
                      <a href={`tel:${acountdetails.phoneNumber}`}>
                        <PhoneIcon></PhoneIcon>{" "}
                      </a>
                    </div>
                    <div className="contactInfo">
                      <span>{acountdetails.email}</span>
                      <a href={`mailto:${acountdetails.email}`}>
                        <EmailIcon></EmailIcon>
                      </a>
                    </div>

                    <div></div>
                  </div>
                </div>
              </>
            ) : null
          ) : null}

          <div className="filterDivAtStudent">
            <button
              className={
                Current_selected === "lastWeek"
                  ? `btn_ligth ${props.main.selectedBTN}`
                  : "btn_ligth"
              }
              style={props.main.BTN}
              onClick={() => set_Current_selected("lastWeek")}
            >
              Last Week
            </button>
            <button
              className={
                Current_selected === "lastMonth"
                  ? `btn_ligth ${props.main.selectedBTN}`
                  : "btn_ligth"
              }
              style={props.main.BTN}
              onClick={() => set_Current_selected("lastMonth")}
            >
              Last Month
            </button>
            <button
              className={
                Current_selected === "last5Month"
                  ? `btn_ligth ${props.main.selectedBTN}`
                  : "btn_ligth"
              }
              style={props.main.BTN}
              onClick={() => set_Current_selected("last5Month")}
            >
              All Time
            </button>
          </div>

          <div className="flex_baselineEnd_center">
            <CachedIcon
              className="fontLink"
              onClick={laodAttendnce}
            ></CachedIcon>
          </div>

          {isAllLecturesGained ? (
            <div className="attendaceDivAtStudent">
              <div
                className="presentyDataDiv glassTheme whiteBorder"
                style={props.main.div_box}
              >
                <div>
                  <span> Lectures </span>
                </div>
                <div>
                  <span className="paddingAdjester"></span>

                  <div
                    className="circlBarDiv"
                    style={{
                      width: "40vw",
                      height: "40vw",
                      maxHeight: 150,
                      maxWidth: 170,
                    }}
                  >
                    <CircularProgressbar
                      value={presentageOfPresence_Lecture}
                      strokeWidth={10}
                      styles={{
                        // Customize the root svg element
                        root: {},
                        // Customize the path, i.e. the "completed progress"
                        path: {
                          // Path color
                          stroke: `${Stroke_lecture}`,
                          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                          strokeLinecap: "butt",
                          // Customize transition animation
                          transition: "stroke-dashoffset .5s ease 0s",
                          // Rotate the path
                          transform: "rotate(0.0turn)",
                          transformOrigin: "center center",
                        },
                        // Customize the circle behind the path, i.e. the "total progress"
                        trail: {
                          // Trail color
                          stroke: `${sub_Fill_lecture}`,
                          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                          strokeLinecap: "butt",
                          // Rotate the trail
                          transform: "rotate(0.0turn)",
                          transformOrigin: "center center",
                        },
                        // Customize the text
                        text: {
                          // Text color
                          fill: `${Stroke_lecture}`,
                          // Text size
                          fontSize: "16px",
                          fontWeight: "800",
                        },
                        // Customize background - only used when the `background` prop is true
                        background: {
                          fill: "#3e98c7",
                        },
                      }}
                      text={`${presentageOfPresence_Lecture}%`}
                    />
                  </div>
                  <span className="paddingAdjester"></span>
                </div>
                <div>
                  <div>
                    <span>{No_of_doned_Lecture}</span>
                    <span className="top5"> Attended</span>
                  </div>
                  <div>
                    <span>{No_of_Undoned_Lecture}</span>
                    <span className="top5"> Skiped</span>
                  </div>
                </div>
              </div>
              <div
                className="presentyDataDiv glassTheme whiteBorder"
                style={props.main.div_box}
              >
                <div>
                  <span> Practicals </span>
                </div>
                <div>
                  <span className="paddingAdjester"></span>

                  <div
                    className="circlBarDiv"
                    style={{
                      width: "40vw",
                      height: "40vw",
                      maxHeight: 150,
                      maxWidth: 170,
                    }}
                  >
                    <CircularProgressbar
                      value={presentageOfPresence_Practical}
                      strokeWidth={10}
                      styles={{
                        // Customize the root svg element
                        root: {},
                        // Customize the path, i.e. the "completed progress"
                        path: {
                          // Path color
                          stroke: `${Stroke_practical}`,
                          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                          strokeLinecap: "butt",
                          // Customize transition animation
                          transition: "stroke-dashoffset .5s ease 0s",
                          // Rotate the path
                          transform: "rotate(0.0turn)",
                          transformOrigin: "center center",
                        },
                        // Customize the circle behind the path, i.e. the "total progress"
                        trail: {
                          // Trail color
                          stroke: `${sub_Fill_practical}`,
                          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                          strokeLinecap: "butt",
                          // Rotate the trail
                          transform: "rotate(0.0turn)",
                          transformOrigin: "center center",
                        },
                        // Customize the text
                        text: {
                          // Text color
                          fill: `${Stroke_practical}`,
                          // Text size
                          fontSize: "16px",
                          fontWeight: "800",
                        },
                        // Customize background - only used when the `background` prop is true
                        background: {
                          fill: "#3e98c7",
                        },
                      }}
                      text={`${presentageOfPresence_Practical}%`}
                    />
                  </div>
                  <span className="paddingAdjester"></span>
                </div>
                <div>
                  <div>
                    <span>{No_of_doned_Practical}</span>
                    <span className="top5"> Attended</span>
                  </div>
                  <div>
                    <span>{No_of_Undoned_Practical}</span>
                    <span className="top5"> Skiped</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
           ProgressSkelton[0]

          )}

          <div className="div864329">
            
            {isAuthenticated ? (
              user.role === "student" ? (
               Tip()
              ) : null
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Student;
