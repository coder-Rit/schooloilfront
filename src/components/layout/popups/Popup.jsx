import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./popup.css"
const Popup = (props) => {
  let navigate = useNavigate();


  let {div,type}=props


  const updateAccount = () => {
    navigate("/update/userDetail");
  };

   


  return (
    <div className='popupBox glassTheme' style={props.main.fontColor}>
      {
        type=="updateAcc"?(
          <>
          <span>Information is Incomplete. <br/> please update your profile</span>
          <div>
  <button className='btn_ligth wanted_btn' onClick={updateAccount}>Update profile</button>
</div>
          </>
          
          ):"shouldDelete"?( 
          <>
          <span>Do You Want To Delete Division <span style={{color:"red"}} >"{div}"</span> ?<br/> <p>you can get backup of deleted division by calling support.</p></span>
          <div>
  <button className='btn_ligth ' onClick={()=> props.set_deleletConfirm("cancel")}>Cancel</button>
  <button className='btn_ligth  ' onClick={()=> props.set_deleletConfirm("delete")}style={{background:"red",color:"white"}}>Delete</button>
</div>
          </>
          
          ):null
      }
     

    </div>
  )
}

export default Popup