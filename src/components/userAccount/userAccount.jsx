import React, { Fragment, useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./userAccount.css";
import {
  getUserDetailFaculty,
  getUserDetailbyEN,
  updateUsers_Email,
} from "../../actions/updateUserAction";
import { useNavigate } from "react-router-dom";

import HeaderComp from "../layout/HeaderComp/HeaderComp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Popup from "../layout/popups/Popup";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PersonIcon from "@mui/icons-material/Person";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import SchoolIcon from "@mui/icons-material/School";
import NumbersIcon from "@mui/icons-material/Numbers";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import CachedIcon from "@mui/icons-material/Cached";

import UploadIcon from "@mui/icons-material/Upload";
import {
  get_division_by_data,
  store_division_data,
} from "../../actions/divisionAction";
import { Skeleton } from "@mui/material";
import NavigationBoxes from "../NavigationBoxs/NavigationBoxes";
import CopyToClipboardButton from "../layout/CopyToClick/CopyToClipboardButton";

const UserAccount = (props) => {
  //loops
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let profileInfoDivRef = useRef(null);

  //state

  const [changeHeightState, setchangeHeightState] = useState(false);
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

  // data form redux
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { userDetail, isUserDetailUpdated } = useSelector(
    (state) => state.userDetail
  );

  //destructured data
  const {
    Name,

    enNumber,

    avatar,
  } = userDetailState;

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

    setchangeHeightState(true);
    chagenHeight();
  };

  const loadDivision = () => {
    dispatch(get_division_by_data(userDetail));
  };

  const chagenHeight = () => {
    if (changeHeightState) {
      profileInfoDivRef.current.classList.add("heightAuto");
      profileInfoDivRef.current.classList.remove("shrinkHeight");
    } else {
      profileInfoDivRef.current.classList.remove("heightAuto");
      profileInfoDivRef.current.classList.add("shrinkHeight");
    }
    setchangeHeightState(!changeHeightState);
  };

  //updateing email

  const updateEmail = () => {
    dispatch(updateUsers_Email({ email: user.email, id: userDetail._id }));
  };

  const arrayForSkt = [0, 1, 8];

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
    setchangeHeightState(true);
    chagenHeight();
  }, []);

  return (
    <Fragment>
      <div className="mobleDiv4865  " style={props.main.main}>
        {userDetail === null ? (
          <Popup main={props.main} type="updateAcc"></Popup>
        ) : null}

        <HeaderComp type="Profile"></HeaderComp>
        {isUserDetailUpdated && isAuthenticated ? (
          <div className=" mobileDiv5656 div486623    gap20 ">
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

<div className="glassTheme whiteBorder" style={props.main.div_box}>

            <div
              className="profileInfoDiv  padding_10_20"
               
              ref={profileInfoDivRef}
            >
              {/* //student */}
              {user.role === "student" ? (
                <div className="flex flex_column gap10">
                  <div className="flex flex_column gap10 ">
                    <div className="flex_baselineStart_center gap20 ">
                      <PersonIcon style={props.main.fontColor2}></PersonIcon>
                      <span className="spanText">{Name}</span>
                    </div>
                    <hr className="hr" />
                    <div className="flex_spaceBtw_center">
                      <div className="flex_baselineStart_center gap20">
                        <EmailIcon style={props.main.fontColor2}></EmailIcon>
                        <span className="spanText">{user.email}</span>
                      </div>
                      {userDetail.email === "NA" ? (
                        <UploadIcon
                          onClick={updateEmail}
                          className="wrapper"
                        ></UploadIcon>
                      ) : null}
                    </div>
                    <hr className="hr" />
                    <div className="flex_baselineStart_center gap20 ">
                      <LocalPhoneIcon
                        style={props.main.fontColor2}
                      ></LocalPhoneIcon>
                      <span className="spanText">{userDetail.phoneNumber}</span>
                    </div>
                  </div>
                  <hr className="hr" />
                  <div className="flex flex_column gap10">
                    <div className="flex_spaceBtw_center">
                      <div className="flex_baselineStart_center gap20">
                        <NumbersIcon
                          style={props.main.fontColor2}
                        ></NumbersIcon>
                        <span id="enNumber"> {enNumber} </span>
                      </div>
                      <CopyToClipboardButton
                        id="ContentCopyIcon"
                        text={enNumber}
                        className="fontLink"
                        style={props.main.fontColor}
                        position={{ vertical: "down", horizontal: "center" }}
                      ></CopyToClipboardButton>
                    </div>
                    <hr className="hr" />
                    <div className="flex_baselineStart_center gap20 ">
                      <AccountBalanceIcon
                        style={props.main.fontColor2}
                      ></AccountBalanceIcon>
                      <span className="spanText">
                        {userDetail.clgShortName}
                      </span>
                    </div>
                    <hr className="hr" />
                    <div className="flex_baselineStart_center gap20 ">
                      <AccessTimeFilledIcon
                        style={props.main.fontColor2}
                      ></AccessTimeFilledIcon>
                      <span className="spanText">{userDetail.year}</span>
                    </div>
                    <hr className="hr" />
                    <div className="flex_spaceBtw_center">
                      <div className="flex_baselineStart_center gap20 ">
                        <MeetingRoomIcon
                          style={props.main.fontColor2}
                        ></MeetingRoomIcon>
                        <span className="spanText">{userDetail.div}</span>
                      </div>
                      <CachedIcon
                        className="fontLink"
                        onClick={loadDivision}
                        style={props.main.fontColor}
                      ></CachedIcon>
                    </div>{" "}
                    <hr className="hr" />
                    <div className="flex_baselineStart_center gap20 ">
                      <NumbersIcon style={props.main.fontColor2}></NumbersIcon>
                      <span className="spanText">{userDetail.rollNumber}</span>
                    </div>{" "}
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex flex_column gap10">
                    <div className="flex_baselineStart_center gap20 ">
                      <PersonIcon style={props.main.fontColor2}></PersonIcon>
                      <span className="spanText">{Name}</span>
                    </div>
                    <hr className="hr" />

                    <div className="flex_baselineStart_center gap20 ">
                      <EmailIcon style={props.main.fontColor2}></EmailIcon>
                      <span className="spanText">{userDetail.email}</span>
                    </div>
                    <hr className="hr" />
                    <div className="flex_baselineStart_center gap20 ">
                      <LocalPhoneIcon
                        style={props.main.fontColor2}
                      ></LocalPhoneIcon>
                      <span className="spanText">{userDetail.phoneNumber}</span>
                    </div>
                    <hr className="hr" />
                    <div className="flex_baselineStart_center gap20 ">
                      <AccountBalanceIcon
                        style={props.main.fontColor2}
                      ></AccountBalanceIcon>
                      <span className="spanText">
                        {userDetail.clgShortName}
                      </span>
                    </div>
                    <hr className="hr" />
                    <div className="flex gap20 ">
                      <DynamicFeedIcon
                        style={props.main.fontColor2}
                      ></DynamicFeedIcon>
                      <div className="flex_baselineStart_center gap10 ">
                        {userDetail.subject.map((sub) => (
                          <span className="myProfileSubject">{sub}</span>
                        ))}
                      </div>
                    </div>
                    <hr className="hr" />

                    <div className="flex_baselineStart_center gap20 ">
                      <WorkspacePremiumIcon
                        style={props.main.fontColor2}
                      ></WorkspacePremiumIcon>
                      <span className="spanText">{userDetail.course}</span>
                    </div>
                    <hr className="hr" />
                    <div className="flex_baselineStart_center gap20 ">
                      <SchoolIcon style={props.main.fontColor2}></SchoolIcon>
                      <span className="spanText">{userDetail.degree}</span>
                    </div>
                    <hr className="hr" />
                    <div className="flex_baselineStart_center gap20 ">
                      <AutoStoriesIcon
                        style={props.main.fontColor2}
                      ></AutoStoriesIcon>

                      <span className="spanText">{userDetail.department}</span>
                    </div>
                  </div>
                </>
              )}
              {/* {isAuthenticated && user.role === "teacher" ? (
                <button onClick={updateAccount} className="btn_ligth">
                  Update profile
                </button>
              ) : null} */}
            </div>
            <div
              className="profileInfoDiv2ed   textRight fontLink font_13 textBtnColro"
              onClick={() => chagenHeight()}
              
            >
              {changeHeightState ? "View more" : "View less"}
            </div>
            </div>

            <NavigationBoxes main={props.main}></NavigationBoxes>

            <div className="fakeDiv_userDetail"></div>
          </div>
        ) : (
          <>
             
          </>
        )}

        {/* //Skeleton */}
        {!isUserDetailUpdated && isAuthenticated ? (
          <div className=" mobileDiv5656 div486623 animate-pulse">
            <div className="flex_center_center ">
              <div className="imgDiv boxShodow">
                <Skeleton
                  variant="circular"
                  sx={{ width: "100%", height: "100%", bgcolor: "grey.350" }}
                />
              </div>
            </div>
            <div className="flex_baselineEnd_center  ">
              <CachedIcon
                className="fontLink"
                onClick={laodUserDetail}
                style={props.main.fontColor}
              ></CachedIcon>
            </div>

            <div className="glassTheme whiteBorder" style={props.main.div_box}>

            <div
              className="profileInfoDiv   padding_10_20"
              ref={profileInfoDivRef}
            >
              <div className="flex flex_column gap10 ">
                {arrayForSkt.map((data) => {
                  return (
                    <>
                      <div className="flex_baselineStart_center gap20 ">
                        <Skeleton
                          variant="circular"
                          width={24}
                          height={24}
                          sx={{ bgcolor: "grey.450" }}
                        />
                        <Skeleton
                          variant="rounded"
                          sx={{
                            width: "80%",
                            height: "24px",
                            bgcolor: "grey.450",
                          }}
                        />
                      </div>
                      <hr
                        className="hr"
                        style={data == 8 ? { display: "none" } : null}
                      />
                    </>
                  );
                })}
              </div>

              {isUserDetailUpdated && isAuthenticated ? (
                <button onClick={updateAccount} className="btn_ligth">
                  Update profile
                </button>
              ) : null}
            </div>
            <div
              className="  profileInfoDiv2ed   textRight fontLink font_13 textBtnColro"
              onClick={() => chagenHeight()}
              
            >
              {changeHeightState ? "View more" : "View less"}
            </div>
            </div>

            <NavigationBoxes main={props.main}></NavigationBoxes>


            <div className="fakeDiv_userDetail"></div>
          </div>
        ) : null}
      </div>
    </Fragment>
  );
};

export default UserAccount;
