import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCollegeDetailsByName } from "../../../actions/clgDetailAction";
import CloseIcon from "@mui/icons-material/Close";
import {
  find_division_by_id_and_update_En_number,
  updateDivision,
} from "../../../actions/divisionAction";
import {
  find_student_by_id_and_update_role,
} from "../../../actions/updateUserAction";
import { get_All_user } from "../../../actions/userListActions";

import "./division.css";
import HeaderComp from "../../layout/HeaderComp/HeaderComp";
import useSizing from "../../../hooks/useSizing";

const UpdateDivision_elem = (props) => {
  //hooks
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  //states
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const {   isUserDetailUpdated, userDetail } = useSelector(
    (state) => state.userDetail
  );
  const { userList, is_all_user_data_ready } = useSelector(
    (state) => state.userList
  );
  const {
    division,
    divisions,
    isDividionGeted,
  } = useSelector((state) => state.division);
  const { clgDetail, isValueUdated } = useSelector((state) => state.clgDetail);

  const {  isUsserDetailGainedForViewAccount } =
    useSelector((state) => state.accountDetail);

  //useState
  const [division_State, set_Division_State] = useState({
    div: "",
    _id: "",
    id: "",
    timeTableID:"",
    year: "",
    from: Number,
    To: Number,

    course: Number,

    batch_name1: "",
    batch_name2: "",
    batch_name3: "",
    batch_name4: "",

    RollFrom1: "",
    RollFrom2: "",
    RollFrom3: "",
    RollFrom4: "",

    RollTo1: "",
    RollTo2: "",
    RollTo3: "",
    RollTo4: "",
  });

  const [batches_state, set_Batches_state] = useState({});
  const [CR_array_state, set_CR_array_state] = useState([]);
  const [EN_array_state, set_EN_array_state] = useState([]);
  const [allsubjects, setallsubjects] = useState([]);
  const [currentEn, set_currentEn] = useState("");
  const [OpenCrList, set_OpenCrList] = useState(false);

  //destructor of data

  const {
    _id,
    timeTableID,
    div,
    year,
    from,
    To,
    batch_name1,
    batch_name2,
    batch_name3,
    batch_name4,
    RollFrom1,
    RollFrom2,
    RollFrom3,
    RollFrom4,
    RollTo1,
    RollTo2,
    RollTo3,
    RollTo4,
  } = division_State;

  //code functionality

  const formChange = (e) => {
    if (
      e.target.name === "div" ||
      e.target.name === "batch_name1" ||
      e.target.name === "batch_name2" ||
      e.target.name === "batch_name3" ||
      e.target.name === "batch_name4"
    ) {
      set_Division_State({
        ...division_State,
        [e.target.name]: e.target.value.trim().toUpperCase(),
      });
    } else {
      set_Division_State({
        ...division_State,
        [e.target.name]: e.target.value.trim(),
      });
    }
  };

  const add_Division = (e) => {
    e.preventDefault();
    let perfect_data;
    if (isUserDetailUpdated) {
      perfect_data = {
        _id: _id === "" ? null : _id,
        id: division_State.id === "" ? null : division_State.id,
        div: div,
        timeTableID: timeTableID === "" ? null : timeTableID,
        course: userDetail.course,
        clgShortName: userDetail.clgShortName,
        status:"inUse",
        updatedBy: user._id,
        batches: batches_state,
        department: userDetail.department,
        subjects: allsubjects,
        rollNumbers: {
          from: Number(from),
          To: Number(To),
        },
        year: year,
        CR: CR_array_state,
        EN: EN_array_state,
        batches: {
          batch_1: {
            name: batch_name1,
            rollFrom: RollFrom1,
            RollTo: RollTo1,
          },
          batch_2: {
            name: batch_name2,
            rollFrom: RollFrom2,
            RollTo: RollTo2,
          },
          batch_3: {
            name: batch_name3,
            rollFrom: RollFrom3,
            RollTo: RollTo3,
          },
          batch_4: {
            name: batch_name4,
            rollFrom: RollFrom4,
            RollTo: RollTo4,
          },
        },
      };
    }

    console.log(perfect_data);

    if (is_all_user_data_ready || isUserDetailUpdated || isAuthenticated) {
      dispatch(updateDivision(perfect_data, divisions));
      //  dispatch(change_updated_val());
      navigateTo("/user/tools/divisions");
    }
  };

  // getiing student list

  const get_student_list_sub = () => {
    if (isUserDetailUpdated) {
      const tempOBJ = {
        course: userDetail.course,
        year,
        div,
        clgShortName: userDetail.clgShortName,
        department: userDetail.department,
      };
      dispatch(get_All_user(tempOBJ));
    }
  };

  const get_student_list = (e) => {
    e.preventDefault();
    get_student_list_sub();
    set_OpenCrList(true);
  };

  const changeStudentStatus = (e, data) => {
    console.log(e.target.value);
    if (CR_array_state.includes(e.target.value)) {
      const index = CR_array_state.indexOf(e.target.value);
      let newList = CR_array_state;
      newList.splice(index, 1);
      set_CR_array_state(newList);
    } else {
      set_CR_array_state([...CR_array_state, e.target.value]);
    }

    if (data.role === "CR") {
      dispatch(find_student_by_id_and_update_role(data._id, "student"));
    } else {
      dispatch(find_student_by_id_and_update_role(data._id, "CR"));
    }
  };

  const addEnNumber = () => {
    if (!division.EN.includes(currentEn)) {
      dispatch(
        find_division_by_id_and_update_En_number(division._id, currentEn)
      );
    } else {
      window.prompt("EN number is already present");
    }
  };

  //use effect

  useEffect(() => {
    let SelectedDivision = localStorage.getItem("SelectedDivision");
    if (SelectedDivision) {
      const { div, year, rollNumbers, CR, batches, _id, EN, id, timeTableID } =
        JSON.parse(SelectedDivision);
      set_Division_State({
        _id,
        id,
        div: div,
        timeTableID ,
        year: year,
        from: rollNumbers.from,
        To: rollNumbers.To,
        batch_name1: batches.batch_1.name,
        batch_name2: batches.batch_2.name,
        batch_name3: batches.batch_3.name,
        batch_name4: batches.batch_4.name,
        RollFrom1: batches.batch_1.rollFrom,
        RollFrom2: batches.batch_2.rollFrom,
        RollFrom3: batches.batch_3.rollFrom,
        RollFrom4: batches.batch_4.rollFrom,
        RollTo1: batches.batch_1.RollTo,
        RollTo2: batches.batch_2.RollTo,
        RollTo3: batches.batch_3.RollTo,
        RollTo4: batches.batch_4.RollTo,
      });
      set_CR_array_state(CR);
      set_EN_array_state(EN);
    }
  }, []);


  useEffect(() => {
    if (isUserDetailUpdated) {
      // dispatch(getUserDetailFaculty(user.email));
      dispatch(getCollegeDetailsByName(userDetail.clgShortName));
    }
  }, [isUserDetailUpdated]);



  useEffect(() => {
    if (isValueUdated) {
      if (year !== "") {
        const subject_arrya =
          clgDetail.metaData[userDetail.course][year].subjects[
            userDetail.department
          ];
        setallsubjects(subject_arrya);
      }
    }
  }, [isValueUdated, year]);

  //call the list of students as the role chenges
  useEffect(() => {
    if (isUsserDetailGainedForViewAccount) {
      get_student_list_sub();
    }
  }, [isUsserDetailGainedForViewAccount]);

  return (
    <Fragment>
       <div className="mobleDiv4865" style={props.main.main}>
          <HeaderComp type="Update Division"></HeaderComp>
          <div className=" mobileDiv5656 " style={props.main.sub_body}>
            <div className="div745 gap20 top20">
              <div
                className="updateDivisionDiv glassTheme"
                style={props.main.div_box}
              >
                <form onSubmit={add_Division}>
                  <div className="div4866">
                    <div className="flex flex_column gap10">
                      {/* division */}
                      <div className="flex flex_column gap5">
                        <label>Division</label>
                        <label
                          className="custom-field_small one"
                          style={props.main.input.label}
                        >
                          <input
                            type="text"
                            id="div"
                            required
                            value={div}
                            name="div"
                            style={props.main.input.input}
                            onChange={formChange}
                          />
                          <span
                            class="placeholder"
                            style={props.main.input.span}
                          >
                            Name
                          </span>
                        </label>
                      </div>
                      {/* year */}
                      <div className="">
                        <span htmlFor="groupOFyears">Year</span>
                        {isUserDetailUpdated
                          ? userDetail.year.map((data) => {
                              return (
                                <div
                                  key={data}
                                  id="groupOFyears"
                                  name="groupOFyears"
                                >
                                  <input
                                    type="radio"
                                    required
                                    name="year"
                                    checked={year === data ? "checked" : null}
                                    value={data}
                                    onClick={formChange}
                                  />
                                  <label
                                    htmlFor="val1"
                                    style={props.main.low_Resolution_font}
                                  >
                                    {data}
                                  </label>
                                </div>
                              );
                            })
                          : null}
                      </div>

                      {/* RollNO */}
                      <div className="div4726 ">
                        <span>Roll Numbers</span>
                        <div
                          style={props.main.low_Resolution_font}
                          className="flex_baselineStart_center gap10"
                        >
                          <div className="lable_N_Input_Pack_At_Update_Division">
                            <label
                              className="custom-field_small one"
                              style={props.main.input.label}
                            >
                              <input
                                type="number"
                                required
                                value={from}
                                className="updateInputs inputSize"
                                name="from"
                                onChange={formChange}
                                style={props.main.input.input}
                              />
                              <span
                                className="placeholder"
                                style={props.main.input.span}
                              >
                                From
                              </span>
                            </label>
                          </div>
                          <div className="lable_N_Input_Pack_At_Update_Division">
                            <label
                              className="custom-field_small one inputSize"
                              style={props.main.input.label}
                            >
                              <input
                                type="number"
                                required
                                value={To}
                                className="updateInputs inputSize"
                                name="To"
                                onChange={formChange}
                                style={props.main.input.input}
                              />
                              <span
                                className="placeholder"
                                style={props.main.input.span}
                              >
                                To
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <hr />
                      </div>
                    </div>
                    {/* batch */}
                    <div className="monbileDiv46136 ">
                      <span className="Set_Batches">Set Batches</span>

                      <div className="div4726">
                        <label style={props.main.low_Resolution_font}>
                          1st batch
                        </label>
                        <div className="flex_baselineStart_center gap10">
                          <div className="lable_N_Input_Pack_At_Update_Division">
                            <label
                              className="custom-field_small one"
                              style={props.main.input.label}
                            >
                              <input
                                type="text"
                                name="batch_name1"
                                value={div}
                                className="updateInputs inputSize"
                                onChange={formChange}
                                style={props.main.input.input}
                              />
                              <span
                                className="placeholder"
                                style={props.main.input.span}
                              >
                                Name
                              </span>
                            </label>
                          </div>
                          <div className="lable_N_Input_Pack_At_Update_Division">
                            <label
                              className="custom-field_small one"
                              style={props.main.input.label}
                            >
                              <input
                                type="number"
                                name="RollFrom1"
                                value={from}
                                className="updateInputs inputSize"
                                style={props.main.input.input}
                                onChange={formChange}
                              />
                              <span
                                className="placeholder"
                                style={props.main.input.span}
                              >
                                Roll. From
                              </span>
                            </label>
                          </div>
                          <div className="lable_N_Input_Pack_At_Update_Division">
                            <label
                              className="custom-field_small one"
                              style={props.main.input.label}
                            >
                              <input
                                type="number"
                                name="RollTo1"
                                value={To}
                                className="updateInputs inputSize"
                                style={props.main.input.input}
                                onChange={formChange}
                              />
                              <span
                                className="placeholder"
                                style={props.main.input.span}
                              >
                                Roll. to
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="div4726">
                        <label style={props.main.low_Resolution_font}>
                          2ed batch
                        </label>
                        <div className="flex_baselineStart_center gap10">
                          <div className="lable_N_Input_Pack_At_Update_Division ">
                            <label
                              className="custom-field_small one"
                              style={props.main.input.label}
                            >
                              <input
                                type="text"
                                name="batch_name2"
                                value={batch_name2}
                                className="updateInputs inputSize"
                                style={props.main.input.input}
                                onChange={formChange}
                              />
                              <span
                                className="placeholder"
                                style={props.main.input.span}
                              >
                                Name
                              </span>
                            </label>
                          </div>
                          <div className="lable_N_Input_Pack_At_Update_Division">
                            <label
                              className="custom-field_small one"
                              style={props.main.input.label}
                            >
                              <input
                                type="number"
                                name="RollFrom2"
                                value={RollFrom2}
                                className="updateInputs inputSize"
                                style={props.main.input.input}
                                onChange={formChange}
                              />
                              <span
                                className="placeholder"
                                style={props.main.input.span}
                              >
                                Roll. From
                              </span>
                            </label>
                          </div>
                          <div className="lable_N_Input_Pack_At_Update_Division">
                            <label
                              className="custom-field_small one"
                              style={props.main.input.label}
                            >
                              <input
                                type="number"
                                name="RollTo2"
                                value={RollTo2}
                                className="updateInputs inputSize"
                                style={props.main.input.input}
                                onChange={formChange}
                              />
                              <span
                                className="placeholder"
                                style={props.main.input.span}
                              >
                                Roll. to
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="div4726">
                        <label style={props.main.low_Resolution_font}>
                          3rd batch
                        </label>
                        <div className="flex_baselineStart_center gap10">
                          <div className="lable_N_Input_Pack_At_Update_Division">
                            <label
                              className="custom-field_small one"
                              style={props.main.input.label}
                            >
                              <input
                                type="text"
                                name="batch_name3"
                                value={batch_name3}
                                onChange={formChange}
                                style={props.main.input.input}
                                className="updateInputs inputSize"
                              />
                              <span
                                className="placeholder"
                                style={props.main.input.span}
                              >
                                From
                              </span>
                            </label>
                          </div>
                          <div className="lable_N_Input_Pack_At_Update_Division">
                            <label
                              className="custom-field_small one"
                              style={props.main.input.label}
                            >
                              <input
                                type="number"
                                name="RollFrom3"
                                value={RollFrom3}
                                onChange={formChange}
                                style={props.main.input.input}
                                className="updateInputs inputSize"
                              />
                              <span
                                className="placeholder"
                                style={props.main.input.span}
                              >
                                Roll. From
                              </span>
                            </label>
                          </div>
                          <div className="lable_N_Input_Pack_At_Update_Division">
                            <label
                              className="custom-field_small one"
                              style={props.main.input.label}
                            >
                              <input
                                type="number"
                                name="RollTo3"
                                value={RollTo3}
                                className="updateInputs inputSize"
                                style={props.main.input.input}
                                onChange={formChange}
                              />
                              <span
                                className="placeholder"
                                style={props.main.input.span}
                              >
                                Roll. to
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="div4726">
                        <label style={props.main.low_Resolution_font}>
                          4th batch
                        </label>
                        <div className="flex_baselineStart_center gap10">
                          <div className="lable_N_Input_Pack_At_Update_Division">
                            <label
                              className="custom-field_small one"
                              style={props.main.input.label}
                            >
                              <input
                                type="text"
                                name="batch_name4"
                                className="updateInputs inputSize"
                                value={batch_name4}
                                style={props.main.input.input}
                                onChange={formChange}
                              />
                              <span
                                className="placeholder"
                                style={props.main.input.span}
                              >
                                From
                              </span>
                            </label>
                          </div>
                          <div className="lable_N_Input_Pack_At_Update_Division">
                            <label
                              className="custom-field_small one"
                              style={props.main.input.label}
                            >
                              <input
                                type="number"
                                name="RollFrom4"
                                value={RollFrom4}
                                className="updateInputs inputSize"
                                style={props.main.input.input}
                                onChange={formChange}
                              />
                              <span
                                className="placeholder"
                                style={props.main.input.span}
                              >
                                Roll. From
                              </span>
                            </label>
                          </div>
                          <div className="lable_N_Input_Pack_At_Update_Division">
                            <label
                              className="custom-field_small one"
                              style={props.main.input.label}
                            >
                              <input
                                type="number"
                                name="RollTo4"
                                className="updateInputs inputSize"
                                value={RollTo4}
                                style={props.main.input.input}
                                onChange={formChange}
                              />
                              <span
                                className="placeholder"
                                style={props.main.input.span}
                              >
                                Roll. to
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <input type="submit" className="btn_ligth" value="Update" />
                  </div>
                </form>

                <div>
                  <div className="flex_center_center top20 gap10">
                    <span
                      onClick={get_student_list}
                      className="fontLink"
                      style={props.main.low_Resolution_font}
                    >
                      Select Class Representative
                    </span>
                    {OpenCrList ? (
                      <CloseIcon
                        onClick={() => set_OpenCrList(false)}
                      ></CloseIcon>
                    ) : null}
                  </div>

                  {is_all_user_data_ready && OpenCrList === true
                    ? userList
                        .sort((a, b) => a.rollNumber - b.rollNumber)
                        .map((data) => {
                          return (
                            <div
                              key={data._id}
                              className="userDiv_mobile461313"
                            >
                              <div>
                                <input
                                  type="checkBox"
                                  value={data._id}
                                  checked={
                                    data.role === "CR" ? "checked" : null
                                  }
                                  onClick={(e) => changeStudentStatus(e, data)}
                                />
                              </div>

                              <div>
                                <span>{data.rollNumber} </span>
                              </div>
                              <div>
                                <span>
                                  {data.Name }
                                </span>
                              </div>
                            </div>
                          );
                        })
                    : null}
                </div>
              </div>

              {/* En Number */}
              <div
                className="updateDivisionDiv glassTheme addEnNumber"
                style={props.main.div_box}
              >
                <h4>Add EN Number</h4>

                <div>
                  <label
                    className="custom-field one"
                    style={props.main.input.label}
                  >
                    <input
                      type="text"
                      style={props.main.input.input}
                      onChange={(e) => set_currentEn(e.target.value)}
                    />
                    <span class="placeholder" style={props.main.input.span}>
                      College code
                    </span>
                  </label>

                  <span>
                    <button onClick={addEnNumber} className="btn_ligth">
                      Add
                    </button>
                  </span>
                </div>
                <ul>
                  {isDividionGeted
                    ? division.EN.map((data) => {
                        return <li>{data}</li>;
                      })
                    : null}
                </ul>
              </div>
            </div>
          </div>
        </div>
    </Fragment>
  );
};

export default UpdateDivision_elem;
