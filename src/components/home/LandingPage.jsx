import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./homePage.css";


const LandingPage = () => {
  const navigateTo = useNavigate();

  const redirectoTO_auth = () => {
    navigateTo("/user/auth");
  };
  
   
  useEffect(() => {
    let st =JSON.parse(localStorage.getItem("login"))
    if (st) {
      navigateTo("/user/account");
    }
  
 }, [ ])

  return (
    <>
      <div className="back">
        <img src={require("../../images/group.jpg")} alt="" />
      </div>
      <div className="back blur2"></div>
      <div className="langing_page  flex_column">
        <div
          className="flex_column  flex_center_center z1  "
          style={{ height: "100vh" }}
        >
          <h1 style={{ margin: "0px" }}>Welcome to schoolOil </h1>
          <p>A Learning Management System</p>
          <button onClick={redirectoTO_auth} className="btn_ligth langingBTN">
            SignUp/Login
          </button>
          <div class="container z1">
            <div class="field">
              <div class="mouse"></div>
            </div>
          </div>
        </div>
        <div>
          <h3 style={{ paddingLeft: "10px" }}>Bugs and Solutions</h3>

          <div className="div4632 boxShodow blur">
            <h4>Buffering Time Out Error</h4>
            <p>
              Solution: Restart The Application (Remove From Recent Apps) or
              Check Sometime Latter.
            </p>
          </div>
          <div className="div4632 boxShodow blur">
            <h4>
              Stuck Somewhare In Application Or Redirected To Login Page ?
            </h4>
            <p>Solution: Do a Refresh.</p>
          </div>
          <div className="div4632 boxShodow blur">
            <h4>Something Else ?</h4>
            <p>Solution: Reinstall The Application.</p>
          </div>
        </div>
        <marquee>
          We Are Sorry For The Inconvenience. We Are Trying To Solve This Errors
          To Improve The Experience.
        </marquee>
      </div>
    </>
  );
};

export default LandingPage;
