import React from 'react'
import "./NavigationBoxes.css"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { set_user_detail_to_view_account } from '../../actions/updateUserAction';


const NavigationBoxes = (props) => {

  const navigateTo = useNavigate();
  let dispatch = useDispatch();


    
    const { user, isAuthenticated } = useSelector((state) => state.user);
    const { userDetail, isUserDetailUpdated } = useSelector(
        (state) => state.userDetail
      );


    const redirectTo_TimeTable = () => {
        if (userDetail === null) {
          navigateTo("/user/account");
        }else{ 
          navigateTo("/user/tools/timeTable");
        }
      };
      const redirectTo_Divisions = () => {
        if (userDetail === null) {
          navigateTo("/user/account");
        } else {
          if (user.role === "teacher" ) {
            navigateTo("/user/tools/divisions");
          } else {
            navigateTo("/user/tools/myClass");
          }
        }
      };
    
      const redirectTo_TodaysLecture = () => {
        if (userDetail === null) {
          navigateTo("/user/account");
        } else {
          navigateTo("/user/tools/lectures");
        }
      };
    
      const redirectToMyLecture = () => {
        if (userDetail === null) {
          navigateTo("/user/account");
        }else{
    
          navigateTo("/user/tools/myLectures");
        }
      };
    
      const redirectToAttendace = () => {
        if (userDetail === null) {
          navigateTo("/user/account");
        }else{ 
          navigateTo("/user/tools/myStudents");
        }
      };
    
      const redirectTo_attendace = () => {
        if (userDetail === null) {
          navigateTo("/user/account");
        } else {
          dispatch(set_user_detail_to_view_account(userDetail));
            navigateTo("/user/student");
        }
      };

      const addStudent = () => {
        if (userDetail === null) {
          navigateTo("/user/account");
        } else {
          dispatch(set_user_detail_to_view_account(userDetail));
            navigateTo("/addStudent");
        }
      };
      
    
      const redirectToAccount = () => {
        navigateTo("/user/account");
      };
    

  return (

    
    <div className='navBox-container  ' >
       
       {
        user.role!=="student"?<>
        <div className='border_radius10  '   >
        <div className='flex_center_center pointer glassTheme  navBox ' onClick={redirectToMyLecture} style={props.main.div_box}> 
            <img src="../Images/lectures.png" className='navImg ' alt="" />
        </div>
        <h5 className='textCenter margin0 top15 unBold'  style={props.main.fontColor}>Lectures</h5>
    </div>
    <div className='border_radius10  '   >
        <div className='flex_center_center pointer glassTheme  navBox ' onClick={redirectTo_TimeTable} style={props.main.div_box}> 
            <img src="../Images/timeTable.png" className='navImg ' alt="" />
        </div>
        <h5 className='textCenter margin0 top15 unBold' style={props.main.fontColor}>Time Table</h5>
    </div>
    <div className='border_radius10  '   >
        <div className='flex_center_center pointer glassTheme  navBox ' onClick={redirectToAttendace} style={props.main.div_box}> 
            <img src="../Images/students.png" className='navImg ' alt="" />
        </div>
        <h5 className='textCenter margin0 top15 unBold' style={props.main.fontColor}>Students</h5>
    </div>
    <div className='border_radius10  '   >
        <div className='flex_center_center pointer glassTheme  navBox ' onClick={redirectTo_Divisions} style={props.main.div_box}> 
            <img src="../Images/classroom.png" className='navImg ' alt="" />
        </div>
        <h5 className='textCenter margin0 top15 unBold' style={props.main.fontColor}>Divisions</h5>
    </div>
    <div className='border_radius10  '   >
        <div className='flex_center_center pointer glassTheme  navBox ' onClick={addStudent} style={props.main.div_box}> 
            <img src="../Images/addStudents.png" className='navImg ' alt="" />
        </div>
        <h5 className='textCenter margin0 top15 unBold' style={props.main.fontColor}>Add students</h5>
    </div>
    <div className='border_radius10  '   >
        <div className='flex_center_center pointer glassTheme  navBox ' style={props.main.div_box}> 
            <img src="../Images/addFaculty.png" className='navImg ' alt="" />
        </div>
        <h5 className='textCenter margin0 top15 unBold' style={props.main.fontColor}>Add Faculty</h5>
    </div>




    <div className='border_radius10  tempBlock'   >
        <div className='flex_center_center pointer glassTheme  navBox ' style={props.main.div_box}> 
            <img src="../Images/assignment.png" className='navImg ' alt="" />
            
        </div>
        <h5 className='textCenter margin0 top15 unBold' style={props.main.fontColor}>Assignment</h5>
        <h5 className='textCenter margin0  unBold' style={props.main.fontColor}>comming soon</h5>
    </div>
    <div className='border_radius10  tempBlock'   >
        <div className='flex_center_center pointer glassTheme  navBox ' style={props.main.div_box}> 
            <img src="../Images/growth.png" className='navImg ' alt="" />
        </div>
        <h5 className='textCenter margin0 top15 unBold' style={props.main.fontColor}>Performance</h5>
        <h5 className='textCenter margin0  unBold' style={props.main.fontColor}>comming soon</h5>
    </div>
    <div className='border_radius10  tempBlock'   >
        <div className='flex_center_center pointer glassTheme  navBox ' style={props.main.div_box}> 
            <img src="../Images/feedback.png" className='navImg ' alt="" />
        </div>
        <h5 className='textCenter margin0 top15 unBold' style={props.main.fontColor}>FeedBack</h5>
        <h5 className='textCenter margin0  unBold' style={props.main.fontColor}>comming soon</h5>
    </div>



        </>:<>
        <div className=' border_radius10  '   >
            <div className='flex_center_center pointer glassTheme  navBox  ' onClick={redirectTo_attendace} style={props.main.div_box}> 
                <img src="../Images/speedometer.png" className='navImg ' alt="" />
            </div>
            <h5 className='textCenter margin0 top15 unBold   ' style={props.main.fontColor}>Attendence</h5>
        </div>
        <div className='  border_radius10   '   >
            <div className='flex_center_center pointer glassTheme  navBox   ' onClick={redirectTo_TodaysLecture} style={props.main.div_box}>  
                <img src="../Images/list.png" className='navImg  ' alt="" />
            </div>
            <h5 className='textCenter margin0 top15 unBold' style={props.main.fontColor}>Lectures</h5>
        </div>
        <div className=' border_radius10  '   >
        <div className='flex_center_center pointer glassTheme  navBox   ' onClick={redirectTo_Divisions} style={props.main.div_box}> 
            <img src="../Images/timeTable.png" className='navImg ' alt="" />
        </div>
        <h5 className='textCenter margin0 top15 unBold' style={props.main.fontColor}>Time Table</h5>
    </div>



    <div className='border_radius10  tempBlock'   >
        <div className='flex_center_center pointer glassTheme  navBox ' style={props.main.div_box}> 
            <img src="../Images/assignment.png" className='navImg ' alt="" />
        </div>
        <h5 className='textCenter margin0 top15 unBold' style={props.main.fontColor}>Assignments</h5>
        <h5 className='textCenter margin0  unBold' style={props.main.fontColor}>comming soon</h5>

    </div>
    <div className='border_radius10  tempBlock'   >
        <div className='flex_center_center pointer glassTheme  navBox ' style={props.main.div_box}> 
            <img src="../Images/growth.png" className='navImg ' alt="" />
        </div>
        <h5 className='textCenter margin0 top15 unBold' style={props.main.fontColor}>Performance</h5>
        <h5 className='textCenter margin0  unBold' style={props.main.fontColor}>comming soon</h5>

    </div>
    <div className='border_radius10  tempBlock'   >
        <div className='flex_center_center pointer glassTheme  navBox ' style={props.main.div_box}> 
            <img src="../Images/feedback.png" className='navImg ' alt="" />
        </div>
        <h5 className='textCenter margin0 top15 unBold' style={props.main.fontColor}>News</h5>
        <h5 className='textCenter margin0  unBold' style={props.main.fontColor}>comming soon</h5>

    </div>
       </>
    }
      

    </div>
  )
}

export default NavigationBoxes