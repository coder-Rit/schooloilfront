import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";

import "./Header.css";
import { useSelector } from "react-redux";

const  HeaderComp = (props) => {
  const navigateTo = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.settings);


  const styles = theme === "dark_theme"
      ? {
          header: {
            backgroundColor: "#000",
            color: "white",
          },
        }
      : { header: {} }
   

  const redirectTobackpage = () => {
    navigateTo(-1);
  };

  const redirectToProfile = () => {
    navigateTo("/user/settings");
  };

  return (
    <div className="componentheader blur4" style={styles.header}>
      <span onClick={redirectTobackpage}>
        <ArrowBackIcon></ArrowBackIcon>
      </span>
      <span>{props.type}</span>
      <span>
        <SettingsIcon  style={window.location.pathname === "/user/settings"
                  ? { color: " #8a2be2" }:{}} onClick={redirectToProfile}></SettingsIcon>
      </span>
    </div>
  );
};

export default HeaderComp;
