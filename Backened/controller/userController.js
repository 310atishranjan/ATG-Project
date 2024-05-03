const usermodel=require('../model/userModel');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const otpmodel=require('../model/OtpModel');
const nodemailer=require('nodemailer');
const RegisterController=async(req,res)=>{
    try{
    const {email,password,username}=req.body;
    if(!email || !password || !username){
        return res.status(401).json({
            message:'please provide all details',
            sucess:false
        })
    }
    const existing=await usermodel.findOne({email:email});
    if(existing){
        return res.status(409).json({
            message:"user already exist",
            success:false
        })
    }
    let hashpassword=await bcrypt.hash(password,10);
    req.body.password=hashpassword;
    const user=new usermodel(req.body);
    user.save();
    return res.status(200).json({
        message:'user register successful',
        success:true
    })
}catch(err){
    console.log(err);
    return res.status(500).json({
        message:'error in register',
        sucess:false
    })
}
}
const loginController=async(req,res)=>{
    try{
        const {username,password}=req.body;
        if(!username || !password){
            return res.status(409).json({
                message:'please provide all details',
                success:false
            })
        }
        const user=await usermodel.findOne({username});
        console.log(user);
        if(!user){
            return res.status(401).json({
                message:"user not found",
                success:false
            })
        }
        
        let compare=await bcrypt.compare(password,user.password);
        if(!compare){
            return res.status(401).json({
                message:"username or password does not match",
                success:false
            })
        }
        else{
            const payload={
                id:user._id,
            }
            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"1d"
            });
            const options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }
            return res.cookie("token",token,options).status(200).json({
                    token,
                    message:"login successful",
                    success:true
                })
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({
            message:'error in login',
            sucess:false
        })
    }

}
const emailSend=async(req,res)=>{
    try{
        const {email}=req.body;
        const existing=await usermodel.findOne({email});
        if(!existing){
            return res.status(401).json({
                message:'enter valid email',
                success:false
            })
        }
        let otpcode=Math.floor((Math.random()*10000)+1);
        const user=await otpmodel.create({
            email:req.body.email,
            code:otpcode,
            expireIn:Date.now()*300*1000,
        });
        // user.save();
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "31golu.s@gmail.com", // your email
              pass: "gzem eiqq lmiw rbqe", // your password
            },
          });
          let toEmail = req.body.email;
          let mailOptions = {
            from: "31golu.s@gmail.com", // sender address
            to: toEmail, // list of receivers
            subject: "Welcome to our website!", // Subject line
            html: `<p> Dear user <br> your code is ${otpcode}</p>`, // HTML body
          };
      
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          })
        return res.status(200).json({
            message:'email-otp save successfully',
            success:true
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:'err in emailSend',
            success:false
        })
    }
}
const changePassword=async(req,res)=>{
    try{
    const {code,email}=req.body;
    let {password}=req.body;
    const otpuser=await otpmodel.findOne({email:req.body.email,code:req.body.code});
    console.log(otpuser);
    console.log(req.body.code,'->',otpuser.code);
    if(otpuser.code===req.body.code){
        const user=await usermodel.findOne({email});
        let hashpassword=await bcrypt.hash(password,10);
        user.password=hashpassword;
        await user.save();
        
        return res.status(200).json({
            message:'password updated success',
            success:true
        })
    }
    else
    {
        return res.status(500).json({
            message:"not found",
            success:false
        })

    }

}catch(err){
   console.log(err);
    return res.status(201).json({
        message:'not update',
        success:false
})
}
}
module.exports={RegisterController,loginController,emailSend,changePassword};