const express=require('express')
const app =express()
const PORT=5000

app.use(express.json())
app.get('/',(req,res)=>{
    res.send("Hello world")
})

app.post('/',(req,res)=>{
    const {code,form,language}=req.body     
    console.log(language)
    return res.json({code:code,form:form,language:language})
})


app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})