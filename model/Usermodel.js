const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const schema = mongoose.Schema

const User = new schema({
    Name:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    Password:{
        type: String,
        required: true
    }
});

//Hash the Password Before Saving
User.pre('save',async function(next){
    const user = this;
    if(!user.isModified('Password')) return next();
    try{
        const salt = await bcrypt.genSalt(10);
        const hash= await bcrypt.hash(user.Password,salt);
        user.Password = hash;
        next();
    }
    catch(err){
        return next(err)
    }
})

User.methods.ComparePassword =async function(enterpswd){
    try{
return await bcrypt.compare(enterpswd,this.password);
    }
    catch(err){
        return false;

    }
}

module.exports = mongoose.model('Users',User)