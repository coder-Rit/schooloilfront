import React from "react";
import { useState, useEffect } from "react";
import { Fragment, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../actions/userActions";
import axios from "axios";
import DynoLogo from "../layout/Loader/DynoLogo";
import { clearAlert } from "../../actions/alertAction";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { TextField } from "@mui/material";

const Auth = (props) => {
  //loops
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //dom elaements
  const switcherTab = useRef(null);
  const loginTab = useRef(null);
  const registerTabs = useRef(null);

  const { status, msg } = useSelector((state) => state.alert);

  const freeStyle = {
    span: { background: "#111111", color: "white" },
    input: {
      border: "1px solid white",
      background: "transparent",
      color: "white",
    },
    txt: { color: "black" },
  };

  //states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [logiinVal, setlogiinVal] = useState("");
  const [OTP_state, set_OTP_state] = useState(String);
  const [otp_Time, set_otp_Time] = useState(120);
  const [msg2, set_msg] = useState("Send OTP");
  const [isOtp_input, set_isOtp_input] = useState(false);

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    OTP: "",
    role: "student",
  });

  // data form reduc
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  //destructured data
  const { username, email, password, OTP } = userData;

  //fuctionality
  const switchTabs = (e, Tab) => {
    if (Tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTabs.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }

    if (Tab === "signUp") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTabs.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  //login
  const LoginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerDataChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const notify_success = (msg) => toast.success(`  ${msg} 👍 `, props.alert);
  const notify_error = (msg) => toast.error(` ${msg}`, props.alert);
  //register
  const registerSubmit = (e) => {
    e.preventDefault();

    dispatch(register(userData));
    if (OTP_state == OTP) {
      if (OTP === "") {
        notify_error("Please Verify Email.");
      } else {
      }
    } else {
      notify_error("Invalid OTP");
    }
  };

  const startTimer = () => {
    const new1 = setInterval(() => {
      set_otp_Time((otp_Time) => otp_Time - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(new1);
    }, 120000);
  };

  const getOTP = async () => {
    const _OTP = Math.round(Math.random() * 1000000);
    set_OTP_state(_OTP);

    const localData = { username: username, email: email, OTP: _OTP };
    set_msg("proccessing");
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

  //useEffect loops
  useEffect(() => {
    if (isAuthenticated) {
      console.log("logg");
      navigate("/user/account");
      // if (signUp) {
      //   navigate("/update/userDetail");
      // }else{
      // }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isOtp_input) {
      setTimeout(() => {
        set_isOtp_input(false);
        set_msg("Resend OTP");
        set_otp_Time(120);
      }, 120000);
    }
  }, [isOtp_input]);

  useEffect(() => {
    if (status === 1) {
      notify_success(msg);
    }
    if (status === 0) {
      notify_error(msg);
    }
    dispatch(clearAlert());
  }, [status]);

  return (
    <Fragment>
      {loading ? (
        <DynoLogo />
      ) : (
        <Fragment>
          <>
            <div className="floadingOBJ1  border_radius50 "></div>
            <div className="floadingOBJ2  border_radius50 "></div>
            <div className="floadingOBJ3   border_radius50 "></div>
            <div className="floadingOBJ4   border_radius50 "></div>
          </>
          <div
            className="LoginSignUpContainer flex_center_center"
            style={freeStyle.txt}
          >
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme={props.alertMode}
            />

            <div className="LoginSignUpBox  glassTheme whiteBorder">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "signUp")}>SIGNUP</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form
                className="loginForm flex_column gap10   top30"
                ref={loginTab}
                onSubmit={LoginSubmit}
              >
                <TextField
                  id="filled-basic"
                  className="width100per"
                  label="Email"
                  variant="filled"
                  color="secondary"
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />

                <TextField
                  id="filled-basic"
                  className="width100per"
                  label="Password"
                  variant="filled"
                  type="password"
                  maxLength="12"
                  color="secondary"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />

                <Link
                  to="/password/forget"
                  className="forgetLink fontLink"
                  style={freeStyle.txt}
                >
                  Forget Password?
                </Link>

                <input type="submit" value="Login" className="loginBtn" />
              </form>

              <form
                className="signUpForm gap10 top40"
                ref={registerTabs}
                onSubmit={registerSubmit}
              >
                <TextField
                  type="text"
                  required
                  className="width100per  "
                  maxLength="12"
                  value={username.trim()}
                  color="secondary"
                  name="username"
                  onChange={registerDataChange}
                  id="filled-basic"
                  label="EN Number"
                  variant="filled"
                />

<div className="width100per flex_baselineEnd_center flex_column">

                <TextField
                  type="email"
                  required
                  className="  width100per"
                  value={email}
                  color="secondary"
                  name="email"
                  onChange={registerDataChange}
                  id="filled-basic"
                  label="Email"
                  variant="filled"
                />

                {
                  
                    <span
                      onClick={
                        msg2 === "Send OTP" || "Resend OTP" ? getOTP : null
                      }
                      className="fontLink forgetLink top5"
                    >
                      {msg2}
                    </span>
                }
</div>

                {isOtp_input &&otp_Time>0? (
                  <TextField
                    type="text"
                    required
                    maxLength="6"
                    className="width100per  " 
                    value={OTP}
                    name="OTP"
                    onChange={registerDataChange}
                    id="filled-basic"
                    color="secondary"
                    label={`OTP (${otp_Time})`}
                    variant="filled"
                  />
                ) : null}

                <TextField
                  type="text"
                  required
                  maxLength="12"
                  className="width100per  "
                  value={password}
                  name="password"
                  onChange={registerDataChange}
                  id="filled-basic"
                  label="Password"
                  color="secondary"
                  variant="filled"
                />

                <input type="submit" value="Register" className="signUpBtn top30" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Auth;
