const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const route = require('./routes/UserRoute')
const app = express();    //Instance Of Express

const PORT = process.env.PORT

app.use(express.json());
app.use('/api',route)
app.get('/',(req,res)=>{
    res.send("Hello API")
})
app.listen(PORT,()=>{
console.log(`Running PORT is ${PORT}`)
})

mongoose.connect(process.env.Mongo_URL).then(()=>{
    console.log("DB Connected")
})
