import React, { useRef, useState } from "react";
import axios from "axios";

import RightSection from "./Components/RightSection";
import LeftSection from "./Components/LeftSection";

import "./App.css";
import "./scrollbar.css"


function App() {
  
  const editorRef = useRef(null)
  const [violation,setViolation]=useState({compilationErr:false,compilationOutput:"Compiled Successfully",guidelines:[]})
  const [formResult, setFormResult] = useState([]);
  const [customFormResult,setCustomFormResult]=useState([]);
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

  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [guideline, setGuideline] = useState([]);
  const [code, setCode] = useState("");
  const [values, setValues] = useState(
                      {"id":customCount,
                      "label":"",
                      "code":""});
  var [globalID, setGlobalId] = useState(0);
  const [userGuideline, setUserGuideline] = useState([]);
  const [guidelineType, setGuidelineType] = useState(["predefined"]);
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
    console.log("c",values)
    let new_guideline = values;
    setUserGuideline((old)=>([...old,new_guideline]))
    setCustomCount((oldValue)=>(userGuideline.length));

    let miniForm=values
    miniForm["checked"]=false
    setCustomFormResult((old)=>([...old,new_guideline]))
    handleClose();
    console.log(customFormResult)
    
    
    // console.log("save",userGuideline)
    // setUserGuideline([...userGuideline, new_guideline]);
  }

  const handleCustomSave = (e)=>{
    // console.log(event)
    let new_guideline = values;
    console.log(e.target.value)
    // let filteredArray = userGuideline.filter(item => item["label"] !== values["label"])
    // setUserGuideline([...userGuideline, new_guideline]);

    let miniForm=values
    miniForm["checked"]=false
    setCustomFormResult((old)=>([...old,new_guideline]))
    setCustomCount((oldValue)=>(userGuideline.length));
    handleCustomClose();
    console.log(customFormResult)
  }

  const handleClickOpen = (event, k, code, val) => {
    setValues((oldValues) => ({
      ...oldValues,
      ["id"]:customCount,
      ["label"]:k,
      ["code"]:code}));
    setTitle(k);
    setOpen(true);
    console.log(val);
    setGuidelineType(val);
    setCode(code);
    console.log(guidelineType)
  };

  const handleCustomClickOpen = (event, k, code, val) => {
    setValues((oldValues) => ({
      ...oldValues,
      ["id"]:customCount,
      ["label"]:k,
      ["code"]:code}));
    setTitle(k);
    setCustomOpen(true);
    console.log(val);
    // setGuidelineType(val);
    setCode(code);
    console.log(guidelineType)
  };

  const handleDelete = (e, val) =>{
    // console.log("Yo",val)
    // let filteredArray = userGuideline.filter(item => item["id"] !== val)
    // setUserGuideline(filteredArray);
    let g=[]
    let new_obj={}
    for (let i=0;i<userGuideline.length;i++){
      if (userGuideline[i]["id"]!==val){
        new_obj={}
        new_obj["id"]=i
        new_obj["label"]=userGuideline[i]["label"]
        new_obj["code"]=userGuideline[i]["code"]
        g.push(new_obj)
      }
    }
    console.log(g)
    setUserGuideline(g)
    // let newList = customFormResult.filter(item => item["id"] !== val)
    setCustomFormResult(g)
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

    // for(var i=0;i<newCustomFormResult.length;i++){
    //   if (newCustomFormResult[i]["id"]===event.target.id){
    //     newCustomFormResult[i]["checked"]=event.target.checked
    //   }
    // }
    setCustomFormResult(g);
    console.log("Form change",g)
  }

  function sendCode() {
    console.log("clicked")
    const code = editorRef.current.getValue();
    console.log(code)
    console.log(userGuideline)
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
      isLoading={isLoading}
      open = {open}
      title = {title}
      guideline = {guideline}
      code = {code}
      userGuideline = {userGuideline}
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
      />
    </div>
  );

}

export default App;
