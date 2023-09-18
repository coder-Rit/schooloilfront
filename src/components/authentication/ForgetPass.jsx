import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { is_user_exist, login_withoutPassAc } from "../../actions/userActions";
import axios from "axios";
import "./auth.css";
import { TextField } from "@mui/material";

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

   
  const startTimer = () => {
    const new1 = setInterval(() => {
      set_otp_Time((otp_Time) => otp_Time - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(new1);
    }, 120000);
  };

  const sendOTP = (e) => {
    const _OTP = Math.round(Math.random() * 1000000);
    set_OTP_state(_OTP);
    dispatch(is_user_exist(email_State, _OTP));
    set_btn_state("Login");
  };

  const getOTP = async () => {
    const _OTP = Math.round(Math.random() * 1000000);
    set_OTP_state(_OTP);

    const localData = { email: email_State, OTP: _OTP };
    set_msg("proccessing...");
    await axios
      .post(`/api/v1/user/gerateOTP/email`, localData)
      .then((data) => {
        set_msg(data.data.msg);
        set_isOtp_input(true);
        set_otp_Time(120);
        startTimer();
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
      <>
        <div className="floadingOBJ1  border_radius50 "></div>
        <div className="floadingOBJ2  border_radius50 "></div>
        <div className="floadingOBJ3   border_radius50 "></div>
        <div className="floadingOBJ4   border_radius50 "></div>
      </>

      <div className="LoginSignUpContainer   ">
        <div className="LoginSignUpBox  glassTheme whiteBorder top50 padding30 marginLeftAuto marginRightAuto">
          <h3 className="margin0">Login without password</h3>
          <p className="margin0 top5">
            Enter your user account's verified email address and we will send
            you a OTP .
          </p>

          <div className="top20">

          </div>

          <TextField
            id="filled-basic"
            className="width100per"
            label="Email"
            variant="filled"
            color="secondary"
            type="email"
            required
            value={email_State}
            onChange={(e) => set_email_State(e.target.value)}
          />

          {
            <div className="flex_baselineEnd_center top5">
              <span
                onClick={msg2 === "Send OTP" || "Resend OTP" ? getOTP : null}
                className="fontLink forgetLink "
              >
                {msg2}
              </span>
            </div>
          }
          <div className="top10"></div>
          {isOtp_input &&otp_Time>0? (
            
            <TextField
              id="filled-basic"
              className="width100per  "
              label={`OTP (${otp_Time})`}
              variant="filled"
              maxLength="6"
              type="email"
              color="secondary"
              required
              name="OTP"
              onChange={(e) => set_user_OTP_state(e.target.value)}
              value={user_OTP_state}
            />
          ) : null}

          <button className="signUpBtn top20" onClick={login}>
            LOGIN
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgetPass;
