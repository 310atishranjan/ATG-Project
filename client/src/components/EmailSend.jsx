import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
const EmailSend = () => {
  const [email,setemail]=useState('');
  const nav=useNavigate();
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      await axios.post("http://localhost:5000/api/v1/user/emailsend",{email
      },{withCredentials:true,
        headers: { "Content-Type": "application/json" }}
      ).then((res)=>{
        console.log(res.data.message);
        toast.success(res.data.message);
        nav('/change-password')
        setemail('');
      })
    }catch(error){
      toast.error(error.res.data.message);
    }
  }
  return (
    <div className='container form-component login-form'>
      <h2>Please enter email for Forgot-password</h2>
      <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" value={email} onChange={(e)=>{setemail(e.target.value)}}/>
      <div>
      <button type="submit">Submit</button>
      </div>
      </form>
    </div>
  )
}

export default EmailSend