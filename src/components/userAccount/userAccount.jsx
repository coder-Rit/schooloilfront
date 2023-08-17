import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import "./userAccount.css";
import {
  getUserDetail,
  getUserDetailFaculty,
  getUserDetailbyEN,
  updateUsers_Email,
} from "../../actions/updateUserAction";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import LightModeIcon from "@mui/icons-material/LightMode";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ToolsPage from "../Tools/toolsPage";
import HeaderComp from "../layout/HeaderComp/HeaderComp";
import useSizing from "../../hooks/useSizing";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import Popup from "../layout/popups/Popup";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import TransgenderIcon from "@mui/icons-material/Transgender";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import PersonIcon from "@mui/icons-material/Person";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import SchoolIcon from "@mui/icons-material/School";
import NumbersIcon from "@mui/icons-material/Numbers";
import CakeIcon from "@mui/icons-material/Cake";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import CachedIcon from "@mui/icons-material/Cached";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import RemoveIcon from "@mui/icons-material/Remove";
import UploadIcon from "@mui/icons-material/Upload";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  get_division_by_data,
  store_division_data,
} from "../../actions/divisionAction";
import { registerfaculty } from "../../actions/userActions";

const UserAccount = (props) => {
  //loops
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const windowSizing = useSizing();

  //state
  const [userState, setUserState] = useState({
    username: "",
    clgShortName: "",
  });
  const [currentHeigth, setcurrentHeigth] = useState(0);
  const [userDetailState, setUserDetailState] = useState({
    fistName: "",
    middleName: "",
    lastName: "",
    role: "",
    rollNumber: "",
    enNumber: "",
    avatar: {
      public_id: "",
      url: "",
    },
    department: "",
  });

  const freeStyle = {
    span: { background: "#111111", color: "white" },
    input: {
      border: "1px solid white",
      background: "transparent",
      color: "white",
    },
    txt: { color: "black" },
  };
  // data form redux
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { userDetail, isUserDetailUpdated } = useSelector(
    (state) => state.userDetail
  );

  //destructured data
  const { username } = userState;
  const {
    Name,

    role,
    rollNumber,
    enNumber,
    phoneNumber,
    department,
    avatar,
    clgShortName,
  } = userDetailState;

  const [userData, setUserData] = useState({
    Regusername: "",
    email: "",
    password: "",

    role: "teacher",
  });
  const { Regusername, email, password } = userData;

  //   functionality

  const updateAccount = () => {
    navigate("/update/userDetail");
  };

  const laodUserDetail = () => {
    if (user.role === "student") {
      dispatch(getUserDetailbyEN(user.username, "student"));
    } else {
      dispatch(getUserDetailFaculty(user.email));
    }
  };
  const loadDivision = () => {
    dispatch(get_division_by_data(userDetail));
  };
  const registerDataChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const registerFacultyBTN = (e) => {
    e.preventDefault();
    dispatch(
      registerfaculty({ ...userData, username: userData.Regusername }, user)
    );
  };

  //updateing email

  const updateEmail = () => {
    dispatch(updateUsers_Email({ email: user.email, id: userDetail._id }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (isUserDetailUpdated && user.role === "student") {
        let localDivisionData = localStorage.getItem("studentDivision");
        if (localDivisionData) {
          dispatch(store_division_data(JSON.parse(localDivisionData), []));
        } else {
          dispatch(get_division_by_data(userDetail));
        }
      }
    }
  }, [isUserDetailUpdated, isAuthenticated]);

  // use Effect

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     if (user.role === "student") {
  //       dispatch(getUserDetail(user.email));
  //     } else if(user.role ==="teacher") {
  //       dispatch(getUserDetailFaculty(user.email));
  //     }
  //   }
  // }, [isAuthenticated]);

  useEffect(() => {
    if (
      typeof userDetail === "undefined" ||
      userDetail === "{}" ||
      userDetail === null
    ) {
      setUserDetailState({
        Name: "",

        rollNumber: "",
        role: "",
        phoneNumber: "",
        avatar: {
          public_id: "",
          url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        },
        enNumber: "",
        clgShortName: "",
        department: "",
      });
    } else {
      console.log(userDetail);
      if (isAuthenticated && userDetail) {
        setUserDetailState({
          Name: userDetail.Name,

          department: userDetail.department,
          role: userDetail.role,
          phoneNumber: userDetail.phoneNumber,
          clgShortName: userDetail.clgShortName,
          avatar: {
            punlic_id: userDetail.avatar.public_id,
            url: userDetail.avatar.url,
          },
          enNumber: userDetail.enNumber,
          rollNumber: userDetail.rollNumber,
        });
      }
    }
  }, [userDetail, isUserDetailUpdated, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      setUserState({
        username: user.username,
        clgShortName: user.clgShortName,
      });
    }
  }, [isAuthenticated]);

  return (
    <Fragment>
      {false ? (
        <div className="userAcountMainDiv" style={props.main.main}>
          {/* <ToolsPage></ToolsPage> */}

          {/* <div className="div4661">
            {isUserDetailUpdated && isAuthenticated ? (
              <div className="userAccount">
                <HeaderComp type="Profile"></HeaderComp>

                <div
                  className="div786565 boxShodow"
                  style={props.main.sub_body}
                >
                  <div className="imageNName">
                    <div className="imgDiv boxShodow">
                      <img src={avatar.url} className="ProfileImg" alt="" />
                    </div>

                    <span>
                      {fistName} {middleName} {lastName}
                    </span>

                    <span>
                      {user.role} at {clgShortName}
                    </span>
                  </div>
                  <div className="profileInfoDiv">
                    {user.role === "student" ? (
                      <div>
                        <div>
                          <h3>Personal Information</h3>
                          <div>
                            <span>Age : </span>
                            <span>{userDetail.personalInfo.age}</span>
                          </div>

                          <div>
                            <span>Gender : </span>
                            <span>{userDetail.personalInfo.gender}</span>
                          </div>
                          <div>
                            <span>DOB : </span>{" "}
                            <span>{userDetail.personalInfo.DOB}</span>
                          </div>
                          <div>
                            <span>Mail : </span>
                            <span>{userDetail.email}</span>
                          </div>
                          <div>
                            <span>Phone : </span>
                            <span>{userDetail.phoneNumber}</span>
                          </div>
                        </div>
                        <div>
                          <h3>Educational Information</h3>

                          <div>
                            <span>En number : {enNumber}</span>
                          </div>

                          <div>
                            <span>Roll number : </span>
                            <span>{userDetail.rollNumber}</span>
                          </div>
                          <div>
                            <span>Department : </span>
                            <span>{userDetail.department}</span>
                          </div>

                          <div>
                            <span>College : </span>
                            <span>{userDetail.clgShortName}</span>
                          </div>
                          <div>
                            <span>{userDetail.role}</span>
                          </div>
                          <div>
                            <span>Division : </span>
                            <span>{userDetail.div}</span>
                          </div>

                          <div>
                            <span>Year of study : </span>
                            <span>{userDetail.year}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        {" "}
                        Subjects :
                        {userDetail.subject.map((sub) => (
                          <span className="myProfileSubject">{sub}</span>
                        ))}
                      </div>
                    )}
                    <button
                      variant="contained"
                      onClick={updateAccount}
                      className="divisionBTN"
                    >
                      Update account
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mobileDiv5656 boxShodow">
                <button
                  variant="contained"
                  onClick={updateAccount}
                  className="divisionBTN"
                >
                  Update account
                </button>
              </div>
            )}
          </div> */}
        </div>
      ) : (
        <div className="mobleDiv4865  " style={props.main.main}>
          {userDetail === null ? (
            <Popup main={props.main} type="updateAcc"></Popup>
          ) : null}

          <HeaderComp type="Profile"></HeaderComp>
          {isUserDetailUpdated && isAuthenticated ? (
            <div className=" mobileDiv5656 div486623 flex_column  gap20 ">
              <div className="flex_center_center ">
                <div className="imgDiv boxShodow">
                  <img src={avatar.url} className="ProfileImg" alt="" />
                </div>
              </div>
              <div className="flex_baselineEnd_center  ">
                <CachedIcon
                  className="fontLink"
                  onClick={laodUserDetail}
                  style={props.main.fontColor}
                ></CachedIcon>
              </div>

              <div
                className="profileInfoDiv glassTheme padding_10_20"
                style={props.main.div_box}
              >
                {user.role === "student" ? (
                  <div className="flex flex_column gap10">
                    <div className="flex flex_column gap10 ">
                      <div className="flex_baselineStart_center gap20 ">
                        <PersonIcon></PersonIcon>
                        <span>{Name}</span>
                      </div>
                      <hr className="hr" />
                      <div className="flex_spaceBtw_center   ">
                        <div className="flex_baselineStart_center gap20">
                          <EmailIcon></EmailIcon>
                          <span>{user.email}</span>
                        </div>
                        {userDetail.email == "NA" ? (
                          <UploadIcon
                            onClick={updateEmail}
                            className="wrapper"
                          ></UploadIcon>
                        ) : null}
                      </div>
                      <hr className="hr" />
                      <div className="flex_baselineStart_center gap20 ">
                        <LocalPhoneIcon></LocalPhoneIcon>
                        <span>{userDetail.phoneNumber}</span>
                      </div>

                      <h3>Educational Information</h3>
                    </div>
                    <div className="flex flex_column gap10">
                      <div className="flex_baselineStart_center gap20 ">
                        <NumbersIcon></NumbersIcon>
                        <span id="enNumber">
                          {" "}
                          {enNumber}{" "}
                          <ContentCopyIcon
                            id="ContentCopyIcon"
                            onClick={() => {
                              window.alert("EN number copied");
                              navigator.clipboard.writeText(enNumber);
                            }}
                          ></ContentCopyIcon>
                        </span>
                      </div>
                      <hr className="hr" />
                      <div className="flex_baselineStart_center gap20 ">
                        <AccountBalanceIcon></AccountBalanceIcon>
                        <span>{userDetail.clgShortName}</span>
                      </div>
                      <hr className="hr" />
                      <div className="flex_baselineStart_center gap20 ">
                        <AutoStoriesIcon></AutoStoriesIcon>
                        <span>{userDetail.department}</span>
                      </div>{" "}
                      <hr className="hr" />
                      <div className="flex_baselineStart_center gap20 ">
                        <AccessTimeFilledIcon></AccessTimeFilledIcon>
                        <span>{userDetail.year}</span>
                      </div>
                      <hr className="hr" />
                      <div className="flex_spaceBtw_center">
                        <div className="flex_baselineStart_center gap20 ">
                          <MeetingRoomIcon></MeetingRoomIcon>
                          <span>{userDetail.div}</span>
                        </div>
                        <CachedIcon
                          className="fontLink"
                          onClick={loadDivision}
                          style={props.main.fontColor}
                        ></CachedIcon>
                      </div>{" "}
                      <hr className="hr" />
                      <div className="flex_baselineStart_center gap20 ">
                        <NumbersIcon></NumbersIcon>
                        <span>{userDetail.rollNumber}</span>
                      </div>{" "}
                      <hr className="hr" />
                      <div className="flex_baselineStart_center gap20 ">
                        <TaskAltIcon></TaskAltIcon>
                        <span>{userDetail.role}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex_column gap10">
                      <div className="flex_baselineStart_center gap20 ">
                        <PersonIcon></PersonIcon>
                        <span>{Name}</span>
                      </div>
                      <hr className="hr" />

                      <div className="flex_baselineStart_center gap20 ">
                        <EmailIcon></EmailIcon>
                        <span>{userDetail.email}</span>
                      </div>
                      <hr className="hr" />
                      <div className="flex_baselineStart_center gap20 ">
                        <LocalPhoneIcon></LocalPhoneIcon>
                        <span>{userDetail.phoneNumber}</span>
                      </div>
                      <hr className="hr" />

                      <div className="flex_baselineStart_center gap20 ">
                        <WorkspacePremiumIcon></WorkspacePremiumIcon>
                        <span>{userDetail.course}</span>
                      </div>
                      <hr className="hr" />
                      <div className="flex_baselineStart_center gap20 ">
                        <SchoolIcon></SchoolIcon>
                        <span>{userDetail.degree}</span>
                      </div>
                      <hr className="hr" />
                      <div className="flex_baselineStart_center gap20 ">
                        <AutoStoriesIcon></AutoStoriesIcon>

                        <span>{userDetail.department}</span>
                      </div>
                      <hr className="hr" />
                      <div className="flex_baselineStart_center gap20 ">
                        <AccountBalanceIcon></AccountBalanceIcon>
                        <span>{userDetail.clgShortName}</span>
                      </div>
                      <hr className="hr" />
                      <div className="flex gap20 ">
                        <DynamicFeedIcon></DynamicFeedIcon>
                        <div className="flex_baselineStart_center gap10 ">
                          {userDetail.subject.map((sub) => (
                            <span className="myProfileSubject">{sub}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {isAuthenticated && user.role === "teacher" ? (
                  <button onClick={updateAccount} className="btn_ligth">
                    Update profile
                  </button>
                ) : null}

                {/* <button onClick={BT} className="btn_ligth">
                  connect to BT
                </button> */}
              </div>
              <div className="flex_column gap10">
                {userDetail.role === "HOD" ? (
                  <div
                    className="padding_10_20 border_radius15  "
                    style={props.main.div_box}
                  >
                    <div className="flex flex_spaceBtw_center ">
                      <span>Add faculty Memeber</span>
                      {currentHeigth === 0 ? (
                        <AddIcon
                          className="pointer"
                          onClick={() => {
                            setcurrentHeigth(230);
                          }}
                        ></AddIcon>
                      ) : (
                        <RemoveIcon
                          className="pointer"
                          onClick={() => {
                            setcurrentHeigth(0);
                          }}
                        ></RemoveIcon>
                      )}
                    </div>
                    <div
                      style={{
                        height: `${currentHeigth}px`,
                        overflowY: "hidden",
                      }}
                    >
                      <label className="custom-field one">
                        <input
                          type="text"
                          required
                          style={freeStyle.input}
                          maxLength="12"
                          value={Regusername}
                          name="Regusername"
                          onChange={registerDataChange}
                          id="outlined-basic"
                          label="Regusername"
                          variant="outlined"
                        />
                        <span class="placeholder " style={freeStyle.span}>
                          Username
                        </span>
                      </label>

                      <label className="custom-field one">
                        <input
                          type="email"
                          required
                          style={freeStyle.input}
                          value={email}
                          name="email"
                          onChange={registerDataChange}
                          id="outlined-basic"
                          label="Email"
                          variant="outlined"
                        />
                        <span class="placeholder " style={freeStyle.span}>
                          Email
                        </span>
                      </label>
                      <label className="custom-field one">
                        <input
                          type="text"
                          required
                          style={freeStyle.input}
                          maxLength="12"
                          value={password}
                          name="password"
                          onChange={registerDataChange}
                          id="outlined-basic"
                          label="Password"
                          variant="outlined"
                        />
                        <span class="placeholder " style={freeStyle.span}>
                          Password
                        </span>
                      </label>
                      <button
                        className="btn_ligth"
                        onClick={registerFacultyBTN}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ) : null}
                {userDetail.role === "teacher" || userDetail.role === "HOD" ? (
                  <div
                    className="flex flex_spaceBtw_center padding_10_20 border_radius15"
                    style={props.main.div_box}
                    onClick={() => navigate("/addStudent")}
                  >
                    <span>Add Student</span>
                    <OpenInNewIcon></OpenInNewIcon>
                  </div>
                ) : null}
              </div>
              <div className="fakeDiv_userDetail"></div>
            </div>
          ) : null}

          {!isUserDetailUpdated && isAuthenticated ? (
            <div className=" mobileDiv5656 div486623">
              <div className="flex_center_center ">
                <div className="imgDiv boxShodow">
                  <img src={avatar.url} className="ProfileImg" alt="" />
                </div>
              </div>
              <div
                className="profileInfoDiv glassTheme padding_10_20"
                style={props.main.div_box}
              >
                {user.role === "student" ? (
                  <div className="flex flex_column gap10">
                    <div className="flex flex_column gap10 ">
                      <div className="flex_baselineStart_center gap20 ">
                        <PersonIcon></PersonIcon>
                        <span>not updated</span>
                      </div>
                      <hr className="hr" />
                      <div className="flex_baselineStart_center gap20 ">
                        <EmailIcon></EmailIcon>
                        <span>not updated</span>
                      </div>
                      <hr className="hr" />
                      <div className="flex_baselineStart_center gap20 ">
                        <LocalPhoneIcon></LocalPhoneIcon>
                        <span>not updated</span>
                      </div>

                      <h3>Educational Information</h3>
                    </div>
                    <div className="flex flex_column gap10">
                      <div className="flex_baselineStart_center gap20 ">
                        <NumbersIcon></NumbersIcon>
                        <span>not updated</span>
                      </div>
                      <hr className="hr" />
                      <div className="flex_baselineStart_center gap20 ">
                        <AccountBalanceIcon></AccountBalanceIcon>
                        <span>not updated</span>
                      </div>
                      <hr className="hr" />
                      <div className="flex_baselineStart_center gap20 ">
                        <AutoStoriesIcon></AutoStoriesIcon>
                        <span>not updated</span>
                      </div>{" "}
                      <hr className="hr" />
                      <div className="flex_baselineStart_center gap20 ">
                        <AccessTimeFilledIcon></AccessTimeFilledIcon>
                        <span>not updated</span>{" "}
                      </div>
                      <hr className="hr" />
                      <div className="flex_baselineStart_center gap20 ">
                        <MeetingRoomIcon></MeetingRoomIcon>
                        <span>not updated</span>{" "}
                      </div>{" "}
                      <hr className="hr" />
                      <div className="flex_baselineStart_center gap20 ">
                        <NumbersIcon></NumbersIcon>
                        <span>not updated</span>
                      </div>{" "}
                      <hr className="hr" />
                      <div className="flex_baselineStart_center gap20 ">
                        <TaskAltIcon></TaskAltIcon>
                        <span>not updated</span>
                      </div>{" "}
                      <hr className="hr" />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex_column gap10">
                    <div className="flex_baselineStart_center gap20 ">
                      <PersonIcon></PersonIcon>
                      <span>not updated</span>
                    </div>
                    <hr className="hr" />

                    <div className="flex_baselineStart_center gap20 ">
                      <EmailIcon></EmailIcon>
                      <span>not updated</span>
                    </div>
                    <hr className="hr" />
                    <div className="flex_baselineStart_center gap20 ">
                      <LocalPhoneIcon></LocalPhoneIcon>
                      <span>not updated</span>
                    </div>
                    <hr className="hr" />

                    <div className="flex_baselineStart_center gap20 ">
                      <WorkspacePremiumIcon></WorkspacePremiumIcon>
                      <span>not updated</span>
                    </div>
                    <hr className="hr" />
                    <div className="flex_baselineStart_center gap20 ">
                      <SchoolIcon></SchoolIcon>
                      <span>not updated</span>
                    </div>
                    <hr className="hr" />
                    <div className="flex_baselineStart_center gap20 ">
                      <AutoStoriesIcon></AutoStoriesIcon>

                      <span>not updated</span>
                    </div>
                    <hr className="hr" />
                    <div className="flex_baselineStart_center gap20 ">
                      <AccountBalanceIcon></AccountBalanceIcon>
                      <span>not updated</span>
                    </div>
                    <hr className="hr" />
                    <div className="flex gap20 ">
                      <DynamicFeedIcon></DynamicFeedIcon>
                      <div className="flex_baselineStart_center gap10 ">
                        <span>not updated</span>
                      </div>
                    </div>
                  </div>
                )}

                <button onClick={updateAccount} className="btn_ligth">
                  Update profile
                </button>
              </div>

              <div className="fakeDiv_userDetail"></div>
            </div>
          ) : null}

          <ToolsPage></ToolsPage>
        </div>
      )}
    </Fragment>
  );
};

export default UserAccount;
