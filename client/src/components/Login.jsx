import  {useState} from 'react'

import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
function Login() {
  const [password,setpassword]=useState("");
  const [username,setusername]=useState("");

  const nav=useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    
    try{
      await axios.post("http://localhost:5000/api/v1/user/login",{username,password
      },{withCredentials:true,
        headers: { "Content-Type": "application/json" }}
      ).then((res)=>{
        toast.success(res.data.message);
        nav('/login');
        setpassword('');
        setusername('');
      })
    }catch(error){
      toast.error(error.res.data.message);
    }
  }
  return (
    <div className='container form-component login-form'>
      <h2>Please Login to continue</h2>
      <form onSubmit={handleSubmit}>
      <input type="text" placeholder="username" value={username} onChange={(e)=>{setusername(e.target.value)}}/>
      <input type="password" placeholder="Password" value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
      <div>
      <button type="submit">Login</button>
      <div style={{marginTop:10}}>
        <p>Not Registered?</p>
        <Link to='/'>Register</Link>
        <Link to='/emailsend'>Forgot-Password</Link>
        </div>
      </div>
      </form>
    </div>
  )
}

export default Login