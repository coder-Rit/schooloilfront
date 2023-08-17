import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//css in parent folder
const LectureDiv = (props) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const { userDetail, isUserDetailUpdated } = useSelector(
    (state) => state.userDetail
  );
  const { timeStamp, faculty, subject, type, presentStudents } =
    props.lectureData;
  const d = new Date(timeStamp);
  const [presenceChacker_state, set_presenceChacker_state] = useState(2);

  const styles = isAuthenticated
    ? user.settings.theme === "dark_theme"
      ? {
          main: {
            backgroundColor: "#190923",
            boxShadow: "1px 2px 29px -15px rgba(137, 43, 226, 0.644)",
            color:"white"
          },

        }
      : { main: {}}
    : { main: {} };

  function formatDate(input) {
    var datePart = input.match(/\d+/g),
      month = datePart[0].substring(0),
      day = datePart[1],
      year = datePart[2];

    return day + "/" + month + "/" + year;
  }

  //checking student is present or not

  const presenceChacker = () => {
    if (presentStudents.includes(userDetail._id)) {
      set_presenceChacker_state(1);
    } else if(presentStudents.length ==0) {
      set_presenceChacker_state(0);
    }
    else {
      set_presenceChacker_state(-1);
    }
  };

  useEffect(() => {
    presenceChacker();
  }, []);

  return (
    <div className="lecturesDiv" style={styles.main}>
       <div > 
            {presenceChacker_state===1 ? <span className="present li"></span> :presenceChacker_state===-1 ? <span className="absent li"></span>:<span className="live li"></span>}
        </div>
      <div>
        <span>{subject}</span>

        <span>
          {type} By {faculty}
        </span> 
 
       
      </div>
      <div>
        {
          presenceChacker_state ===0?<span style={{color:"rgb(0, 210, 0)",fontWeight:"bolder"}}>Live</span>:  <span> {presenceChacker_state ===1?<span style={{color:"rgb(0, 210, 0)",fontWeight:"bolder"}}>PRESENT | </span>:<span style={{color:"rgb(255, 0, 0)",fontWeight:"bolder"}}>ABSENT | </span>}
          Expired at, {formatDate(d.toLocaleDateString())},{d.toLocaleTimeString()} 
        </span>
        }
      
      </div>
    </div>
  );
}; 

export default LectureDiv;
