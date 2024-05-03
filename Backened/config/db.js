const mongoose=require('mongoose');

const db=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('connected');
    }catch(err){
        console.log(err);
    }
}
module.exports=db;