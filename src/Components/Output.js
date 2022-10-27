// import React from "react";
// import Paper from "@mui/material/Paper";
import "./../Styles/RightSection.css"
// import { useGlobalEvent } from "beautiful-react-hooks";
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { LoadingIcon } from "../img/loadingicon";

const { useState } = React;
const columns = [
  { id: 'name', label: 'Guideline', minWidth: 170 },
  { id: 'remark', label: 'Remark', minWidth: 100 }
];



export default function Output(props) {

  // const [rows,setRows]=React.useState([])
  // if (typeof(props.violation)!=="undefined"){
  // props.violation["guidelines"]
  
  // setRows((prev)=>{
  //   if (typeof(props.violation)!=="undefined"){

  //     prev=props.violation["guidelines"];
  //   }
  // })

  
  // console.log(props.violation)
  // const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  // const onWindowResize = useGlobalEvent("resize");

  // onWindowResize((event: React.SyntheticEvent) => {
  //   setWindowHeight(window.innerHeight);
  // });




  return (
    <Paper
    elevation={8}
    sx={{
      m: "3px",
      marginBottom: "0px",
      minHeight: "290px",
      padding: "20px",
      paddingTop: "2px",
      background: "#050c1b",
      color: "rgb(255,255,255)",
      resize: "both",
      overflow:"hidden"
    }}
  >
    <div className= "output-header">
      <h1>Output</h1>
      <LoadingIcon isLoading={props.isLoading}/>
    </div>
    {props.violation["compilationErr"]===false &&
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth ,
                    background:"#111827",
                  color:"white"}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
            props.violation["guidelines"].map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.remark}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} style={{color:"white"}}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    }
    {props.violation["compilationErr"]===true &&
    <p>{props.violation["compilationOutput"]}</p>
      }
    </Paper>
  );
}


// export default function Output(props){
//     console.log(props.violation["guidelines"])
//     return(
    // <Paper
    //     elevation={8}
    //     sx={{
    //       m: "3px",
    //       marginBottom: "0px",
    //       minHeight: "290px",
    //       padding: "20px",
    //       paddingTop: "2px",
    //       background: "#050c1b",
    //       color: "rgb(255,255,255)",
    //       resize: "both"
    //     }}
    //   >
        
//         <h2 style={{ textAlign: "left" }}>Output</h2>
//         <div style={{ whiteSpace:"pre-line", backgroundColor: "#111827", minHeight: "300px", padding: "10px",
//       fontSize: "18px"}}>
//         <p >""</p>
//         </div>
//       </Paper> 
//     );
// }