import React from "react";
import { useState, useEffect } from "react";
import { Fragment, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import Loading from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../actions/userActions";
import { Checkbox } from "@mui/material";
import { genrateOTP_email } from "../../actions/whatsAppAction";
import axios from "axios";
import DynoLogo from "../layout/Loader/DynoLogo";
import { clearAlert } from "../../actions/alertAction";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

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
  const { loading, error, isAuthenticated, logIn, signUp } = useSelector(
    (state) => state.user
  );

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

    if (OTP_state == OTP) {
      if (OTP === "") {
        notify_error("Please Verify Email.");
      } else {
        dispatch(register(userData));
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
          <div className="LoginSignUpContainer" style={freeStyle.txt}>
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
            <div className="back">
              <img src={require("../../images/group.jpg")} alt="" />
            </div>
            <div className="back blur2"></div>
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "signUp")}>SIGNUP</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={LoginSubmit}>
                <div style={{ width: "300px", background: "white" }}>
                  <table
                    style={{ border: "1px solid black", fontSize: "15px" }}
                  >
                    <tr>
                      <th style={{ border: "1px solid black" }}>Roll</th>
                      <th style={{ border: "1px solid black" }}>Email</th>
                      <th style={{ border: "1px solid black" }}>Password</th>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid black" }}>faculty</td>
                      <td style={{ border: "1px solid black" }}>
                        faculty@gmail.com
                      </td>
                      <td style={{ border: "1px solid black" }}>faculty@</td>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid black" }}>Student</td>
                      <td style={{ border: "1px solid black" }}>
                        user23@gmail.com
                      </td>
                      <td style={{ border: "1px solid black" }}>user23@</td>
                    </tr>
                  </table>
                </div>
                <label className="custom-field one">
                  <input
                    type="email"
                    required
                    style={freeStyle.input}
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
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
                    type="password"
                    maxLength="12"
                    required
                    style={freeStyle.input}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                  />
                  <span class="placeholder " style={freeStyle.span}>
                    Password
                  </span>
                </label>
                <Link to="/password/forget" style={freeStyle.txt}>
                  Forget Password?
                </Link>

                <input type="submit" value="Login" className="loginBtn" />
              </form>

              <form
                className="signUpForm"
                ref={registerTabs}
                onSubmit={registerSubmit}
              >
                <label className="custom-field one">
                  <input
                    type="text"
                    required
                    style={freeStyle.input}
                    maxLength="12"
                    value={username.trim()}
                    name="username"
                    onChange={registerDataChange}
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                  />
                  <span class="placeholder " style={freeStyle.span}>
                    EN Number
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
                {
                  <div
                    className="flex_baselineEnd_center"
                    style={{ color: "white" }}
                  >
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
                      value={OTP}
                      name="OTP"
                      onChange={registerDataChange}
                      id="outlined-basic"
                      label="OTP"
                      variant="outlined"
                    />
                    <span class="placeholder " style={freeStyle.span}>
                      OTP ({otp_Time}
                      s)
                    </span>
                  </label>
                ) : null}

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

                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Auth;
