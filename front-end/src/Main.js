import './Main.css';
import Editor from 'react-simple-code-editor';
import React from 'react';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-coy.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

const codeSnippet = 
`def function add(a, b):
    return a + b

add(5,10);
  
  
  
  `
const hightlightWithLineNumbers = (input, language) =>
  highlight(input, language)
    .split("\n")
    .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
    .join("\n");

export default function MainPage(){
    const [code, setCode] = React.useState(
        codeSnippet
      );

    return(
        <div className="main-page-container">
            <div className="left-container" >
                    <h1>Code</h1>
                    <Editor
                        value={code}
                        class = 'line-numbers'
                        highlight={code => hightlightWithLineNumbers(code, languages.js)}
                        padding={10}
                        textareaId="codeArea"
                        className="editor"
                        onValueChange={code => setCode(code)}
                        style={{
                            fontFamily: '"Fira code", "Fira Mono", monospace',
                            fontSize: 18,
                            outline: 0
                        }}
                    />
                
            </div>

            <div className="right-container">
                <h1>Guidelines</h1>
                <label>
                    <input type='checkbox'/>Check if all variables are less than 31 characters
                    <br/>
                    <input type='checkbox'/>Check if all variables are less than 31 characters
                    <br/>
                    <input type='checkbox'/>Check if all variables are less than 31 characters
                    <br/>
                    <input type='checkbox'/>Check if all variables are less than 31 characters
                </label>

            </div>
        </div>
    );
}