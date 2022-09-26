import './Main.css';
import Editor from 'react-simple-code-editor';
// import React, { useEffect } from 'react';
import { useState } from 'react';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-coy.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

const codeSnippet = 
`def  add(a, b):
    return a + b
    a=10
    
add(5,10);
`


const hightlightWithLineNumbers = (input, language) =>
  highlight(input, language)
    .split("\n")
    .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
    .join("\n");

const Checkbox = ({label,id,handleChange,form})=>(
    <>
    <input
    type="checkbox"
    id={id}
    name={id}   
    value={id}
    onChange={handleChange}
    checked={form[id]}
    />
    <label htmlFor={id}>{label}</label>
    <br/>
    </>
)

export default function MainPage(){
    const [code, setCode] = useState(codeSnippet);
    const [violation,setViolation]=useState("Submit")
    const [form,setFormValue]=useState({
        "Assign in loop":false,
        "Dead code":false
    })
    const [language,setLanguage]=useState("Python")


    const handleChange = (e) =>{
        const {name,value,type,checked}=e.target;
        setFormValue((prevFormaValue)=>({
            ...prevFormaValue,
            [name]: type==='checkbox' ? checked : value
        }))
    }



    const Post= ()=>{
        fetch("/",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                code,
                form,
                language
        })
    }).then(res=>res.json())
    .then(result=>{
        console.log(result.data)
        // const f=JSON.stringify(result.result[])
        setViolation(JSON.stringify(result))
    }).catch(err=>{
        console.log(err)
    })
    }

    

    return(
        <>
        <div className='navbar'>
            Navbar
        </div>
        <div className="main-page-container">
            
            <div className="child" >
                    <select value={language} onChange={e=>setLanguage(e.target.value)}>
                        <option selected id="Python" name="Python" value="Python">Python</option>
                        <option id="C" name="C" value="C">C</option>
                        <option  id="Java" name="Java" value="Java">Java</option>
                    </select>
                    <h1>Code</h1>
                    <Editor
                        value={code}
                        id={code}
                        name={code}
                        className= 'line-numbers'
                        highlight={code => hightlightWithLineNumbers(code, languages.js)}
                        padding={10}
                        textareaId="codeArea"
                        class="editor"  
                        maxLength={500}
                        minLength={100}
                        
                        onValueChange={code => setCode(code)}
                        style={{
                            fontFamily: '"Fira code", "Fira Mono", monospace',
                            fontSize: 18,
                            outline: 0
                        }}
                    />
            </div>

            <div className="child">
                <form>
                <h1>Guidelines Checklist</h1>
                <Checkbox form={form} label="Assign in loop" id="Assign in loop" handleChange={handleChange}/>
                <Checkbox form={form} label="Dead code" id="Dead code" handleChange={handleChange}/>
                <button  type='button' onClick={()=>Post()}>Submit</button>
                <h1>{violation}</h1>
                </form>
            </div>
            
        </div>
        </>
    );
}