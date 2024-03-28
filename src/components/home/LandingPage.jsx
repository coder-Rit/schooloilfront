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
        <img src="./Images/pattern.svg" className="patternBG displayNone_mobile" alt="" />
   </>
      <div className="langing_page ">
        <div className="flex_column contentdiv ">
          <h1 className="top20">Welcome To Schooloil.online V2.0</h1>
          <span className="subTitile">- A School Manegment Application</span>
          <p  style={{marginTop:"30px"}} >
            SchoolOil is a cutting-edge application designed to streamline the
            management of student attendance, lecture schedules, and community
            polls. In addition to these essential features, SchoolOil is
            actively developing file sharing, wait-less printing services,feedback forms, and
            payment gateways.
          </p>
          <p  style={{marginTop:"20px"}} >
            Furthermore, I am diligently working on implementing an innovative
            automation system to monitor student presence, ensuring a more
            efficient and accurate record of their attendance. With SchoolOil, I
            am committed to revolutionizing the educational experience and
            enhancing administrative efficiency for educational institutions.
          </p>

          <h3 className="top40">Experience the student and faculty accounts in action!</h3>

          <div className="flex gap40 top30 div4565463">
            <div className="creadDIv snith glassTheme whiteBorder">
              <h4 className="credHeading">Student Account Credentials</h4>
              <div>
                <div className="  gap30">
                  <div>
                    <span  className="creadPlaceholder">Email</span>
                    <div className="credDiv flex_spaceBtw_center  ">
                      <span  >harshraj@gmail.com</span>
                      <span className=" top5 pointer">
                        {" "}
                        <CopyToClipboardButton
                          position={{ vertical: "top", horizontal: "center" }}
                          text="harshraj@gmail.com"
                          primaryFont={{ color: "blueviolet" }}
                        ></CopyToClipboardButton>
                        {/*  */}
                      </span>
                    </div>
                  </div>
                  <div className="top10">
                    <span  className="creadPlaceholder">Password</span>
                    <div className="credDiv flex_spaceBtw_center  ">
                      <span>harshraj@</span>
                      <span className="top5 pointer">
                        {" "}
                        <CopyToClipboardButton
                          position={{ vertical: "top", horizontal: "center" }}
                          text="harshraj@"
                          primaryFont={{ color: "blueviolet" }}
                        ></CopyToClipboardButton>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="creadDIv snith glassTheme whiteBorder">
              <h4 className="credHeading">Faculty Account Credentials</h4>
              <div className=" gap30">
                <div>
                  <span className="creadPlaceholder">Email</span>
                  <div className="credDiv flex_spaceBtw_center  ">
                    <span>faculty@gmail.com</span>
                    <span className="top5 pointer">
                      {" "}
                      <CopyToClipboardButton
                        position={{ vertical: "top", horizontal: "center" }}
                        text="faculty@gmail.com"
                        primaryFont={{ color: "blueviolet" }}
                      ></CopyToClipboardButton>
                    </span>
                  </div>
                </div>
                <div className="top10">
                  <span className="creadPlaceholder">Password</span>
                  <div className="credDiv flex_spaceBtw_center  ">
                    <span  >faculty@</span>
                    <span className="top5 pointer">
                      {" "}
                      <CopyToClipboardButton
                        position={{ vertical: "top", horizontal: "center" }}
                        text="faculty@"
                        primaryFont={{ color: "blueviolet" }}
                      ></CopyToClipboardButton>
                    </span>
                  </div>
                </div>
              </div>
          
            </div>
          </div>
          <div className="top30"></div>
        </div>
        <div className="flex_center_center flex_column iframeBox">
         <a href="" className="btn_ligth displayNone_destok" src="https://schooloil-client.onrender.com/user/auth" target="_blank">Open app in new Tab</a> 
        
          
          <iframe
            src="https://schooloil-client.onrender.com/user/auth"
            // src="http://localhost:3000/user/auth"
            className="iframe"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
