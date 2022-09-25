const express=require('express')
const app =express()
const PORT=5000

app.use(express.json())
app.get('/',(req,res)=>{
    res.send("Hello world")
})

app.post('/',(req,res)=>{
    const {code,form}=req.body
    console.log(code,form)
    return res.json({code})
})


app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})