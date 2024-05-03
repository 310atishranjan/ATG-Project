const express=require('express');

const dotenv=require('dotenv');
dotenv.config();
const cors=require("cors");
const db=require('./config/db');
db();

const app=express();
const cookieparser=require("cookie-parser");
app.use(cookieparser());


app.use(express.json());
app.use(express.urlencoded());

app.use(
    cors({
      origin: ["http://127.0.0.1:5173"],
      methods: ["GET", "POST", "DELETE", "PUT"],
      credentials: true,
    })
);
app.use('/api/v1/user',require('./routes/userRoutes'));
app.listen(process.env.PORT,()=>{
    console.log('server is listening');
})