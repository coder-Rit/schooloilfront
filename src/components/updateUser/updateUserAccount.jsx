import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
 import {
  getUserDetail,
  getUserDetailFaculty,
  updatefaculty,
  updateUser,
} from "../../actions/updateUserAction";
import SearchedClg from "./SearchClg";
import { updateUserBasicDetail } from "../../actions/userActions";
import { get_division_by_data } from "../../actions/divisionAction";
import axios from "axios";
import { button, Checkbox, Radio } from "@mui/material";
import ToolsPage from "../Tools/toolsPage";
import HeaderComp from "../layout/HeaderComp/HeaderComp";
import useSizing from "../../hooks/useSizing";
import { genrateOTP_mobile } from "../../actions/whatsAppAction";
import Note from "../layout/note/Note"
import "./update_userDetail.css";

const UpdateStudentAccount = (props) => {
  // loops
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const windowSizing = useSizing();

  // data form redux
  const { clgDetail, isValueUdated, loadingClg,isError } = useSelector(
    (state) => state.clgDetail
  );
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const {
    error,
    loading,
    isUserDetailUpdated,
    userDetail,
    isUserDetailUpdated_real,
  } = useSelector((state) => state.userDetail);
  const { isDivisionUpdate, id, division, isIdUploaded, isDividionGeted } =
    useSelector((state) => state.division);
  //states
  const [userInfo, setUserInfo] = useState({
    Name: "",
    department: "",
    email: "",
    phoneNumber: Number,
    div: "",
    course: "",
    rollNumber: Number,
    enNumber: "",
    year: "",
    years: Array,
    role: "",
    degree: "",
    OTP: String,
    clgShortName: "",
  });

  // destructured data
  const {
    // students and faculty
    Name,
    department,
    email,
    phoneNumber,
    div,
    rollNumber,
    enNumber,
    course,
    years,
    OTP,
    year,
    role,
    degree,
    clgShortName,
  } = userInfo;

  const [allSub, setallSub] = useState([]);
  const [selected_subjects, setSelected_subjects] = useState([]);
  const [year_state, setYear_state] = useState([]);
  const [avatarObj, setAvatarObj] = useState({
    public_id: "null",
    url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  });
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState(String);
  const [OTP_state, set_OTP_state] = useState(String);

  const [All_year_subject_data, setAll_year_subject_data] = useState({});
  const [newSubjectEntry, set_newSubjectEntry] = useState(false);

  //functionalty

  //uploading profile images
  const uploadImg = (e) => {
    e.preventDefault();
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dwgtw2ywj",
        uploadPreset: "dq4irjxh",
        folder: "avatars",
        multiple: false,
        max_files: 1,
        maxFileSize: 2000000,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          setAvatarObj({
            public_id: result.info.public_id,
            url: result.info.secure_url,
          });
          setAvatarPreview(result.info.secure_url);
        }
      }
    );
    myWidget.open();
  };

  const InformationUpdator = (e) => {
    //for uploading file
    console.log(userInfo);
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else if (e.target.name === "div") {
      setUserInfo({
        ...userInfo,
        [e.target.name]: e.target.value.toUpperCase().trim(),
      });
    } else if (e.target.name === "enNumber") {
      setUserInfo({
        ...userInfo,
        [e.target.name]: e.target.value.trim().toUpperCase(),
      });
    } else {
      //for normal changes
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }
  };

  const slected_allSubject_Change = (e) => {
    // subjecct remover
    if (selected_subjects.includes(e.target.value)) {
      const index = selected_subjects.indexOf(e.target.value);
      let newList = selected_subjects;
      newList.splice(index, 1);
      setSelected_subjects([...newList]);
    } else {
      setSelected_subjects([...selected_subjects, e.target.value]);
    }
  };

  const change_of_year = (e) => {
    // year remover

    if (year_state.includes(e.target.value)) {
      const index = year_state.indexOf(e.target.value);
      let newList = year_state;
      newList.splice(index, 1);

      setYear_state([...newList]);
    } else {
      setYear_state([...year_state, e.target.value]);
    }
  };

  const udateInfo = async (e) => {
    e.preventDefault();
    console.log(avatarObj);

    let procced_to_update = false;

    if (user.role === "teacher") {
      let perfectUserInfo_forFaculty = {
        
          Name: Name,
          
        department: department,
        email: email,
        phoneNumber: Number(phoneNumber),
        clgShortName: clgShortName,
        degree: degree,
        avatar: avatarObj,
        course: course,
        role: role,
        subject: selected_subjects,
        year: year_state,
      };

      if (year_state.length === 0) {
        window.alert("please select year");
        procced_to_update = false;
      } else {
        if (selected_subjects.length === 0) {
          window.alert("please select subject");

          procced_to_update = false;
        } else {
          dispatch(updatefaculty(perfectUserInfo_forFaculty));

          procced_to_update = true;
        }
      }
    }

    if (user.role === "student") {


      const a = await axios
        .get(
          `/api/v1/division/myDivision/${div}/${course}/${clgShortName}/${year}`
        )
        .then((data) => data.data.division.EN)
        .catch((error) => console.log(error));

      console.log(a);
      if (a.includes(enNumber)) {
        //age calculator
      

        let perfectUserInfo_forStudent = {
          
            Name: Name,
           
           
          department: department,
          email: email,
          avatar: avatar,
          phoneNumber: Number(phoneNumber),
          div: div.trim().toUpperCase(),
          avatar: avatarObj,
          clgShortName: clgShortName,
          course: course,
          enNumber: enNumber,
          role: "student",
          rollNumber: Number(rollNumber),
          year: year,
        };
     
        dispatch(updateUser(perfectUserInfo_forStudent));
        procced_to_update = true;
      } else {
        window.prompt("unvarified En number");
        procced_to_update = false;
      }
    }

    if (procced_to_update) {

      console.log(isUserDetailUpdated);
      console.log(user);
      //  if (user.clgShortName!=clgShortName) {
      //   dispatch(
      //     updateUserBasicDetail({ email: email, clgShortName: clgShortName })
      //   );  
      // }
      navigate("/user/account");
    }
  };

  const fetch_subjects = (e) => {
    e.preventDefault();
    if (All_year_subject_data !== "{}" || department !== "") {
    }
    let p = [];
    year_state.map((data) => {
      All_year_subject_data[data].subjects[department].map((dataa) => {
        p.push(dataa);
      });
    });
    setallSub(p);
  };

  //genrating otp
  const getOTP = (e) => {
    e.preventDefault()
    const _OTP = Math.round(Math.random() * 10000);
    set_OTP_state(_OTP);
    dispatch(genrateOTP_mobile({  phoneNumber, OTP: _OTP }));
  };

  const newEntryBtn = (e) => {
    e.preventDefault();
    set_newSubjectEntry(!newSubjectEntry);
  };

  //useEffect loops

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     if (user.role === "student") {
  //       dispatch(getUserDetail(user.email));
  //     } else {
  //       dispatch(getUserDetailFaculty(user.email));
  //     }
  //   }
  // }, [isAuthenticated]);

  useEffect(() => {
    if (isValueUdated && isAuthenticated) {
      userInfo.clgShortName = clgDetail.clgShortName;
      userInfo.email = user.email;

      // filtering data form userDetails to get allSubject list
      if (isAuthenticated) {
        let allSubjectList;
        if (course !== "") {
          allSubjectList = clgDetail.metaData[course];
          setAll_year_subject_data(allSubjectList);
        }
      }
    }
  }, [isValueUdated, isAuthenticated, course, year, department, year_state]);

  // allSubjects list reseter
  // useEffect(() => {
  //   setSelected_subjects([]);
  // }, [allSub]);

  useEffect(() => {
    if (isUserDetailUpdated) {
      setUserInfo({
        Name: userDetail.Name, 
        course: userDetail.course,
        department: userDetail.department,
        year: userDetail.year,
        degree: userDetail.degree,
        role: userDetail.role,
        email: userDetail.email,
        phoneNumber: userDetail.phoneNumber,
        div: userDetail.div,
        rollNumber: userDetail.rollNumber,
        enNumber: userDetail.enNumber,
        clgShortName: userDetail.clgShortName,
      });
      if (user.role === "teacher") {
        console.log(userDetail.subject);
        setSelected_subjects([...userDetail.subject]);
        setYear_state([...userDetail.year]);
      }

      setAvatarObj({
        public_id: userDetail.avatar.public_id,
        url: userDetail.avatar.url,
      });
    }
  }, [isUserDetailUpdated]);

  useEffect(() => {
    setYear_state(year_state);
  }, [year_state]);

  useEffect(() => {
    if (isUserDetailUpdated_real) {
      navigate("/user/account");
    }
  }, [isUserDetailUpdated_real]);

  useEffect(() => {}, [userDetail]);
  console.log(props);
  return (
    <>
        <div className="mobleDiv4865" style={props.main.main}>
          <HeaderComp type="Update Detail"></HeaderComp>

          <div className="mobileDiv5656 boxShadow" style={props.main.sub_body}>
            {loading ? (
              <Loading /> 
            ) : (
              <form onSubmit={udateInfo}>
                <div className="flex flex_column gap20">
                  <div>

                 
                   <div id="registerImage">
                    <img src={avatarObj.url} alt="Avatar Preview" />
                    <button
                      variant="contained"
                      onClick={uploadImg}
                      className="btn_ligth"
                    >
                      Upload Image
                    </button>

                    <span>
                      Max size : 2MB{" "}
                      <a
                        target="_blank"
                        href="https://www.iloveimg.com/compress-image"
                      >
                        commpress Here
                      </a>
                    </span>
                  </div>
                  </div>

                  <div>
                    <label
                      className="custom-field one"
                      style={props.main.input.label}
                    >
                      <input
                        type="text"
                        required
                        autocomplete="off"
                        value={Name}
                        name="Name"
                        style={props.main.input.input}
                        placeholder="F_name M_name L_name"
                        onChange={InformationUpdator}
                      />
                      <span class="placeholder" style={props.main.input.span}>
                  Full Name
                      </span>
                    </label>
                    

                   
                  </div>

                   

                    <div>
                      <label
                        className="custom-field one"
                        style={props.main.input.label}
                      >
                        <input
                          type="number"
                          required
                          autocomplete="off"
                          name="phoneNumber"
                          value={phoneNumber}
                          style={props.main.input.input}
                          onChange={InformationUpdator}
                        />
                        <span class="placeholder" style={props.main.input.span}>
                          Phone Number
                        </span>
                      </label>

                      {/* <div>
                        Verify Number
                        <button onClick={getOTP}>Get OTP</button>
                        <label
                          className="custom-field one"
                          style={props.main.input.label}
                        >
                          <input
                            type="number"
                             name="OTP"
                             autocomplete="off"
                            value={OTP}
                            style={props.main.input.input}
                            onChange={InformationUpdator}
                          />
                          <span
                            class="placeholder"
                            style={props.main.input.span}
                          >
                            OTP
                          </span>
                        </label>
                      </div> */}
                    </div>
                </div>
                <SearchedClg main={props.main} />
               

                {isValueUdated ? (
                  <div>
                    <div>
                      <span>Courses</span>
                      <div>
                        {isAuthenticated
                          ? isValueUdated
                            ? clgDetail.courses.map((data) => {
                                return (
                                  <div key={data}>
                                    <input style={props.main.redioInput}
                                      type="radio"
                                      required
                                      checked={
                                        course === data ? "checked" : null
                                      }
                                      name="course"
                                      value={data}
                                      onClick={InformationUpdator}
                                    />
                                    <label htmlFor="val1">{data}</label>
                                  </div>
                                );
                              })
                            : null
                          : null}
                      </div>
                    </div>
                    <div>
                      <div>
                        <span>Deparment</span>
                        <div>
                          {clgDetail.departments.map((data) => {
                            return (
                              <div key={data}>
                                <input style={props.main.redioInput}
                                  type="radio"
                                  name="department"
                                  value={data}
                                  checked={
                                    department === data ? "checked" : null
                                  }
                                  onClick={InformationUpdator}
                                />
                                <label htmlFor="val3">{data}</label>
                                <br></br>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <span>Year</span>
                        <div>
                          {user.role === "student"
                            ? clgDetail.years.map((data) => {
                                return (
                                  <div key={data}>
                                    <input style={props.main.redioInput}
                                      type="radio"
                                      checked={year === data ? "checked" : null}
                                      required
                                      name="year"
                                      value={data}
                                      onClick={InformationUpdator}
                                    />
                                    <label htmlFor="val1">{data}</label>
                                  </div>
                                );
                              })
                            : null}
                        </div>
                      </div>
                    </div>
                    {isAuthenticated ? (
                      user.role !== "student" ? (
                        <div>
                          <div>
                            {/* {!newSubjectEntry ? (
                              <div>
                                <span>
                                  {" "}
                                  (your years :{" "}
                                  {isUserDetailUpdated
                                    ? userDetail.year
                                    : "please create new entry"}
                                  )
                                </span>

                                <span>
                                  (selected :{" "}
                                  {isUserDetailUpdated
                                    ? userDetail.subject
                                    : "please create new entry"}
                                  )
                                </span>
                              </div>
                            ) : null} */}
                          </div>

                          {/* <button  className="btn_ligth" variant="contained" onClick={newEntryBtn}>
                            {newSubjectEntry ? "previous" : "new"} entry
                             </button> */}
                        </div>
                      ) : (
                        <div className="   ">
                         

                          <label
                            className="custom-field one"
                            style={props.main.input.label}
                          >
                            <input
                              type="text"
                              autocomplete="off"
                              required
                              name="rollNumber"
                              value={rollNumber}
                              style={props.main.input.input}
                              onChange={InformationUpdator}
                            />
                            <span
                              class="placeholder"
                              style={props.main.input.span}
                            >
                              Roll number
                            </span>
                          </label>

                          <label
                            className="custom-field one"
                            style={props.main.input.label}
                          >
                            <input
                              type="text"
                              autocomplete="off"
                              required
                              maxLength="5"
                              name="div"
                              value={div}
                              style={props.main.input.input}
                              onChange={InformationUpdator}
                            />
                            <span
                              class="placeholder"
                              style={props.main.input.span}
                            >
                              Division
                            </span>
                          </label>

                          <label
                            className="custom-field one"
                            style={props.main.input.label}
                          >
                            <input
                              type="text"
                              autocomplete="off"
                              required
                              name="enNumber"
                              value={enNumber}
                              style={props.main.input.input}
                              onChange={InformationUpdator}
                            />
                            <span
                              class="placeholder"
                              style={props.main.input.span}
                            >
                              EN number
                            </span>
                          </label>
                        </div>
                      )
                    ) : null}

                    <div>
                      {true ? (
                        <>
                          <div>
                            <span>
                            {isValueUdated
                                    ? role === "HOD"
                                      ? "H.O.D. of year"
                                      :   role === "teacher"? "Faculty of":null
                                    : null}{" "}
                            </span>
                            <div>
                              {clgDetail.years.map((data) => {
                                console.log(user.role);
                                return user.role === "teacher" ? (
                                  <>
                                    <div key={data}>
                                      <input
                                      className="checkBox"
                                      
                                        type="checkBox"
                                        id={data}
                                        name={data}
                                        checked={
                                          year_state.includes(data)
                                            ? "checked"
                                            : null
                                        }
                                        value={data}
                                        onClick={change_of_year}
                                      />
                                      <label htmlFor="val1">{data}</label>
                                    </div>
                                  </>
                                ) : null;
                              })}
                            </div>
                          </div>

                          <div>
                            {user.role === "teacher" || user.role === "HOD" ? (
                              <div>
                                <span>Subjects </span>

                                <button
                                  className="btn_ligth"
                                  variant="contained"
                                  onClick={fetch_subjects}
                                >
                                  fetch subjects
                                </button>
                              </div>
                            ) : null}

                            {allSub.length !== 0
                              ? allSub.map((data, index) => {
                                  return (
                                    <div key={data}>
                                      <input
                                      className="checkBox"
                                      
                                        type="checkBox"
                                        id={index}
                                        name={data}
                                        checked={
                                          selected_subjects.includes(data)
                                            ? "checked"
                                            : null
                                        }
                                        value={data}
                                        onClick={slected_allSubject_Change}
                                      />
                                      <label htmlFor="val1">{data}</label>
                                    </div>
                                  );
                                })
                              : null}
                          </div>
                        </>
                      ) : null}
                    </div>

                    {user.role !== "student" ? (
                      <label
                        className="custom-field one"
                        style={props.main.input.label}
                      >
                        <input
                          type="text"
                          required
                          name="degree"
                          autocomplete="off"
                          value={degree} 
                          style={props.main.input.input}
                          onChange={InformationUpdator}
                        />
                        <span class="placeholder" style={props.main.input.span}>
                        Heigest degree
                        </span>
                      </label>
                    ) : null}

                    

                    

                    <div>
                      {user.role !== "student" ? (
                        <div>
                          <div>
                            <span>role</span>

                            <input style={props.main.redioInput}
                              type="radio"
                              name="role"
                              required
                              checked={role === "teacher" ? "Checked" : null}
                              value="teacher"
                              onClick={InformationUpdator}
                            />
                            <label htmlFor="role">Teachar</label>
                            <input style={props.main.redioInput}
                              type="radio"
                              name="role"
                              required
                              checked={role === "HOD" ? "Checked" : null}
                              value="HOD"
                              onClick={InformationUpdator}
                            />
                            <label htmlFor="role">H.O.D</label>
                          </div>
                        </div>
                      ) : null}
                    </div>
                    <input type="submit" value="update" className="btn_ligth" />
                    
                  </div>
                ) : (
                  
                !isError? loadingClg?<span class="loader"></span>:<Note msg= "Please enter the college code to save the changes " type="empty" ></Note>:<Note msg={ `College not found, Invalid college code or college may not registerd`} type="error" ></Note>

                  


                )}
              </form>
            )}
           <div style={{height:"400px"}} ></div>
           </div>

        </div>
    </>
  );
};

export default UpdateStudentAccount;
