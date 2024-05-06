const User = require('../model/Usermodel')
const handler = require('express-async-handler')
const bcrypt =require('bcryptjs')
const jwt = require('jsonwebtoken')
const key = "DEMO"
const CreateUser = handler(async (req, res) => {
    const {Email} =req.body
    try {
        const find = await User.findOne({Email: Email})
        if(find){
            return res.status(404).json({message:"User Already Exist"})
        }
        const user = await User.create(req.body);
        if(!user){
       return res.status(400).json({message:"User Created Failed"})
        }
        return res.status(200).json({message:"User Created Successfully",user})
    }
    catch (err) {
        console.log(err);
    }
})

const GetUsers = handler(async(req,res)=>{
    try{
        const user = await User.find();
        return res.status(200).json({user})
    }
    catch(err){
        return res.status(500).json({message:"Failed to Get Users"})
    }
})

const Login = handler(async(req,res)=>{
    const {Email,Password} = req.body;   //DeStructure
    try{
    const user = await User.findOne({Email: Email})
    if(!user){
        return res.status(404).json({message:"Invalid User"})
    }
    const ispassword = await bcrypt.compare(Password,user.Password)
    if(!ispassword){
        return res.status(404).json({message:"Invalid Password"})
    }
  const token = jwt.sign({userId:user._id},key,{expiresIn:'30s'})

    return res.status(200).json({message:"Login SuccessFully",user,token})
    }
    catch(err){
        return res.status(500).json({message:"Internal Server Error"})
    }
})

module.exports = {
    CreateUser,Login,GetUsers
}