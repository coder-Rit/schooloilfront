import React, { useEffect } from "react";
import { useState } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import "./lecture.css"
 
const DemoTable = (props) => {
  //state
  const [one, set_one] = useState([]);
  //destrcuture
  const { sheet } = props;

  useEffect(() => {
      set_one(Object.keys(sheet[0]))
     
  }, [ ])

  useEffect(() => {
   console.log(sheet);
  }, [props])
  

  return (
    <div className="overflow_X">
      <ReactHTMLTableToExcel
           id="test-table-xls-button"
           className="download-table-xls-button"
           table="table-to-xls"
           filename="tablexls"
           sheet="tablexls"
           buttonText="Download as XLS"/>
     <table id="table-to-xls">
        <tr >
          { one.map((data) => {
            console.log(data);
            return <th>{data}</th>;
          })}
        </tr > 
        {
            sheet.map(data=>{
                return(
                              
                        <tr  style={props.main.low_Resolution_font}>
                        
                    {
                        one.map(fileds=>{
                            return<td>{data[fileds]}</td>
                        })
                    }
                     
                  </tr>
                )
            })
        }

        
      </table>
    </div>
  );
};

export default DemoTable;
