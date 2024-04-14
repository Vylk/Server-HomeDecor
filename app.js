import express from "express"
import bodyParser from "body-parser"

var app = express()
app.use(bodyParser.json())

app.get('/status',(req,res)=>{
    console.log("Check")
    res.send("Chao Em iu")
})

app.listen(3001, ()=>{
    console.log("Start")
})