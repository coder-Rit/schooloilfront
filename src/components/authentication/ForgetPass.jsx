import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { is_user_exist, login_withoutPassAc } from "../../actions/userActions";
import { genrateOTP_email } from "../../actions/whatsAppAction";
import axios from 'axios'
import "./auth.css";

const ForgetPass = () => {
  const navigateTo = useNavigate();

  const dispatch = useDispatch();
  const [email_State, set_email_State] = useState(String);
  const [OTP_state, set_OTP_state] = useState(String);
  const [user_OTP_state, set_user_OTP_state] = useState(String);
  const [btn_state, set_btn_state] = useState("Get OTP");
  const [msg2, set_msg] = useState("Send OTP");
  const [isOtp_input, set_isOtp_input] = useState(false);
  const [otp_Time, set_otp_Time] = useState(120);



  const { user, isAuthenticated } = useSelector((state) => state.user);

  const freeStyle = {
    span: { background: "#111111", color: "white" },
    input: {
      border: "1px solid white",
      background: "transparent",
      color: "white",
    },
    txt: { color: "white" },
  };
  const startTimer =()=>{    
    const new1  = setInterval(() => {
      set_otp_Time(otp_Time=>otp_Time-1)
    }, 1000);

    setTimeout(() => {
      clearInterval(new1)
     }, 120000);

  }

  const sendOTP = (e) => {
    const _OTP = Math.round(Math.random() * 1000000);
    set_OTP_state(_OTP);
    dispatch(is_user_exist(email_State, _OTP));
    set_btn_state("Login");
  };

  
  const getOTP = async () => {
    const _OTP = Math.round(Math.random() * 1000000);
    set_OTP_state(_OTP);

    const localData = {  email: email_State, OTP: _OTP };
    set_msg("proccessing");
    await axios
      .post(`/api/v1/user/gerateOTP/email`, localData)
      .then((data) => {
        set_msg(data.data.msg);
        set_isOtp_input(true);
        set_otp_Time(120)
         startTimer()
      })
      .catch((err) => {
        set_msg(err.response.data.msg);
        setTimeout(() => {
          set_msg("Send OTP");
        }, 5000);
      });
  };

  

  const login = () => {
    console.log(user_OTP_state, OTP_state);
    if (user_OTP_state == OTP_state) {
      dispatch(login_withoutPassAc(email_State, OTP_state, user_OTP_state));
    } else {
      console.log("invalid otp");
    }
  };

  useEffect(() => {
    console.log(isAuthenticated);
    if (isAuthenticated) {
      navigateTo("/user/settings");
    }
  }, [isAuthenticated]);

  return (
    <Fragment>
      <div className="LoginSignUpContainer"  style={freeStyle.txt}>
      <div className="back">
      <img src={require("../../images/group.jpg")}   alt="" />
      </div>
      <div className="back blur2">

      </div>
        <div className="LoginSignUpBox">
          <h3>Login Without Password</h3>
          <p>
            Enter your user account's verified email address and we will send
            you a OTP .
          </p>
          <label className="custom-field one">
                  <input
                    type="email"
                    required
                    style={freeStyle.input}
                    value={email_State}
                    name="email"
                    onChange={(e)=>set_email_State(e.target.value)}
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                  />
                  <span class="placeholder " style={freeStyle.span}>
                    Email
                  </span>
                </label>
                {
                  <div className="flex_baselineEnd_center">
                    <span
                      onClick={
                        msg2 === "Send OTP" || "Resend OTP" ? getOTP : null
                      }
                      className="fontLink"
                    >
                      {msg2}
                    </span>
                  </div>
                }
                {isOtp_input ? (
                  <label className="custom-field one">
                    <input
                      type="text"
                      required
                      style={freeStyle.input}
                      maxLength="6"
                      value={user_OTP_state}
                      name="OTP"
                      onChange={(e)=>set_user_OTP_state(e.target.value)}
                      id="outlined-basic"
                      label="OTP"
                      variant="outlined"
                    />
                    <span class="placeholder " style={freeStyle.span}>
                      OTP (
                       { otp_Time}
                      s)
                    </span>
                  </label>
                ) : null}

              


          <button
            className="signUpBtn"
            onClick={login}
          >
            LOGIN
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgetPass;
