import React, { useRef, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RightSection from "./Components/RightSection";
import LeftSection from "./Components/LeftSection";
import LapcaScore from "./Components/LapcaScore";
import "./App.css";
import "./scrollbar.css"
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

function App() {
  
  const editorRef = useRef(null)
  const [violation,setViolation]=useState({compilationErr:false,compilationOutput:"Compiled Successfully",guidelines:[]})
  const [formResult, setFormResult] = useState([]);
  const [customFormResult,setCustomFormResult]=useState([]);
  const [targetId,setTargetId]=useState(0)
  // const [formUser, setFormUserResult] = useState([]);

  const python_default_code = `print("Hello World")`;
  const c_default_code =`#include <stdio.h>\nint main(){\n\tprintf("Hello World");\n\treturn 0;\n}`;
  const java_default_code =`class TestProgram{\n\tpublic static void main(String[] args){\n\t\tSystem.out.println("Hello World");\n\t}\n}`;

  const [language,setLanguage]=useState("py")
  const [defaultCodeTemplate, setDefaultCodeTemplate] = useState(python_default_code);
  const [isLoading, setIsLoading]=useState("hidden");

  function handleEditorDidMount(editor,monaco){
    editorRef.current=editor;
  }

  const [customCount,setCustomCount]=useState(0)
  const [score, setScore] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [guideline, setGuideline] = useState([]);
  const [code, setCode] = useState("");
  const [values, setValues] = useState(
                      {"id":0,
                      "checked":false,
                      "label":"",
                      "code":""});
  const [customOpen,setCustomOpen]=React.useState(false)

  const guidelineEditorRef = React.useRef(null)
  const customGuidelineEditorRef=React.useRef(null)

  
  function handleGuidelineEditorDidMount(editor,monaco){
    guidelineEditorRef.current=editor;
  }

  function handleCustomGuidelineEditorDidMount(editor,monaco){
    customGuidelineEditorRef.current=editor;
  }



  const handleSetTitle = (event) =>{
    setTitle(event.target.value)
    setValues((oldValues) => ({
      ...oldValues,
      ["label"]: event.target.value,
    }));
  }

  const handleSetCode = (event) =>{
    const guidelineCode = guidelineEditorRef.current.getValue();
    setCode(guidelineCode)
      setValues((oldValues) => ({
        ...oldValues,
        ["code"]: guidelineCode,
      }));
  }

  const handleSetCustomCode = (event) =>{
    const guidelineCode = customGuidelineEditorRef.current.getValue();
    setCode(guidelineCode)
      setValues((oldValues) => ({
        ...oldValues,
        ["code"]: guidelineCode,
      }));
    
  }



  const handleSave = (e) =>{
    let new_guideline = values;
    new_guideline["id"]=customCount
    setCustomFormResult((old)=>([...old,new_guideline]))
    setCustomCount((oldValue)=>(oldValue+1));
    handleClose();
    setState(true);
    console.log(customFormResult)
  }

  const handleCustomSave = (e)=>{
    let g=[]
    let new_obj={}
    for (let i=0;i<customFormResult.length;i++){
      if (customFormResult[i]["id"]==targetId){
        new_obj={}
        new_obj["id"]=i
        new_obj["checked"]=customFormResult[i]["checked"]
        new_obj["label"]=values["label"]
        new_obj["code"]=values["code"]
      }
      else{
        new_obj={}
        new_obj["id"]=i
        new_obj["checked"]=customFormResult[i]["checked"]
        new_obj["label"]=customFormResult[i]["label"]
        new_obj["code"]=customFormResult[i]["code"]
      }
      g.push(new_obj)
    }

    setCustomFormResult(g)
    handleCustomClose();
    console.log(customFormResult)
  }


  const handleDelete = (e, val) =>{

    let g=[]
    let new_obj={}
    for (let i=0;i<customFormResult.length;i++){
      if (customFormResult[i]["id"]!==val){
        new_obj={}
        new_obj["id"]=i
        new_obj["checked"]=customFormResult[i]["checked"]
        new_obj["label"]=customFormResult[i]["label"]
        new_obj["code"]=customFormResult[i]["code"]
        g.push(new_obj)
      }
    }
    setCustomFormResult(g)
    setCustomCount((oldValue)=>(oldValue-1))
    if(customFormResult.length === 1){
      setState(false);
    }
    console.log(customFormResult)
  };

  const handleClickOpen = (event, label, code, id) => {
    setValues((oldValues) => ({
      ...oldValues,
      ["label"]:label,
      ["code"]:code}));
    setTargetId(id);
    setTitle(label);
    setOpen(true);
    setCode(code);
  };

  const handleCustomClickOpen = (event, label, code, id) => {
    setValues((oldValues) => ({
      ...oldValues,
      ["label"]:label,
      ["code"]:code}));
    setTargetId(id);
    setTitle(label);
    setCustomOpen(true);
    setCode(code);
  };


  
  const handleClose = () => {
    setOpen(false);
  };

  const handleCustomClose = () => {
    setCustomOpen(false);
  };


function getGuidelines(){
      axios
        .get("http://127.0.0.1:3003//getGuidelines")
        .then((res) => {
        let data = res.data;
        setGuideline(data["guidelines"]);
        let obj=[]
        
        for (var i = 0; i < data["guidelines"].length; i++){
          
            let d={}
            // console.log(data["guidelines"][i]["id"])
            // d[data["guidelines"][i]["id"]]=false
            d["id"]=data["guidelines"][i]["id"]
            d["checked"]=false
            obj.push(d)

        }
        setFormResult(obj)
       
        })
        .catch((err) => {
          console.log("Error",err);
        });
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
    for(var i=0;i<formResult.length;i++){
      if (newFormResult[i]["id"]===event.target.id){
        newFormResult[i]["checked"]=event.target.checked
      }
    }
    setFormResult(newFormResult);
    // newFormResult[event.target.id] = event.target.checked;
  }
  function handleCustomFormChange(event) {
    let newCustomFormResult = customFormResult;
    let g=[]
    let i=0
    for (let ele of newCustomFormResult){
        if (i==event.target.id){
          ele["checked"]=event.target.checked
        }
        i+=1
        g.push(ele)
    }
    setCustomFormResult(g);
    console.log("Form change",g)
  }

  function sendCode() {
    console.log("clicked")
    const code = editorRef.current.getValue();
    // setViolation("Loading...")
    setIsLoading("visible");
    setViolation({compilationErr:false,compilationOutput:"Compiled Successfully",guidelines:[]});
    axios
      .post("http://127.0.0.1:3003//getResults", {
        code: code,
        language: language,
        predefined_guidelines: formResult,
        custom_guidelines: customFormResult
      })
      .then((res) => {
        console.log(res.data);
        setViolation(res.data);
        setIsLoading("hidden");
        setScore(res.data.score);
      })
      .catch((err) => {
        console.log("Error",err);
      });
  }


  return(

    <div className="main-body">
      
      <div className="navbar">
          <p>LAPCA</p>
          <div className="nav-link">
            <a href="/LAPCA-Website"><p>Home</p></a>
            <a href="/score"><p>Score</p></a>
          </div>
      </div>
      
      <BrowserRouter>
      <Routes>
        <Route path="/LAPCA-Website" element={
        <>
        <LeftSection 
        sendCode={sendCode} 
        handleLanguageChange={handleLanguageChange} 
        language={language}  
        defaultCodeTemplate={defaultCodeTemplate} 
        formResult={formResult}
        handleEditorDidMount={handleEditorDidMount}
        setDefaultCodeTemplate = {setDefaultCodeTemplate}
        violation={violation} 
        isLoading={isLoading}
        score={score}/>
  
        <RightSection 
        handleFormChange={handleFormChange} 
        violation={violation}
        isLoading={isLoading}
        open = {open}
        title = {title}
        guideline = {guideline}
        code = {code}
        customFormResult = {customFormResult}
        handleGuidelineEditorDidMount = {handleGuidelineEditorDidMount}
        handleCustomGuidelineEditorDidMount={handleCustomGuidelineEditorDidMount}
        handleSetTitle = {handleSetTitle}
        handleSetCode = {handleSetCode}
        handleSave = {handleSave}
        handleClickOpen = {handleClickOpen}
        handleDelete = {handleDelete}
        handleClose = {handleClose}
        getGuidelines = {getGuidelines}
        handleSetCustomCode={handleSetCustomCode}
        handleCustomSave={handleCustomSave}
        handleCustomClickOpen={handleCustomClickOpen}
        customOpen={customOpen}
        handleCustomClose={handleCustomClose}
        handleCustomFormChange={handleCustomFormChange}
        state = {state}
        />
        </>
        }/>
          
        <Route path="/score" element={<LapcaScore />} />
      </Routes>
      </BrowserRouter>
    </div>

  );

}

export default App;
