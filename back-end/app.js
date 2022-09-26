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
    axios.post('http://127.0.0.1:3003/getResults',{code,form,language}).then((result)=>{console.log(result['data'])}).catch((e)=>{console.log(e)})
    return res.json({code:code,form:form,language:language})
})


app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})