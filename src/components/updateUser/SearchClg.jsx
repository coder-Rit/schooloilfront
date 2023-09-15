import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCollegeDetails } from '../../actions/clgDetailAction';

const SearchedClg = (props) => {

  const dispatch = useDispatch()
  const [clgCode, setClgCode] = useState("");

 
  
  
    //search clg
    const search = (e) => {
      e.preventDefault(); 
      if(clgCode!=""){

        dispatch(getCollegeDetails(clgCode));
      }
      
    };

     
    
   return (
    <div> 
          <hr className='hr4535' />
          <h2>College Information</h2>
          <label className="custom-field one" style={props.main.input.label}  >
            <input
              type="text"
              style={props.main.input.input}
              required
              value={clgCode}
               
               onChange={(e) => setClgCode(e.target.value)}
            />
            <span class="placeholder" style={props.main.input.span}>College code</span>
           </label>
             <button  className="btn_ligth" variant="contained" onClick={search}>Search</button>
    </div>
  )
}

export default SearchedClg