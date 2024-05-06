const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const route = require('./routes/UserRoute')
const app = express();    //Instance Of Express

const PORT = process.env.PORT || 5000

app.use(express.json());
app.use('/api',route)
app.use('/',(req,res)=>{
    res.send("Hello API")
})
app.listen(PORT,()=>{
console.log(`Running PORT is ${PORT}`)
})

const MONGO_URI = process.env.Mongo_URL; // Replace with your MongoDB Atlas connection string
mongoose.connect(MONGO_URI, {
    bufferCommands: false,
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
});

