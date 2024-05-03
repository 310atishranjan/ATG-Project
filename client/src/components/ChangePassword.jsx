import  {useState} from 'react'

import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
function ChangePassword() {
  const [email,setemail]=useState("");
  const [code,setcode]=useState("");
  const [password,setpassword]=useState("");

  const nav=useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    
    try{
      await axios.post("http://localhost:5000/api/v1/user/change-password",{email,code,password
      },{withCredentials:true,
        headers: { "Content-Type": "application/json" }}
      ).then((res)=>{
        toast.success(res.data.message);
        nav('/login');
        setemail('');
        setcode('');
        setpassword('');
      })
    }catch(error){
      toast.error(error.res.data.message);
    }
  }
  return (
    <div className='container form-component login-form'>
      <h2>Please enter updated password to continue</h2>
      <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" value={email} onChange={(e)=>{setemail(e.target.value)}}/>
      <input type="text" placeholder="OTP" value={code} onChange={(e)=>{setcode(e.target.value)}}/>
      <input type="text" placeholder='Password' value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
      <div>
      <button type="submit">Change Password</button>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword