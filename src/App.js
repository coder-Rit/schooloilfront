import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/authentication/auth";
import UpdateUserAccount from "./components/updateUser/updateUserAccount";
import { useEffect } from "react";
 import { loadUser} from "./actions/userActions";
import HomePage from "./components/home/homePage";
 import Divisions from "./components/Tools/Divisons/divisions";
import UpdateDivision_elem from "./components/Tools/Divisons/updateDivision";
import UpdateTimeTable from "./components/Tools/timeTable/updateTimeTable";
import Avalable_Divisions_For_Time_Table from "./components/Tools/timeTable/avlDivisions";
import ViewTimeTable from "./components/Tools/timeTable/viewTimeTable";
import ClassForStudent from "./components/Tools/Divisons/classForStudent";
 import MyLecture from "./components/Tools/lectures/MyLecture";
import MyStudents from "./components/Tools/Students/MyStudents";
import Student from "./components/Tools/Students/Student";
import AddStudent from "./components/Tools/Students/AddStudent";
import Settings from "./components/setting/Setting";
import ForgetPass from "./components/authentication/ForgetPass";
import { useDispatch, useSelector } from "react-redux";
import {
  
  getUserDetailFaculty,
  getUserDetailbyEN,
  store_faculty_local_data,
  store_student_local_data,
} from "./actions/updateUserAction";
import LandingPage from "./components/home/LandingPage";
import TodaysLectures from "./components/Tools/lectures/TodaysLectures";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { change_theme_setting } from "./actions/settingAction";
import {
  getAllDivision,
  get_division_by_data,
  setAlldivisions,
} from "./actions/divisionAction";
import NotFound from "./components/notFound/NotFound";
   
function App() {
  const dispatch = useDispatch();

  const { user, isAuthenticated, signUp, logIn } = useSelector(
    (state) => state.user
  );
  const { theme } = useSelector((state) => state.settings);
  const { isUserDetailUpdated, userDetail } = useSelector(
    (state) => state.userDetail
  );

  const default_Css = {
    main: {},
    header: {},
    sub_body: {},
    div_box: {},
    BTN: {},
    fontColor: {},
    fontColor2: {
      color:"rgba(0, 0, 0, 1)"
    },
    low_Resolution_font: {},
    redioInput: {},
    input: { lable: {}, input: {}, span: {} },
    background1: {
      backgroundColor: "black",
      color: "white",
    },
    selectedBTN: "selectedBTN",
    selectedBTN_rev: "selectedBTN_rev",
    alertMode:"light"
  };

  console.log();
  const styles =
    theme === "dark_theme"
      ? {
          main: {
            backgroundColor: "#000000",
          },
          header: {
            backgroundColor: "#000000",
            color: "white",
          },
          sub_body: {
            backgroundColor: "#000000",
            color: "white",

          },

          div_box: {
            backgroundColor: "#191528",
            color: "white",
            border:"none"
          },
          BTN: {
            backgroundColor: "#191528",
            color: "white",
          },
          redioInput: {
            accentColor: "red",
          },
          low_Resolution_font: {
            color: "#d8d8d8",
          },
          fontColor: {
            color: "white",
          },
          fontColor2: {
            color: "rgba(255, 255, 255, 1)",
          },
          input: {
            lable: {},
            input: {
              border: "1px solid white",
              color: "white",
            },
            span: {
              backgroundColor: "black",
              color: "white",
            },
          },
          background1: {
            backgroundColor: "white",
            color: "black",
          },
          selectedBTN: "dark_selectedBTN",
          selectedBTN_rev: "dark_selectedBTN_rev",
          alertMode:"dark"
        }
      : default_Css;

      const alertLogic ={
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: theme==="dark_theme"?"dark":"light",
      }

  useEffect(() => {
    const a  = JSON.parse(localStorage.getItem("login"))
    if (a) {
      dispatch(loadUser());
    } 
    console.log("Hare krishna");
  }, []);

  useEffect(() => {
    let theme = localStorage.getItem("theme");
    if (theme) {
      dispatch(change_theme_setting(theme));
    } else {
      localStorage.setItem("theme", "light_theme");
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && logIn) {
      if (user.role === "student") {
        let localData = localStorage.getItem("studentDetail");
        if (localData) {
          dispatch(store_student_local_data(JSON.parse(localData)));
        } else {
          dispatch(getUserDetailbyEN(user.username,"student"));
        }
      } else {
        let localData = localStorage.getItem("teacherDetail");
        if (localData) {
          dispatch(store_faculty_local_data(JSON.parse(localData)));
        } else {
          dispatch(getUserDetailFaculty(user.email));
        }
      }
    }
  }, [isAuthenticated]);

  //list of division

  useEffect(() => {
    if (isAuthenticated && isUserDetailUpdated && user.role === "teacher") {
      let divisionList = JSON.parse(localStorage.getItem("listOFdivisions"));
      let SelectedDivision = JSON.parse(
        localStorage.getItem("SelectedDivision")
      );
      if (divisionList) {
        if (SelectedDivision) {
          dispatch(setAlldivisions(divisionList, SelectedDivision));
        } else {
          dispatch(setAlldivisions(divisionList, divisionList[0]));
        }
      } else {
        dispatch(getAllDivision(userDetail));
      }
    }
    if (isAuthenticated && isUserDetailUpdated && user.role === "user") {
      dispatch(get_division_by_data(userDetail));
    }
  }, [isAuthenticated, isUserDetailUpdated]);

  useEffect(() => {
    if (isAuthenticated) {
      if (user.role === "student") {
        let division = localStorage.getItem("studentDivision");
        if (division) {
          dispatch(setAlldivisions([], JSON.parse(division)));
        } else {
          dispatch(get_division_by_data(userDetail));
        }
      }
    }
  }, [isAuthenticated]);

  //window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <BrowserRouter>
      <Routes>
     
        <Route index element={<LandingPage />} />
        <Route exact path="user/auth" element={<Auth main={styles}  alert ={alertLogic}  />} />
        <Route   path="password/forget" element={<ForgetPass main={styles} />} />

        <Route
          path="user/account"
          exact
          element={<ProtectedRoute Comp={<HomePage main={styles}  alert ={alertLogic} />} />}
        />
        <Route
          path="pdate/userDetail"
          element={
            <ProtectedRoute Comp={<UpdateUserAccount main={styles} />} />
          }
        />

        <Route
          path="user/tools/timeTable"
          element={
            <ProtectedRoute
              Comp={<Avalable_Divisions_For_Time_Table main={styles} />}
            />
          }
        />
        <Route
          path="user/tools/timeTable/inspect"
          element={<ProtectedRoute Comp={<ViewTimeTable main={styles} />} />}
        />
        <Route
          path="user/tools/divisions"
          element={<ProtectedRoute Comp={<Divisions main={styles} />} />}
        />
        <Route
          path="user/tools/divisons/update"
          element={
            <ProtectedRoute Comp={<UpdateDivision_elem main={styles} />} />
          }
        />

        <Route
          path="user/tools/timeTable/update"
          element={<ProtectedRoute Comp={<UpdateTimeTable main={styles} />} />}
        />

        <Route
          path="user/tools/myClass"
          element={<ProtectedRoute Comp={<ClassForStudent main={styles} />} />}
        />
        <Route
          path="user/tools/lectures"
          element={<ProtectedRoute Comp={<TodaysLectures main={styles} />} />}
        />
        <Route
          path="user/tools/myLectures"
          element={<ProtectedRoute Comp={<MyLecture main={styles} />} />}
        />
        <Route
          path="user/tools/myStudents"
          element={<ProtectedRoute Comp={<MyStudents main={styles} />} />}
        />
        <Route
          path="user/settings"
          element={<ProtectedRoute Comp={<Settings main={styles} />} />}
        />
        <Route
          path="user/student"
          element={<ProtectedRoute Comp={<Student main={styles} />} />}
        />
        <Route
          path="addStudent"
          element={<ProtectedRoute Comp={<AddStudent main={styles} />} />}
        />
        <Route
          path="*"
          element={<ProtectedRoute Comp={<NotFound main={styles} />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
