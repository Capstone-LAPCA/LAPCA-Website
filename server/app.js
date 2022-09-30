const express=require('express')
var cors = require('cors')
const app =express()
const PORT=5000
const axios = require('axios')
app.use(cors())
app.use(express.json())

app.post('/',(req,res)=>{
    const {code,form,language}=req.body 
    console.log(code,form,language) 
    axios.post('http://127.0.0.1:3003/getResults',{code,form,language})
    .then((ans)=>{
        console.log(ans.data)
        return res.json(ans.data)})
    .catch((e)=>{console.log(e)})
})


app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})