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
import { Resizable } from "re-resizable";

const { useState } = React;
const columns = [
  { id: 'name', label: 'Guideline', minWidth: 170 },
  { id: 'remark', label: 'Remark', minWidth: 100 }
];



export default function Output(props) {

  // const [state, setState] = useState({ width: 'auto', height: 290 });

  return (
    // <Resizable
    // style={{ marginLeft: 0, marginTop: 0, border: "1px solid white", position: "relative" }}
    // size={{ width: state.width, height: state.height }}
    // onResizeStop={(e, direction, ref, d) => {
    //    setState({
    //       width: state.width, height: state.height + d.height,});
    //    }}>
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
                        <TableCell key={column.id} align={column.align} style={{color:"white",whiteSpace: "pre-line"}}>
                          {value}
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
    // </Resizable>
  );
}
