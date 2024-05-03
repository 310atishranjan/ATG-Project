const mongoose=require('mongoose');

const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    code:{
        type:String,
        // required:true
    },
    expiresIn:{
        type:Number 
    }
},{timestamps:true})
const otp=mongoose.model('otp',otpSchema);
module.exports=otp;