import React, { useEffect, useState } from "react";
 import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  delete_division,
  find_division_by_data_and_update,
  getAllDivision,
  store_division_data,
  setDivisionID,
  setAlldivisions,
} from "../../actions/divisionAction";
import { useNavigate } from "react-router-dom";
import { getUserDetailFaculty } from "../../actions/updateUserAction";
import { get_All_user, set_All_user } from "../../actions/userListActions";
import "./allDivision.css";
import { make_timeTable_empty, setTimeTbaleDATA } from "../../actions/timeTableAction";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Note from "../layout/note/Note";
import Popup from "../layout/popups/Popup";

const AllDivisions = (props) => {
  //hooks
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  //use state
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { isUserDetailUpdated, userDetail } = useSelector(
    (state) => state.userDetail
  );

  const { isDivisionUpdated, loading, divisions, isDividionGeted,division } =
    useSelector((state) => state.division);
  const { theme } = useSelector((state) => state.settings);


  //state

  const [batchesList, set_batchesList] = useState([]);
  const [Selected_division, setSelected_division] = useState({});
  const [shouldDelete,set_shouldDelete]=useState(Boolean)
  const [deleletConfirm,set_deleletConfirm]=useState("wait")
  const [currentIndex, setcurrentIndex] = useState(Number)

  //

  //styles

  const styles =  theme === "dark_theme"
      ? {
          div_box: {
            backgroundColor: "#191528",
            color: "white",
          },
          divisionBTNSelected: "divisionBTNSelected_dark",
        }
      : { div_box: {}, divisionBTNSelected: "divisionBTNSelected" }
    

  //buttons fuctionalty

  const redirectTOupate_or_create = (data,type) => {
    dispatch(store_division_data(data, divisions));

    if (type==="create") {
      
    dispatch(make_timeTable_empty());
    }
  
    navigateTo("/user/tools/timeTable/update");
  };
  const redirectToinspect = (data) => {
    dispatch(store_division_data(data, divisions));
    navigateTo("/user/tools/myClass");
  };

  // lectures
  // setting up the list

  const batchListSetter = (data) => {
    let a = [];
    Object.values(data.batches).map((data) => {
      if (data.name !== "") {
        a.push(data.name);
      }
    });
    set_batchesList(a);
  };

  const setSelected_div = (data) => {
     dispatch(setAlldivisions(divisions,data));
    localStorage.setItem("SelectedDivision",JSON.stringify(data))
  };
  
  //studnet section
  const getStudentList = (data) => {
    console.log(user);
    const tempOBJ = {
      id:data._id,
      course: userDetail.course,
      year: data.year,
      div: data.div,
      clgShortName: userDetail.clgShortName,
      department: userDetail.department,
    };

    let userList  = JSON.parse(localStorage.getItem(data._id))

    if(userList){
     dispatch(set_All_user(userList))
    }else{
      dispatch(get_All_user(tempOBJ));
    }




  };

  //division sections
  const redirectTOUpdate = (e, data) => {
    e.preventDefault();
    dispatch(store_division_data(data, divisions));
    localStorage.setItem("SelectedDivision",JSON.stringify(data))
    navigateTo("/user/tools/divisons/update");
  };

  const deleteDivision = (e, id, index) => {
    e.preventDefault();
    dispatch(delete_division(id, divisions, index));
  };

  const removeDivision =  async(e, id, index) => {
    e.preventDefault();
    
   
  };
  const TakeInUseDivision = (e, id, index) => {
    e.preventDefault();
    dispatch(
      find_division_by_data_and_update(
        { dataForFinding: { _id: id }, dataForUpdate: { status: "inUse" } },
        divisions,
        index
      )
    );
    dispatch(getAllDivision(userDetail));
  };

  // useEffect(() => {

  //   if (typeof divisions === "undefined") {

  //     dispatch(getAllDivision(userDetail));

  //   }else{
  //     if  ( typeof isDividionGeted ==="undefined" && JSON.stringify(divisions)  ===JSON.stringify([]) ) {
  //     dispatch(getAllDivision(userDetail));
  //    }

  //   }

  //   }, [isUserDetailUpdated]);

  useEffect(() => {
     if (isDivisionUpdated) {
      setSelected_division(division)
      if (props.type==="student") {
        let userList  = JSON.parse(localStorage.getItem(division._id))

        if(userList){
         dispatch(set_All_user(userList))
        }else{
          dispatch(get_All_user(division));
        }
      }

    }
  }, [isDivisionUpdated])


  useEffect(() => {


    if (shouldDelete) {
      console.log(shouldDelete,deleletConfirm);

      if (deleletConfirm==="delete") {
        dispatch(
          find_division_by_data_and_update(
            { dataForFinding: { _id:Selected_division._id  }, dataForUpdate: { status: "onBackUp" } },
            divisions,
            currentIndex,
            "div"
          )
        );
        set_shouldDelete(false)
        set_deleletConfirm("wait")
      }
      
      if(shouldDelete &&  deleletConfirm==="cancel"){
        set_shouldDelete(false) 
        set_deleletConfirm("wait")
      }

      
    }
  }, [ shouldDelete,deleletConfirm])
  
  
  
  
  
 
  return (
    <div>
      <div>
        {loading ? (
          <Loader />
        ) : (
          <>

             { shouldDelete?<Popup main={props.main} type="shouldDelete" div={Selected_division.div} set_deleletConfirm={set_deleletConfirm}></Popup>:null}
         
            <div className="allDivisions">
              {isDivisionUpdated && isUserDetailUpdated && isAuthenticated
                ? divisions.length===0?(
                  <>
                  <Note msg="No division available." type="empty" btnType="Create Division" ></Note>
                  </>
                ): divisions.map((data, index) => {
                    if (props.type === "timeTable") {
                       
                        return (
                          <div
                          className={
                            Selected_division._id === data._id
                              ? `light_btn division ${styles.divisionBTNSelected}`
                              : "light_btn division"
                          }
                            style={styles.div_box}
                          >
                            
                              <div>
                                <span style={props.main.background1} >
                                  {data.department}
                                </span>
                              </div>
                              <span >{data.div}</span>
                              <span >{data.year}</span>
                            
                            <div className="divisionIcons">
                            
                              {data.timeTableID !== null ? (
                                <>
                                <div>
                                  <OpenInNewIcon
                                   className="fontLink"
                                   onClick={() => {
                                     redirectToinspect(data);
                                     setSelected_division(data);
                                    }}
                                  ></OpenInNewIcon>
                                  <span>open</span>
                                </div>
                                  <div>
                                  <EditIcon
                                   className="fontLink"
                                    onClick={() => {
                                      redirectTOupate_or_create(data,"Update");
                                      setSelected_division(data);
                                    }}
                                  ></EditIcon>
                                  <span>Edit timeTable</span>
                                </div>
                              </>
                              ) :   <div>
                              <EditIcon
                               className="fontLink"
                                onClick={() => {
                                  redirectTOupate_or_create(data,"create");
                                  setSelected_division(data);
                                }}
                              ></EditIcon>
                              <span>Create timeTable</span>
                            </div>}
                            </div>
                          </div>
                        );
                       
                    } 
                    // else if (props.type === "lectures") {
                    //   if (data.status === "inUse") {
                    //     return (
                    //       <div className="division">
                    //         <div>
                    //           <div>
                    //             <span style={props.main.background1}>{data.department}</span>
                    //           </div>
                    //           <span>{data.div}</span>
                    //           <span>{data.year}</span>
                    //         </div>
                    //         <button
                    //           className={
                    //             Selected_division._id === data._id
                    //               ? "divisionBTN divisionBTNSelected"
                    //               : "divisionBTN"
                    //           }
                    //           onClick={() => {
                    //             setSelected_div(data);
                    //             batchListSetter(data);
                    //             setSelected_division(data);
                    //           }}
                    //         >
                    //           Select
                    //         </button>
                    //       </div>
                    //     );
                    //   }
                    // }
                     else if (props.type === "student") {
                       
                        return (
                          <div
                            className={
                              Selected_division._id === data._id
                                ? `light_btn division ${styles.divisionBTNSelected}`
                                : "light_btn division"
                            }
                            onClick={() => {
                              getStudentList(data);
                              setSelected_division(data)
                              setSelected_div(data)
                            }}
                            style={styles.div_box}
                          >
                            <div>
                              <span style={props.main.background1}>
                                {data.department}
                              </span>
                            </div>
                            <span className="divisionName">{data.div}</span>
                            <span className="divisionYear">{data.year}</span>
                          </div>
                        );
                       
                    }

                    // if (props.type === "division_onBackUp") {
                    //   if (data.status === "onBackUp") {
                    //     return (
                    //       <div className="division" style={styles.div_box}>
                    //         <div className="divisionNameNYear">
                    //           <span className="divisionName">{data.div}</span>
                    //           <span className="divisionYear">{data.year}</span>
                    //           <span className="divisionYear">
                    //             {data.department}
                    //           </span>
                    //         </div>

                    //         <>
                    //           <span
                    //             variant="contained"
                    //             className={
                    //               Selected_division._id === data._id
                    //                 ? "divisionBTN divisionBTNSelected"
                    //                 : "divisionBTN"
                    //             }
                    //             onClick={(e) => {
                    //               TakeInUseDivision(e, data._id, index);

                    //               setSelected_division(data);
                    //             }}
                    //             style={{ color: "green" }}
                    //           >
                    //             Get backup
                    //           </span>
                    //           <span
                    //             variant="contained"
                    //             className={
                    //               Selected_division._id === data._id
                    //                 ? "divisionBTN divisionBTNSelected"
                    //                 : "divisionBTN"
                    //             }
                    //           >
                    //             <DeleteIcon
                    //              className="fontLink"
                    //               onClick={(e) => {
                    //                 deleteDivision(e, data._id, index);
                    //                 setSelected_division(data);
                    //               }}
                    //               style={{ color: "red" }}
                    //             ></DeleteIcon>
                    //           </span>
                    //         </>
                    //       </div>
                    //     );
                    //   }
                    // } else
                     if (props.type === "division") {
                      
                        return (
                          <div
                           className={
                            Selected_division._id === data._id
                              ? `light_btn division ${styles.divisionBTNSelected}`
                              : "light_btn division"
                          }
                          style={styles.div_box}
                        >
                         
                          
                            <div>
                              <span style={props.main.background1}>
                                {data.department}
                              </span>
                            </div>
                            <span >{data.div}</span>
                            <span >{data.year}</span>
                          
                            <div className="divisionIcons">
                              <div
                                 
                              >
                                <EditIcon
                                className="fontLink"
                                  onClick={(e) => {
                                    redirectTOUpdate(e, data);
                                    setSelected_division(data);
                                  }}
                                ></EditIcon>
                                <span>Edit division</span>
                              </div>
                              <div
                               className="hoverTo_red"
                              >
                                <DeleteIcon
                                 className="fontLink "
                                  onClick={(e) => {
                                    setSelected_division(data);
                                    setcurrentIndex(index)
                                    set_shouldDelete(true)
                                   }}
                                ></DeleteIcon>
                                <span >Delete</span>
                              </div>
                            </div>
                        </div>
                        );
                      
                    }
                  })
                : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllDivisions;
