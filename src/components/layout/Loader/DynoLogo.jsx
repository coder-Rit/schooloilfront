import React, { useEffect, useState } from 'react'
import "./Loader.css";





const DynoLogo = () => {
    const [first, setfirst] = useState("...")
     const timer =()=>{
        setTimeout(() => {
            setfirst(".")
        }, 1000);
        setTimeout(() => {
            setfirst("..")
            
        }, 2000);
        setTimeout(() => {
            
            setfirst("...")
        }, 3000);
     }

    useEffect(() => {
       
        timer()
setInterval(() => {
    timer()
}, 3000);

    }, [ ])
    
    
  return (
    <div className= ' flex_center_center div78952 flex_column gap10'>
        <span className='flex_center_center'>
            <span  className='flex_center_center'>
                <span className='flex_center_center flex_column' >
               <img src={require("../../../images/schooloil.png")} style={{width:"40px",height:"40px"}} alt="" />
 <h3 style={{margin:"0"}}>schoolOil.online</h3>
                </span>
            </span>
        </span>
        <p style={{margin:"0"}}>Making Connection{first}</p>
        <p style={{opacity:"0.7",fontSize:'12px',margin:"0",textAlign:"center"}}>Once You Build The Connection You Are Ready To Go.</p>
    </div>
  )
}

export default DynoLogo 