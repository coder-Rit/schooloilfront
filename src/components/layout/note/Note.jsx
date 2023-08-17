import React from "react";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import ErrorIcon from "@mui/icons-material/Error";
import "./note.css";
import { useNavigate } from "react-router-dom";
const Note = (props) => {
  const navigateTo = useNavigate();
  let styles = { noteDiv: {} };
  if (props.type === "empty") {
    styles = {
      noteDiv: {
        color: "white",
        backgroundImage: "linear-gradient(to left, #b800b8, #ff0088, #ff5c4f, #ffaf00, #fff600)"
      },
      outterdiv: {},
      Btn: {
        padding: "10px 20px",
        borderRadius: "10px",
        color: "black",
        backgroundColor: " rgb(255, 203, 92)",
        cursor: "pointer",
      },
      msg: {
        fontSize: "13px", 
        color: "white",
      },
    };
  } else if (props.type === "tip") {
    styles = {
      noteDiv: {
        color: "white",

        backgroundImage:
          "  linear-gradient(to left, #9fb800, #8cbd00, #75c300, #54c800, #00cd00)",
      },
      outterdiv: {},
      msg: {
        fontSize: "13px",

        color: "white",
      },
    };
  } else if (props.type === "error") {
    styles = {
      noteDiv: {
        color: "white",
        backgroundImage:" linear-gradient(to right, #ff0000, #ff3900, #ff5300, #ff6700, #ff7900)"
       },
      outterdiv: {},
      msg: {
        fontSize: "13px",

        color: "white",
      },
    };
  } else {
    styles = {
      noteDiv: {},
      outterdiv: {},
      msg: {},
    };
  }

  const redirectToCreateDiv = () => {
    navigateTo("/user/tools/divisions");
  };

  return (
    <div className="outterdiv " style={styles.outterdiv}>
      <div className="noteDiv  gap10 padding_10_20" style={styles.noteDiv}>
        <div className="flex_center_center gap20 ">
          <div>
            {props.type === "tip" ? (
              <TipsAndUpdatesIcon id="muiIcon_tip"></TipsAndUpdatesIcon>
            ) : props.type === "empty" ? (
              <PriorityHighIcon id="muiIcon_note"></PriorityHighIcon>
            ) : props.type === "error" ? (
              <ErrorIcon id="muiIcon_error"></ErrorIcon>
            ) : null}
          </div>
          <div style={styles.msg}>{props.msg}</div>
        </div>
        <div className="flex_baselineEnd_center">
          {props.btnType === "Create Division" ? (
            <button onClick={redirectToCreateDiv} style={styles.Btn}>
              {props.btnType}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Note;
