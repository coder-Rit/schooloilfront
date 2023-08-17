import React, { useEffect, useRef, useState } from "react";
import HeaderComp from "../../layout/HeaderComp/HeaderComp";
import ToolsPage from "../toolsPage";
import readXlsxFile from "read-excel-file";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import {
  addMultipleStudents,
  getUserDetailbyEN,
  updateUser,
} from "../../../actions/updateUserAction";
import Note from "../../layout/note/Note";
import { make_list_empty } from "../../../actions/userListActions";

const AddStudent = (props) => {
  const dispatch = useDispatch();
  const excel = useRef(null);
  const maual = useRef(null);
  const update = useRef(null);

  const freeStyle = {
    span: { background: "#111111", color: "white" },
    input: {
      border: "1px solid white",
      background: "transparent",
      color: "white",
    },
    txt: { color: "black" },
  };

  const [selected_way, setselected_way] = useState(true);
  const [SeacrchStudent, setSeacrchStudent] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [year, set_year] = useState("0");
  const [div, set_div] = useState("0");
  const [dept, set_dept] = useState("0");
  const [studentList, setstudentList] = useState([]);
  const [Name, setName] = useState("");
  const [PhoneNumber, set_PhoneNumber] = useState("");
  const [rollnumber, Set_rollnumber] = useState("");
  const [EnNumber, Set_EnNumber] = useState("");
  const [Search_EnNumber, Set_Search_EnNumber] = useState("");

  const { isUserDetailUpdated, userDetail, loading } = useSelector(
    (state) => state.userDetail
  );

  const { userList, is_all_user_data_ready } = useSelector(
    (state) => state.userList
  );

  const field_validtor = () => {
    if (year === 0) {
      return [false, "Please enter the Year"];
    }
    if (div === 0) {
      return [false, "Please enter the Division"];
    }
    if (dept === 0) {
      return [false, "Please enter the Department"];
    }
    return true;
  };

  const extract = () => {
    readXlsxFile(selectedFile).then((data) => {
      console.log(data);
      var json_object = [];

      var i = 0;
      var headers = ["rollNumber", "Name", "phoneNumber", "enNumber"];

      data.map((row, index) => {
        if (i > 0) {
          var temp = {};
          for (var x = 0; x < row.length; x++) {
             if (x===2){
              console.log(row[x]);
              temp[headers[x]] = parseInt(row[x]);
              
            }else{
              temp[headers[x]] = row[x];

            }
          }
          json_object.push({
            ...temp,
            div: div,
            clgShortName: userDetail.clgShortName,
            course: "BE",
            year: year,
            department: dept,
          });
        }
        i++;
      });

      let validate = field_validtor();
      if (validate[0] === false) {
        console.log(validate[1]);
      } else {
        dispatch(addMultipleStudents(json_object));
      }
    });
  };

  const createNupdate = (e) => {
    e.preventDefault();

    let validate = field_validtor();
    if (validate[0] === false) {
      console.log(validate[1]);
    } else {
      let perfectUserInfo_forStudent = {
        Name: Name,

        department: dept,
        phoneNumber: PhoneNumber,
        div: div.trim().toUpperCase(),
        clgShortName: userDetail.clgShortName,
        course: "BE",
        enNumber: EnNumber,
        role: "student",
        rollNumber: rollnumber,
        year: year,
      };

      if (SeacrchStudent) {
        perfectUserInfo_forStudent = {
          ...perfectUserInfo_forStudent,
          _id: userList[0]._id,
        };
      }

      dispatch(updateUser(perfectUserInfo_forStudent));
    }
  };

  const updateBTN = () => {
    setselected_way(null);
    setSeacrchStudent(true);
    dispatch(make_list_empty())

    Set_EnNumber("");
    Set_rollnumber("");
    set_PhoneNumber("");
    setName("");
    set_dept("0");
    set_div("0");
    set_year("0");

    update.current.classList.add("ActiveBTN");
    excel.current.classList.remove("ActiveBTN");
    maual.current.classList.remove("ActiveBTN");
   };
   const excelBTN =()=>{

     setselected_way(true);
    setSeacrchStudent(false);

    excel.current.classList.add("ActiveBTN");

    update.current.classList.remove("ActiveBTN");
    maual.current.classList.remove("ActiveBTN");
  }
  
  const maualBTN =()=>{
    
    setselected_way(false);
    setSeacrchStudent(false);
    
    maual.current.classList.add("ActiveBTN");
    update.current.classList.remove("ActiveBTN");
    excel.current.classList.remove("ActiveBTN");
    }

  const searchSTD = () => {
    dispatch(getUserDetailbyEN(Search_EnNumber, "teacher"));
  };

  useEffect(() => {
    excel.current.classList.add("ActiveBTN");
    if (is_all_user_data_ready) {
      const { Name, department, div, enNumber, rollNumber, year, phoneNumber } =
        userList[0];
      Set_EnNumber(enNumber);
      Set_rollnumber(rollNumber);
      set_PhoneNumber(phoneNumber);
      setName(Name);
      set_dept(department);
      set_div(div);
      set_year(year);
    }
  }, [is_all_user_data_ready]);

  return (
    <div className="mobleDiv4865" style={props.main.main}>
      <HeaderComp type="Add Students"></HeaderComp>

      <div
        className="mobileDiv5656 markDiv4564 flex_column gap30 "
        style={props.main.sub_body}
      >
        <div className="flex_center_center  div4564313 pointer">
          <span
          onClick={excelBTN}
             
            ref={excel}
            >
            Excel
          </span>
          <span
          onClick={maualBTN}
          
          ref={maual}
          >
            Manual
          </span>
          <span onClick={updateBTN}
            ref={update}
          >Update</span>
        </div>
        {SeacrchStudent ? (
          <div>
            <input
              type="text"
              placeholder="Search By EN number"
              onChange={(e) => Set_Search_EnNumber(e.target.value)}
            />
            <button onClick={searchSTD}>Search</button>
          </div>
        ) : null}
        <div className="div16548 flex">
          <div className="div765139 flex_column gap10">
            <>
              <div className="option43213 flex_spaceBtw_center">
                <label for="year">Choose a Year</label>

                <select
                  name="year"
                  id="year"
                  style={{
                    width: "100px",
                    height: "20px",
                    borderRadius: "5px",
                  }}
                  value={year}
                  required
                  onChange={(e) => set_year(e.target.value)}
                >
                  <option value="0">Choose</option>
                  <option value="1st_year">1st year</option>
                  <option value="2nd_year">2ed year</option>
                  <option value="3rd_year">3rd year</option>
                  <option value="4th_year">4th year</option>
                </select>
              </div>

              <div className="option43213 flex_spaceBtw_center">
                <label for="department">Choose a Department</label>

                <select
                  name="department"
                  id="department"
                  style={{
                    width: "100px",
                    height: "20px",
                    borderRadius: "5px",
                  }}
                  value={dept}
                  onChange={(e) => set_dept(e.target.value)}
                >
                  <option value="0">Choose</option>
                  <option value="CS">CS</option>
                  <option value="IT">IT</option>
                  <option value="EnTC">EnTC</option>
                  <option value="CIVIL">CIVIL</option>
                  <option value="MECH">MECH</option>
                </select>
              </div>
              <div className="option43213 flex_spaceBtw_center">
                <label for="Division">Choose a Division</label>

                <select
                  name="Division"
                  id="Division"
                  style={{
                    width: "100px",
                    height: "20px",
                    borderRadius: "5px",
                  }}
                  value={div}
                  onChange={(e) => set_div(e.target.value)}
                >
                  <option value="0">Choose</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                  <option value="G">G</option>
                  <option value="H">H</option>
                </select>
              </div>
            </>

            {selected_way ? (
              <>
                <div style={{ marginTop: "20px" }}>
                  <span>Please select the EXCEL file.</span>
                  <Note
                    msg="The columns in excel sheet should be RollNumber | Name | phoneNumber | EnNumber"
                    type="empty"
                  ></Note>

                  <input
                    type="file"
                    placeholder="che"
                    accept=".xlsx"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                  />
                </div>
                <button onClick={extract} className="btn_ligth">
                  Add Students
                </button>
              </>
            ) : !selected_way ? (
              <>
                <form onSubmit={createNupdate}>
                  <label className="custom-field one">
                    <input
                      type="text"
                      required
                      style={freeStyle.input}
                      value={Name}
                      name="Name"
                      id="outlined-basic"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <span class="placeholder " style={freeStyle.span}>
                      Name
                    </span>
                  </label>

                  <div className="custom-field one">
                    <input
                      type="number"
                      required
                      name="phoneNumber"
                      style={freeStyle.input}
                      value={PhoneNumber}
                      id="outlined-basic"
                      onChange={(e) => set_PhoneNumber(e.target.value)}
                    />
                    <span class="placeholder " style={freeStyle.span}>
                      Phone Number
                    </span>
                  </div>
                  <div className="custom-field one">
                    <input
                      type="number"
                      required
                      name="rollNumber"
                      style={freeStyle.input}
                      value={rollnumber}
                      id="outlined-basic"
                      onChange={(e) => Set_rollnumber(e.target.value)}
                    />
                    <span class="placeholder " style={freeStyle.span}>
                      Roll Number
                    </span>
                  </div>
                  <div className="custom-field one">
                    <input
                      type="string"
                      required
                      name="enNumber"
                      style={freeStyle.input}
                      value={EnNumber}
                      id="outlined-basic"
                      onChange={(e) =>
                        Set_EnNumber(e.target.value.toUpperCase())
                      }
                    />
                    <span class="placeholder " style={freeStyle.span}>
                      En Number
                    </span>
                  </div>

                  <input
                    type="submit"
                    value={SeacrchStudent ? "Update" : "Add Student"}
                    className="btn_ligth"
                  />
                </form>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <ToolsPage></ToolsPage>
    </div>
  );
};

export default AddStudent;
