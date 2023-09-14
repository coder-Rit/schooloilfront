import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { get_division_by_data } from "../../../actions/divisionAction";
import { create_lecture } from "../../../actions/lectureActions";
import { get_faculty_members_by_data } from "../../../actions/userListActions";
 import ToolsPage from "../toolsPage";
 import ClearIcon from '@mui/icons-material/Clear';

const CreateLecture = (props) => {
  //hooks
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
 
  //use selector

  // const { facultyList, isFacultyListGainByData } = useSelector(
  //   (state) => state.userList
  // );

  //use state
  const [faculty_list_state, set_faculty_list_state] = useState([]);
  const [formData, setFormData] = useState({
    subject: "default",
    faculty: "",
    // range:Number,
    type: "",
    batch: "",
  });
  const { userDetail, isUserDetailUpdated } = useSelector(
    (state) => state.userDetail
  );
  const [batchesList, set_batchesList] = useState([]);

  //code functionality

  const onFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const genrateLecture = (e) => {
    e.preventDefault();
    const d = new Date();
    const utc = d.getTime() + d.getTimezoneOffset() * 60000;
    const nd = new Date(utc + 3600000 * +5.5);
    var Time = nd.getTime();
    console.log(Time);

    const prefectData = {
      subject:
        formData.subject === "default"
          ? props.userDetail.subject[0]
          : formData.subject,
      faculty: `${props.userDetail.Name} `,
      postedBy: props.userDetail._id,
      // coordinates: loaction.coordinates,
      divisionID: props.selectedDivision._id,
      //  range:formData.range,
      batch: formData.batch,
      type: formData.type,
      timeStamp: Time,
      activationStatus: true,
    };

    if (formData.batch != "" && formData.subject != "" && formData.type != "") {
      dispatch(create_lecture(prefectData));
      props.open_lecture_state(false);
    } else {
      alert("sonet");
    }
  };

  // useEffect(() => {
  //   console.log(props);
  //   dispatch(get_faculty_members_by_data(props.userDetail));
  // }, [props]);

  // useEffect(() => {
  //   if (isFacultyListGainByData) {
  //     console.log(facultyList);
  //     let nameList = [];
  //     facultyList.map((data, index) => {
  //       console.log(data.personalInfo.fistName);
  //       const nameString = data.personalInfo.fistName;
  //       nameList.push(nameString);
  //     });
  //     set_faculty_list_state(nameList);
  //   }
  // }, [isFacultyListGainByData]);

  const colorBlack ={color:"black"}

  useEffect(() => {
    console.log(4582);

    const aaraa = Object.keys(props.selectedDivision.batches);
    set_batchesList(aaraa);
  }, []);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <>
      <div className="create_lecture_form" autoComplete="off">
        <label>Type</label>
        <div className="flex gap10" >
          <div className="div98649 flex_center_center gap5 pointer">
            <input
              type="radio"
              name="type"
              value="Lecture"
              onClick={onFormDataChange}
            />
            <label htmlFor="val3"   style={colorBlack}>Lecture</label>
          </div>
          <div  className="div98649 flex_center_center gap5 pointer">
            <input
              type="radio"
              name="type"
              value="Practical"
              onClick={onFormDataChange}
            />
            <label htmlFor="val3"  style={colorBlack}>Practical</label>
          </div>
        </div>

        
        <div>
          <label>Batch</label>
          <div className="batchDiv">

         
          {batchesList.map((data, index) => {
            console.log(props.selectedDivision);
            return (
              <div  className="div986499 flex_baselineStart_center gap5 top10 pointer"> 
                <input
                  type="radio"
                  name="batch"
                  value={props.selectedDivision.batches[data].name}
                  onClick={onFormDataChange}
                />
<div  style={colorBlack}>

                <span >{props.selectedDivision.batches[data].name} </span>
                <span>(</span>

                <span>
                  {props.selectedDivision.batches[data].rollFrom}-
                  {props.selectedDivision.batches[data].RollTo}
                </span>
                <span>)</span>
</div>
              </div>
            );
          })}
           </div>
        </div>

        <div className="flex__center gap5" >


        <div className="custom-field one " style={props.main.input.div}>
          <input
            onChange={onFormDataChange}
            value={
              formData.subject === "default"
                ? props.userDetail.subject[0]
                : formData.subject
            }
            style={props.main.input.input}
            list="SubjectsName"
            name="subject"
          />
          <span class="placeholder" style={props.main.input.span}>
            Subject
          </span>
        </div>

        <datalist id="SubjectsName" name="subject" value={formData.subject}>
          {userDetail.subject.map((data) => {
            return (
              <option key={data} value={data}>
                {data}
              </option>
            );
          })}
        </datalist>
        <span  className="top10">

        <ClearIcon onClick={()=>setFormData({...formData,subject:""})}  ></ClearIcon>
        </span>
          </div>
        <button className="btn_ligth primarybg " style={{color:"white"}} onClick={genrateLecture}>
          Create
        </button>
      </div>
    </>
  );
};

export default CreateLecture;
