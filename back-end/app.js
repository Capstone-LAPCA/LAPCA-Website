const express=require('express')
const app =express()
const PORT=5000
const axios = require('axios')

app.use(express.json())
app.get('/',(req,res)=>{
    res.send("Hello world")
})

app.post('/',(req,res)=>{
    const {code,form,language}=req.body 
    console.log(code,form,language) 
    axios.post('http://127.0.0.1:3003/getResults',{code,form,language})
    //.then((result)=>{console.log(typeof(result.data))})
    .then((ans)=>{
        console.log(ans.data)
        return res.json(ans.data)})
    .catch((e)=>{console.log(e)})
   // return res.json({code:code,form:form,language:language})/
})


app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})