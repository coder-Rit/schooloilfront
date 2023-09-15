import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Fragment } from "react";
import {  useDispatch, useSelector } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
 
import {
  create_lecture,
  delete_created_lecture,
  find_lecture_by_id_and_replace_attendance,
  find_lecture_by_id_and_update_info,
  get_all_recent_lectures,
} from "../../../actions/lectureActions";
import { get_All_user } from "../../../actions/userListActions";
import { sendWhatsApp_message } from "../../../actions/whatsAppAction";
 import "./lecture.css";
import DemoTable from "./DemoTable";
 import HeaderComp from "../../layout/HeaderComp/HeaderComp";
import "../../divison/allDivision.css";
 
import useSizing from "../../../hooks/useSizing";
import CreateLecture from "./CreateLecture";
import CloseIcon from "@mui/icons-material/Close";
import Note from "../../layout/note/Note";
import { setAlldivisions } from "../../../actions/divisionAction";
 
const MyLecture = (props) => {
  //hooks
  const dispatch = useDispatch();

  const todayBTN = useRef(null);
  const thisMonthBTN = useRef(null);
  const lastWeekBTN = useRef(null);
  const FetchBTN = useRef(null);

  const lectureBTN = useRef(null);
  const practicalBTN = useRef(null);

  //data form store
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const { isUserDetailUpdated, userDetail, loading } = useSelector(
    (state) => state.userDetail
  );

  const {
    divisions,
    division,
    isDivisionUpdated,
  } = useSelector((state) => state.division);

  const { isAllLecturesGained, lectures, isPresentyModified } = useSelector(
    (state) => state.lecture
  );

  const { userList, is_all_user_data_ready } = useSelector(
    (state) => state.userList
  );

  const { theme } = useSelector((state) => state.settings);


  //states
  const [queryForm, set_queryForm] = useState({
    formDate: "",
    toDate: "",
  });

  const [
    selected_lecture_for_manul_attendace,
    set_selected_lecture_for_manul_attendace,
  ] = useState({});

  const [filetList, set_filetList] = useState({
    type: "",
    subject: "",
    batch: "",
  });

  const [gettop_left, set_gettop_left] = useState({
    top: 0,
    left: 0,
  });
  const [Selected_div, setSelected_div] = useState({});
 

  const [listOfStudentBatchViz, set_listOfStudentBatchViz] = useState([]);
  const [batchesList, set_batchesList] = useState([]);
  const [listOFStudentID, set_listOFStudentID] = useState([]);
  const [sortedLectures, set_sortedLectures] = useState([]);
  const [data_for_table, set_data_for_table] = useState([]);
  const [editLEcture_state, seteditLEcture_state] = useState("");
  const [currentDate, set_currentDate] = useState("");
  const [currentSubject, set_currentSubject] = useState("");
  const [typeOfEdit, set_typeOfEdit] = useState("");
  const [selctedBatch, set_selctedBatch] = useState(String);
  const [isViewDamo, set_isViewDamo] = useState(false);
  const [openEditor, set_openEditor] = useState(false);
  const [openManula_atte_Editor, set_openManula_atte_Editor] = useState(false);
  const [open_lecture_form, set_open_lecture_form] = useState(false);
  const [isSend_WhatsApp, set_isSend_WhatsApp] = useState(true);
  const [more_filters, set_more_filters] = useState(false);
  const [display_list, set_display_list] = useState(false);




  
  const styles =  theme === "dark_theme"
      ? {
          div_box: {
            backgroundColor: "#191528",
            color: "white",
          },
          divisionBTNSelected: "divisionBTNSelected_dark",
        }
      : { div_box: {}, divisionBTNSelected: "divisionBTNSelected" }
    


  //code fuctionalty
  const get_studentsList = (params) => {
    const tempOBJ = {
      course: userDetail.course,
      year: params.year,
      div: params.div,
      clgShortName: userDetail.clgShortName,
      department: userDetail.department,
      id:params._id
    };
    dispatch(get_All_user(tempOBJ));
  };

  function formatDate(input) {
    var datePart = input.match(/\d+/g),
      year = datePart[0].substring(0),
      month = datePart[1],
      day = datePart[2];

    return month + "/" + day + "/" + year;
  }

  function formatDateTo_read(input) {
    var datePart = input.match(/\d+/g),
      month = datePart[0].substring(0),
      day = datePart[1],
      year = datePart[2];

    return day + "/" + month + "/" + year;
  }

  const deleteLecture = () => {
    set_openEditor(false);
    dispatch(delete_created_lecture(editLEcture_state, lectures));
  };

  const queryFormChange = (e) => {
    set_queryForm({
      ...queryForm,
      [e.target.name]: e.target.value,
    });
    console.log(queryForm);
  };
  const fetch = () => {
    lastWeekBTN.current.classList.remove(`${props.main.selectedBTN_rev}`);
    FetchBTN.current.classList.add(`${props.main.selectedBTN_rev}`);
    thisMonthBTN.current.classList.remove(`${props.main.selectedBTN_rev}`);
    todayBTN.current.classList.remove(`${props.main.selectedBTN_rev}`);

    const start = formatDate(
      queryForm.formDate.replace("-", "/").replace("-", "/")
    );
    const end = formatDate(
      queryForm.toDate.replace("-", "/").replace("-", "/")
    );
    const startMili = new Date(`${start} 00:00:00`).getTime();
    const endMili = new Date(`${end} 00:00:00`).getTime();

    const dataForReq = {
      id: Selected_div._id,
      from: startMili,
      to: endMili,
    };

    dispatch(get_all_recent_lectures(dataForReq));

    get_studentsList(Selected_div);
  };

  const dataFromLast = (type, e) => {
    set_display_list(true);
    let startMili = 0;
    if (type === "week") {
      // FetchBTN.current.classList.add(`${props.main.selectedBTN_rev}`)
      lastWeekBTN.current.classList.add(`${props.main.selectedBTN_rev}`);
      //  FetchBTN.current.classList.remove(`${props.main.selectedBTN_rev}`);
      thisMonthBTN.current.classList.remove(`${props.main.selectedBTN_rev}`);
      todayBTN.current.classList.remove(`${props.main.selectedBTN_rev}`);

      startMili = new Date().getTime() - 604800000; //last week
    } else if (type === "month") {
      lastWeekBTN.current.classList.remove(`${props.main.selectedBTN_rev}`);
      //   FetchBTN.current.classList.remove(`${props.main.selectedBTN_rev}`);
      thisMonthBTN.current.classList.add(`${props.main.selectedBTN_rev}`);
      todayBTN.current.classList.remove(`${props.main.selectedBTN_rev}`);

      startMili = new Date().getTime() - 2592000000; //last month
    } else if (type === "today") {
      lastWeekBTN.current.classList.remove(`${props.main.selectedBTN_rev}`);
      //   FetchBTN.current.classList.remove(`${props.main.selectedBTN_rev}`);
      thisMonthBTN.current.classList.remove(`${props.main.selectedBTN_rev}`);
      todayBTN.current.classList.add(`${props.main.selectedBTN_rev}`);

      startMili = new Date(); //last today
      startMili.setUTCHours(0, 0, 0, 0);
      startMili = startMili.getTime();
    }
    const endMili = new Date();
    endMili.setUTCHours(23, 59, 59, 999);
    const dataForReq = {
      id: Selected_div._id,
      from: startMili,
      to: endMili.getTime(),
    };

    dispatch(get_all_recent_lectures(dataForReq));
   // get_studentsList();
  };

  const getAttendancePersent = (betaData) => {
    console.log(betaData);
    //here is problem
    console.log(Selected_div === "{}");
    console.log(Selected_div.batches);

    const batchesList = Object.values(Selected_div.batches); 
    const filterdBatch = batchesList.filter((elem) => {
      return elem.name === betaData.batch;
    });

    if (typeof filterdBatch[0] !== "undefined") {

      console.log(betaData.presentStudents.length ,filterdBatch[0].RollTo);
      return (
        (betaData.presentStudents.length / filterdBatch[0].RollTo) *
        1000
      ).toFixed(1); 
    }
  };

  const openRollnumbers = (betaData) => {
    set_selected_lecture_for_manul_attendace(betaData);
    set_listOFStudentID(betaData.presentStudents);
    const batchesList = Object.values(Selected_div.batches);
    const filterdBatch = batchesList.filter((elem) => {
      return elem.name === betaData.batch;
    });

    let p = userList.filter((user) => {
      return (
        parseInt(filterdBatch[0].rollFrom) <= user.rollNumber &&
        parseInt(filterdBatch[0].RollTo) >= user.rollNumber
      );
    });

    p.sort(function (a, b) {
      return a.rollNumber - b.rollNumber;
    });
    set_listOfStudentBatchViz(p);
  };

  //make duplicate lectures

  const DuplicateLecutre = () => {
    let perfectData = selected_lecture_for_manul_attendace;
    delete perfectData["_id"];

    console.log(userDetail);

    perfectData.postedBy = userDetail._id;
    perfectData.faculty = userDetail.Name;
    perfectData.duplicated = true;

    dispatch(create_lecture(perfectData));

    set_openEditor(false);
  };

  const selectStudents = (data) => {
    const { _id } = data;

    if (listOFStudentID.includes(_id)) {
      const index = listOFStudentID.indexOf(_id);
      let newList = listOFStudentID;
      newList.splice(index, 1);
      set_listOFStudentID([...newList]);
    } else {
      set_listOFStudentID([...listOFStudentID, _id]);
    }
  };
  const markAttendace = () => {
    dispatch(
      find_lecture_by_id_and_replace_attendance(
        selected_lecture_for_manul_attendace._id,
        listOFStudentID,
        sortedLectures
      )
    );
    if (isSend_WhatsApp === true) {
      let newData = {
        allStudentData: [],
        type: selected_lecture_for_manul_attendace.type,
        faculty: selected_lecture_for_manul_attendace.faculty,
        subject: selected_lecture_for_manul_attendace.subject,
      };

      for (let i = 0; i < listOfStudentBatchViz.length; i++) {
        if (!listOFStudentID.includes(listOfStudentBatchViz[i]._id)) {
          newData.allStudentData.push({
            name: listOfStudentBatchViz[i].personalInfo.fistName,
            phoneNumber: listOfStudentBatchViz[i].phoneNumber,
            status: "Absent",
          });
        } else {
          newData.allStudentData.push({
            name: listOfStudentBatchViz[i].personalInfo.fistName,
            phoneNumber: listOfStudentBatchViz[i].phoneNumber,
            status: "Present",
          });
        }
      }

      console.log(newData);

      dispatch(sendWhatsApp_message(newData));
    }
    set_openManula_atte_Editor(false);
  };

  //fitering array
  const onFilterChange = (e, batchName) => {
    set_selctedBatch(batchName);

    console.log(e.target.name);
    if (e.target.name === "Lecture" || e.target.name === "Practical") {
      set_filetList({ ...filetList, type: e.target.name });
    } else if (e.target.name === "sortSubject") {
      set_filetList({ ...filetList, subject: e.target.value });
    } else if (e.target.name === "batch") {
      set_filetList({ ...filetList, batch: batchName });
    }

    if (e.target.name === "Lecture") {
      practicalBTN.current.classList.remove(`${props.main.selectedBTN_rev}`);
      lectureBTN.current.classList.add(`${props.main.selectedBTN_rev}`);
    } else if (e.target.name === "Practical") {
      practicalBTN.current.classList.add(`${props.main.selectedBTN_rev}`);
      lectureBTN.current.classList.remove(`${props.main.selectedBTN_rev}`);
    }
  };

  // the exel sheet genrator
  const download = () => {
    let xlData = [];
    let xlData2 = [];
    userList
      .sort((a, b) => a.rollNumber - b.rollNumber)
      .map((data) => {
        xlData.push({
          RollNumber: data.rollNumber,
          name: data.Name ,
        });
      });

    let datestig = [];
    sortedLectures.map((data) => {
      datestig.push(
        formatDateTo_read(new Date(data.timeStamp).toLocaleDateString())
      );
    });

    let a = [];
    let presentyPersentgaeArray = [];

    userList
      .sort((a, b) => a.rollNumber - b.rollNumber)
      .map((student) => {
        let dataAndAttendace = {};

        let numberOfLectureDid = 0;

        sortedLectures.map((lecture, index) => {
          if (lecture.presentStudents.includes(student._id)) {
            numberOfLectureDid += 1;
          }
          if (lecture.presentStudents.includes(student._id)) {
            dataAndAttendace[datestig[index]] = "p";
          } else {
            dataAndAttendace[datestig[index]] = "a";
          }
        });

        a.push(dataAndAttendace);
        presentyPersentgaeArray.push({
          Attendace: `${(
            (numberOfLectureDid / sortedLectures.length) *
            100
          ).toFixed(1)}%`,
        });
      });

    xlData.map((data, index) => {
      xlData2.push({
        ...data,
        ...a[index],
        ...presentyPersentgaeArray[index],
      });
    });

    console.log(xlData2);
    set_data_for_table([...xlData2]);

    set_isViewDamo(true);
  };

  //date formator
  function formatDate(input) {
    var datePart = input.match(/\d+/g),
      year = datePart[0].substring(0),
      month = datePart[1],
      day = datePart[2];

    return month + "/" + day + "/" + year;
  }

  //edit lecture
  const editLecture = (betaData) => {
    console.log(currentDate);
    const newDate = formatDate(currentDate.replace("-", "/").replace("-", "/"));
    const timeStamp = new Date(`${newDate} 00:00:00`).getTime();

    console.log(timeStamp);
    dispatch(
      find_lecture_by_id_and_update_info(
        {
          id: betaData._id,
          timeStamp,
          subject: currentSubject,
          duplicated: false,
        },
        lectures
      )
    );

    seteditLEcture_state("");
  };

  // setting up the list

  const batchListSetter = (e, data) => {
     e.preventDefault();

     
     localStorage.setItem("SelectedDivision",JSON.stringify(data))
     dispatch(setAlldivisions(divisions,data));
    e.currentTarget.classList.add("divisionBTNSelected");
    let a = [];
    Object.values(data.batches).map((data) => {
      if (data.name !== "") {
        a.push(data.name);
      }
    });
    set_batchesList(a);
  };

  //calculating last month attendace for display
  const calculateLast_monthAttendnce = () => {};
 

  //use effect
  // useEffect(() => {
  //   if (isAuthenticated && typeof isUserDetailUpdated === "undefined") {
  //     dispatch(getUserDetailFaculty(user.email));
  //   }
  // }, [isAuthenticated, isUserDetailUpdated]);

  // useEffect(() => {
  //   console.log(divisions);

  //   if (typeof divisions === "undefined") {
  //     dispatch(getAllDivision(userDetail));
  //   } else {
  //     if (
  //       typeof isDividionGeted === "undefined" &&
  //       JSON.stringify(divisions) === JSON.stringify([])
  //     ) {
  //       dispatch(getAllDivision(userDetail));
  //     }
  //   }
  // }, [isUserDetailUpdated]);

  // useEffect(() => {
  //   if (isUserDetailUpdated) {
  //     get_studentsList();
  //   }
  // }, [isUserDetailUpdated]);

  useEffect(() => {
    if (isAllLecturesGained) {
      const sortedFilterdLectres = lectures
        .sort((a, b) => a.timeStamp - b.timeStamp)
        .reverse();
      set_sortedLectures([...sortedFilterdLectres]);
    }
  }, [isAllLecturesGained]);

  //filtes
  useEffect(() => {
    console.log(filetList);

    let filteredList = [...lectures];
    if (filetList.type !== "") {
      filteredList = filteredList.filter(
        (data) => data.type === filetList.type
      );
    }

    if (filetList.subject !== "") {
      filteredList = filteredList.filter(
        (data) => data.subject === filetList.subject
      );
    }

    if (filetList.batch !== "") {
      filteredList = filteredList.filter(
        (data) => data.batch === filetList.batch
      );
    }

    const sortedFilerdList = filteredList
      .sort((a, b) => a.timeStamp - b.timeStamp)
      .reverse();

    set_sortedLectures([...sortedFilerdList]);
  }, [filetList]);


  useEffect(() => {
      setSelected_div(division);
      console.log(division);
      get_studentsList(division); 
  }, [ ])
 
 
  return (
    <Fragment>
       
        <div className="mobleDiv4865" style={props.main.main}>
           

          <HeaderComp type="My Lectures"></HeaderComp>
          {openEditor ? (
            <div
              className="glassTheme folater"
              style={{
                position: "absolute",
                top: gettop_left.top + "px",
                left: gettop_left.left - 120 + "px",
                zIndex: 1,
              }}
            >
              <div id="myDropdown" class="dropdown-content blur">
                <a
                  onClick={() => {
                    set_openEditor(false);
                    set_openManula_atte_Editor(true);
                    set_typeOfEdit("manual");
                  }}
                >
                  Attendance
                </a>
                <a
                  onClick={() => {
                    calculateLast_monthAttendnce();

                    set_openEditor(false);
                    seteditLEcture_state(
                      selected_lecture_for_manul_attendace._id
                    );
                    set_currentSubject(
                      selected_lecture_for_manul_attendace.subject
                    );
                    set_typeOfEdit("infoChange");
                    set_openManula_atte_Editor(true);
                  }}
                >
                  Change Info
                </a>
                <a onClick={DuplicateLecutre}>Duplicate</a>
                <a className="deleteOption" onClick={deleteLecture}>
                  Delete
                </a>
                <a onClick={() => set_openEditor(false)}>close</a>
              </div>
            </div>
          ) : null}
          <span>
            {openManula_atte_Editor ? (
              <div className="manulaAttendace_mobile_div4865 ">
                <div className="mobilediv4632  glassTheme blur ">
                  <div className="cancelIcon margin_10_20">
                    <CloseIcon
                      style={{ background: "white", borderRadius: "50%" }}
                      onClick={() => set_openManula_atte_Editor(false)}
                    ></CloseIcon>
                  </div>

                  {typeOfEdit === "manual" ? (
                    <div>
                      <div className=" flex_column   margin_10_20 gap5  div5468133"  >
                        {is_all_user_data_ready
                          ? listOfStudentBatchViz.map((data) => {
                              return (
                                <span
                                     className= "indi_studnet  padding_5_10 flex_baselineStart_center gap10 border_radius10"
                                     onClick={(e)=>selectStudents(data)}
                                >
                                  <span>
                                    <input type="checkBox"  checked={
                                             listOFStudentID.includes(data._id)
                                                ? "checked"
                                                : null

                                            } 
                                            value={data._id}
                                             />
                                  </span>
                                  <span>

                                  {data.rollNumber}
                                  </span>
                                  <span>

                                  {data.Name}
                                  </span>
                                  
                                </span>
                              );
                            })
                          : null}
                      </div>
                      {/* <input
                        type="checkbox"
                        name=" Send What'sApp"
                        onChange={() => set_isSend_WhatsApp(!isSend_WhatsApp)}
                        defaultChecked
                      /> */}
                      {/* <label for=" Send What'sApp"> Send What'sApp</label> */}
                      <div className="flex_center_center">
                        <button className="btn_ligth " onClick={markAttendace}>
                          Update
                        </button>
                      </div>
                    </div>
                  ) : typeOfEdit === "infoChange" ? (
                    <div className="flex_center_center flex_column">
                      <label
                        className="custom-field one"
                        style={props.main.input.label}
                      >
                        <input
                          type="text"
                          style={props.main.input.input}
                          value={currentSubject}
                          list="SubjectsName"
                          onChange={(e) => set_currentSubject(e.target.value)}
                        />
                        <span class="placeholder" style={props.main.input.span}>
                          subject
                        </span>
                      </label>

                      <label
                        className="custom-field one"
                        style={props.main.input.label}
                      >
                        <input
                          style={props.main.input.input}
                          type="Date"
                          onChange={(e) => set_currentDate(e.target.value)}
                        />
                        <span class="placeholder" style={props.main.input.span}>
                          Date
                        </span>
                      </label>
                      <datalist
                        id="SubjectsName"
                        name="subject"
                        value={currentSubject}
                      >
                        {Selected_div.subjects.map((data) => {
                          return (
                            <option key={data} value={data}>
                              {data}
                            </option>
                          );
                        })}
                      </datalist>
                      <button
                        className="btn_ligth"
                        onClick={() => {
                          editLecture(selected_lecture_for_manul_attendace);
                          set_openEditor(false);
                        }}
                      >
                        update
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
          </span>

          <div className="mobileDiv5656 glassTheme " style={props.main.sub_body}>
            <div className="allDiv_filters_lists_alx_Div ">
              <div className="allDivisions">
                {isDivisionUpdated && isUserDetailUpdated && isAuthenticated ? (
                  divisions.length === 0 ? (
                    <Note
                      msg="Please create a division to access or create lecture"
                      type="empty"
                      btnType="Create Division"
                    >
                      {" "}
                    </Note>
                  ) : (
                    divisions.map((data) => {
                      if (data.status === "inUse") {
                        return (
                          <div
                            className={
                              Selected_div._id === data._id
                                ? `light_btn division ${styles.divisionBTNSelected}`
                                : "light_btn division"
                            }
                            onClick={(e) => {
                              setSelected_div(data);
                              batchListSetter(e, data);
                              get_studentsList(data);
                            
                              set_open_lecture_form(false);
                              set_more_filters(false);
                              set_display_list(false);
                            }}
                            style={props.main.div_box}
                          >
                            <div>
                              <span
                                className="divisionYear"
                                style={props.main.background1}
                              >
                                {data.department}
                              </span>
                            </div>
                            <span className="divisionName">{data.div}</span>
                            <span
                              className="divisionYear"
                              style={props.main.low_Resolution_font}
                            >
                              {data.year}
                            </span>
                          </div>
                        );
                      }
                    })
                  )
                ) : null}
              </div>

             
                <div>
                  {open_lecture_form ? (
                    <div
                      className="div8679641 glassTheme"
                      style={props.main.div_box}
                    >
                      <div className="cancelIcon">
                        <CloseIcon
                          onClick={() => set_open_lecture_form(false)}
                        ></CloseIcon>
                      </div>
                      <CreateLecture
                        userDetail={userDetail}
                        selectedDivision={Selected_div}
                        open_lecture_state={set_open_lecture_form}
                        main={props.main}
                      ></CreateLecture>
                    </div>
                  ) : (
                    <button
                      className="btn_ligth"
                      onClick={() => set_open_lecture_form(true)}
                    >
                      {" "}
                      Create New Lecture
                    </button>
                  )}
                </div>
              

              {typeof Selected_div.batches !== "undefined" ? (
                <div className="filters_lists_alx_Div ">
                  {/*filtes*/}
                  
                  <div className="filters_main_div">
                    <div
                      className="lectureDiv_Sort glassTheme"
                      style={props.main.div_box}
                    >
                      <div>
                        <span className="groupOfButtons">
                          <button
                            className="btn_ligth"
                            ref={todayBTN}
                            onClick={(e) => dataFromLast("today", e)}
                          >
                            Today
                          </button>
                          <button
                            className="btn_ligth"
                            ref={lastWeekBTN}
                            onClick={(e) => dataFromLast("week", e)}
                          >
                            Week
                          </button>
                          <button
                            className="btn_ligth"
                            ref={thisMonthBTN}
                            onClick={(e) => dataFromLast("month", e)}
                          >
                            Month
                          </button>
                        </span>
                      </div>

                      <span
                        onClick={() => set_more_filters(false)}
                        style={{ cursor: "pointer" }}
                        className={
                          more_filters
                            ? "fontLink font_13"
                            : "class_display_none "
                        }
                      >
                        less filtes
                      </span>
                      {more_filters ? (
                        <>
                          <div
                            className={
                              more_filters ? "orLines" : "class_display_none"
                            }
                          >
                            <span>
                              <hr />
                            </span>
                            <h>or</h>
                            <span>
                              <hr />
                            </span>
                          </div>
                          <div
                            className={
                              more_filters
                                ? "DateNInput_div"
                                : "class_display_none"
                            }
                          >
                            <div>
                              <label
                                className="custom-field one"
                                style={props.main.input.label}
                              >
                                <input
                                  type="date"
                                  name="formDate"
                                  style={props.main.input.input}
                                  value={queryForm.formDate}
                                  onChange={queryFormChange}
                                />
                                <span
                                  class="placeholder"
                                  style={props.main.input.span}
                                >
                                  From
                                </span>
                              </label>  
                              <label
                                className="custom-field one"
                                style={props.main.input.label}
                              >
                                <input
                                  type="date"
                                  value={queryForm.toDate}
                                  name="toDate"
                                  style={props.main.input.input}
                                  onChange={queryFormChange}
                                />
                                <span
                                  class="placeholder"
                                  style={props.main.input.span}
                                >
                                  To
                                </span>
                              </label>
                            </div>
                            <button
                              className="btn_ligth primarybg"
                              style={{color:"white"}}
                              ref={FetchBTN}
                              onClick={fetch}
                            >
                              Fetch
                            </button>
                          </div>
                        </>
                      ) : (
                        <div style={props.main.low_Resolution_font}>
                          <span
                            onClick={() => set_more_filters(true)}
                            style={{ cursor: "pointer" }}
                            className={
                              more_filters
                                ? "class_display_none "
                                : "fontLink font_13 "
                            }
                          >
                            more filtes...
                          </span>
                        </div>
                      )}
                    </div>

                    {more_filters ? (
                      <div
                        className="lectureDiv_Sort glassTheme"
                        style={props.main.div_box}
                      >
                        <div>
                          <button
                            className="btn_ligth"
                            name="Lecture"
                            onClick={onFilterChange}
                            ref={lectureBTN}
                          >
                            Lecture
                          </button>
                          <button
                            className="btn_ligth"
                            onClick={onFilterChange}
                            name="Practical"
                            ref={practicalBTN}
                          >
                            Practical
                          </button>
                        </div>
                        <span>
                          {isUserDetailUpdated
                            ? userDetail.subject.map((data) => {
                                return (
                                  <div>
                                    <input
                                      name="sortSubject"
                                      id={data}
                                      onChange={onFilterChange}
                                      value={data}
                                      type="radio"
                                    />
                                    <label htmlFor={data}>{data}</label>
                                  </div>
                                );
                              })
                            : null}
                        </span>
                        <div>
                          {typeof Selected_div.batches === "object"
                            ? batchesList.map((batchName) => {
                                return (
                                  <button
                                    className={
                                      selctedBatch === batchName
                                        ? "divisionBTNSelected btn_ligth"
                                        : "btn_ligth"
                                    }
                                    onClick={(e) => {
                                      onFilterChange(e, batchName);
                                    }}
                                    name="batch"
                                    style={props.main.low_Resolution_font}
                                  >
                                    {batchName}
                                  </button>
                                );
                              })
                            : null}
                        </div>
                      </div>
                    ) : null}
                  </div>


                  {display_list ? (
                    <>
                      {(isAllLecturesGained && is_all_user_data_ready) ||
                      (isPresentyModified && is_all_user_data_ready) ? (
                        lectures.length == 0 ? (
                          <Note msg="No lecture available" type="empty"></Note>
                        ) : (
                          <div
                            className="allLectures_div glassTheme"
                            style={props.main.div_box}
                          >
                            {/*studnets maping*/}
                            <table className="tableAt_lecturs_mobil">
                              <tr>
                                <th>Batch</th>
                                <th>Type</th>
                                <th>Subject</th>

                                <th>Date</th>
                                <th>%Atten</th>
                                <th></th>
                              </tr>
                              {(isAllLecturesGained &&
                                is_all_user_data_ready) ||
                              (isPresentyModified && is_all_user_data_ready)
                                ? sortedLectures.map((betaData) => {
                                    return (
                                      <>
                                        <tr
                                          style={props.main.low_Resolution_font}
                                        >
                                          <th>
                                            {betaData.duplicated ? "*" : null}
                                            <span>{betaData.batch}</span>
                                          </th>
                                          <th>
                                            <span>
                                              {betaData.type.substring(0, 4)}
                                            </span>
                                          </th>

                                          <th>
                                            {/* subject: */}
                                            <span> {betaData.subject}</span>
                                          </th>
                                          <th>
                                            <span>
                                              {formatDateTo_read(
                                                new Date(
                                                  betaData.timeStamp
                                                ).toLocaleDateString()
                                              )}
                                            </span>
                                          </th>

                                          <th>
                                            <span>
                                              {/* Attendace : */}
                                              {getAttendancePersent(betaData)}%
                                            </span>
                                          </th>
                                          <th></th>
                                          <span className="lecturesController">
                                            <div>
                                              <span
                                                onClick={(e) => {
                                                  set_openEditor(true);
                                                  set_gettop_left({
                                                    top: e.clientY,
                                                    left: e.clientX,
                                                  });
                                                  openRollnumbers(betaData);
                                                  seteditLEcture_state(
                                                    betaData._id
                                                  );
                                                }}
                                              >
                                                <MoreVertIcon
                                                  className="fontLink"
                                                  style={
                                                    props.main
                                                      .low_Resolution_font
                                                  }
                                                ></MoreVertIcon>
                                              </span>

                                              {/* 
                                           <button
                                             variant="contained"
                                             className="divisionBTNIcone"
                                             onClick={() => {
                                               seteditLEcture_state(betaData._id);
                                               
                                             }}
                                           >
                                             <ModeEditIcon className="muiIcon"></ModeEditIcon>
                                           </button> */}
                                            </div>
                                          </span>
                                        </tr>
                                      </>
                                    );
                                  })
                                : null}
                            </table>

                            <div
                              className="flex_baselineEnd_center"
                              style={props.main.low_Resolution_font}
                            >
                              <span
                                onClick={download}
                                className="fontLink font_13"
                              >
                                Download data?
                              </span>
                            </div>
                          </div>
                        )
                      ) : <span class="loader"></span>}

                      {/* download selction */}
                      {isViewDamo ? (
                        isAllLecturesGained ? (
                          sortedLectures.length != 0 ? (
                            <div
                              className="divisionDivforLecture glassTheme"
                              style={props.main.div_box}
                            >
                              <div className="flex_baselineEnd_center">
                                <CloseIcon
                                  className="fontLink"
                                  onClick={() => set_isViewDamo(false)}
                                ></CloseIcon>
                              </div>
                              <div>
                                <DemoTable
                                  sheet={data_for_table}
                                  main={props.main}
                                ></DemoTable>
                              </div>
                            </div>
                          ) : null
                        ) : null
                      ) : null}
                    </>
                  ) : null}
                </div>
              ) : null}
            </div>

            <div className="fakeDiv_mobile"></div>
          </div>
        </div>
      
    </Fragment>
  );
};

export default MyLecture;
