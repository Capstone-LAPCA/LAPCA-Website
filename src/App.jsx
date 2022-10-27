import React, { useRef, useState } from "react";
import axios from "axios";

import RightSection from "./Components/RightSection";
import LeftSection from "./Components/LeftSection";

import "./App.css";
import "./scrollbar.css"


function App() {
  
  const editorRef = useRef(null)
  const [violation,setViolation]=useState({compilationErr:false,compilationOutput:"Compiled Successfully",guidelines:[]})
  const [formResult, setFormResult] = useState({
    "Recursion.lapx": false,
    "Assign_in_loop.lapx": false,
    "Continue.lapx": false,
    "Unused_Functions.lapx": false,
    "One_var_decl.lapx": false,
    "Binary_Search_Iterative.lapx": false,
    "Dead_Code.lapx": false,
    "var_greater_than_31.lapx": false,
  });

  const [formUser, setFormUserResult] = useState([]);
  const python_default_code = `print("Hello World")`;
  const c_default_code =`#include <stdio.h>\nint main(){\n\tprintf("Hello World");\n\treturn 0;\n}`;
  const java_default_code =`class TestProgram{\n\tpublic static void main(String[] args){\n\t\tSystem.out.println("Hello World");\n\t}\n}`;

  const [language,setLanguage]=useState("py")
  const [defaultCodeTemplate, setDefaultCodeTemplate] = useState(python_default_code);
  const [isLoading, setIsLoading]=useState("hidden");

  function handleEditorDidMount(editor,monaco){
    editorRef.current=editor;
  }
  const handleLanguageChange = (event)=>{
      setLanguage(event.target.value)
      switch (event.target.value) {
          case "py":
            setDefaultCodeTemplate(python_default_code);
            break;
          case "c":
            setDefaultCodeTemplate(c_default_code);
            break;
          case "java":
            setDefaultCodeTemplate(java_default_code);
            break;
          default:
            setDefaultCodeTemplate(python_default_code);
        }
  }
  function handleFormChange(event) {
    let newFormResult = formResult;
    newFormResult[event.target.id] = event.target.checked;
    setFormResult(newFormResult);
    console.log(formResult);
  }

  function sendCode() {
    console.log("clicked")
    const code = editorRef.current.getValue();
    console.log(code)
    // setViolation("Loading...")
    setIsLoading("visible");
    setViolation({compilationErr:false,compilationOutput:"Compiled Successfully",guidelines:[]});
    axios
      .post("http://127.0.0.1:3003//getResults", {
        code: code,
        language: language,
        predefined_guidelines: formResult,
        custom_guidelines: []
      })
      .then((res) => {
        console.log(res.data);
        setViolation(res.data)
        setIsLoading("hidden");

      })
      .catch((err) => {
        console.log("Error",err);
      });
  }


  return(
    <div className="main-body">
      <div className="navbar">
        <p>LAPCA</p>
      </div>

      <LeftSection 
      sendCode={sendCode} 
      handleLanguageChange={handleLanguageChange} 
      language={language}  
      defaultCodeTemplate={defaultCodeTemplate} 
      formResult={formResult}
      handleEditorDidMount={handleEditorDidMount}
      setDefaultCodeTemplate = {setDefaultCodeTemplate}/>

      <RightSection 
      handleFormChange={handleFormChange} 
      violation={violation}
      isLoading={isLoading} />
    </div>
  );

}

export default App;
