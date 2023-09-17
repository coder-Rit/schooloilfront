import React from "react";
import { useNavigate } from "react-router-dom";
import "./homePage.css";
import CopyToClipboardButton from "../layout/CopyToClick/CopyToClipboardButton";

const LandingPage = () => {
  const navigateTo = useNavigate();

  const redirectoTO_auth = () => {
    navigateTo("/user/auth");
  };

  return (
    <>
    
      <>
        <img src="./Images/pattern.svg" className="patternBG" alt="" />
        <div className="mover"></div>
      </>
      <div className="langing_page ">
        <div className="flex_column contentdiv ">
          <h1 className="top20">Welcome To Schooloil.online V2.0</h1>
          <span className="subTitile">- A School Manegment Application</span>
          <p className="top20">
            SchoolOil is a cutting-edge application designed to streamline the
            management of student attendance, lecture schedules, and community
            polls. In addition to these essential features, SchoolOil is
            actively developing file sharing, wait-less printing services, and
            payment gateways.
          </p>
          <p className="top10">
            Furthermore, I am diligently working on implementing an innovative
            automation system to monitor student presence, ensuring a more
            efficient and accurate record of their attendance. With SchoolOil, I
            am committed to revolutionizing the educational experience and
            enhancing administrative efficiency for educational institutions.
          </p>


            <h3>Experience the student and faculty accounts in action!</h3>

          <h4>Student Account Credentials</h4>
          <div>
            <div className="flex gap30">
              <div>
                <span>Email</span>
                <div className="credDiv flex_spaceBtw_center  ">
                  <span>harshraj@gmail.com</span>
                  <span className=" top5 pointer">
                    {" "}
                    <CopyToClipboardButton
                      position={{ vertical: "top", horizontal: "center" }}
                      text="harshraj@gmail.com"
                      primaryFont={{color:"blueviolet"}}
                    ></CopyToClipboardButton>
                    {/*  */}
                  </span>
                </div>
              </div>
              <div>
                <span className="top5">Password</span>
                <div className="credDiv flex_spaceBtw_center  ">
                  <span>harshraj@</span>
                  <span className="top5 pointer">
                    {" "}
                    <CopyToClipboardButton
                      position={{ vertical: "top", horizontal: "center" }}
                      text="harshraj@"
                      primaryFont={{color:"blueviolet"}}
                    ></CopyToClipboardButton>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <h4>Faculty Account Credentials</h4>
          <div className="flex gap30">
            <div>
              <span>Email</span>
              <div className="credDiv flex_spaceBtw_center  ">
                <span>faculty@gmail.com</span>
                <span className="top5 pointer">
                  {" "}
                  <CopyToClipboardButton
                    position={{ vertical: "top", horizontal: "center" }}
                    text="faculty@gmail.com"
                    primaryFont={{color:"blueviolet"}}

                  ></CopyToClipboardButton>
                </span>
              </div>
            </div>
            <div>
              <span>Password</span>
              <div className="credDiv flex_spaceBtw_center  ">
                <span>faculty@</span>
                <span className="top5 pointer">
                  {" "}
                  <CopyToClipboardButton
                    position={{ vertical: "top", horizontal: "center" }}
                    text="faculty@"
                    primaryFont={{color:"blueviolet"}}
                  ></CopyToClipboardButton>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex_center_center">
          <iframe
            src="https://schooloil-client.onrender.com/user/auth"
            className="iframe"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
