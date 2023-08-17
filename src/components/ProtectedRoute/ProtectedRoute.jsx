import axios from 'axios';
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useSizing from '../../hooks/useSizing';
import { ToastContainer, toast } from "react-toastify";

import { BrowserView, MobileView } from 'react-device-detect';

import "./ProctedRoute.css"
import { clearAlert } from '../../actions/alertAction';
import 'react-toastify/dist/ReactToastify.css';
 
const ProtectedRoute = (props) => {
    let navigate = useNavigate();
    const windowSizing = useSizing();
    const dispatch = useDispatch()
    const {Comp ,styles,main}=props
console.log( );
    const { status, msg } = useSelector((state) => state.alert);

  const { user, isAuthenticated } = useSelector((state) => state.user);

  const notify_success = (msg) => toast.success(`  ${msg} 👍 `, props.alert);
  const notify_error = (msg) => toast.error(` ${msg}`, props.alert);

  useEffect(() => {
    if (!isAuthenticated) {
        navigate("/user/auth")
    }
    
  }, [ isAuthenticated])
  useEffect(() => {
    if (status === 1) {
      notify_success(msg);
    }
    if (status === 0) {
      notify_error(msg);
    }
    dispatch(clearAlert())
  }, [status]);


  

  
  

  return (
    <Fragment> 
       <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={props.Comp.props.main.alertMode}
          />

{
  windowSizing.innerWidth <= 768?Comp:( <div  className='destokView'>
  <div className='sot absoluteCenter  '>

   <span>🤖</span>
  
  </div>
  
  
   <div className=' destok-galss'>


<div className='absoluteCenter flex_center_center flex_column'>
   <h3>🤖 THIS WEB APPLICATION IS BUILT FOR MOBILE DEVICES. PLEASE USE A MOBILE DEVICE OR REDUCE SCREEN SIZE TO ACCESS THIS SITE.  🤖</h3>
 </div>
   </div>

</div>)
}

      {/* <BrowserView>
     
</BrowserView>
<MobileView>
</MobileView>
{Comp} */}


      
    </Fragment>
   
  )
}

export default ProtectedRoute