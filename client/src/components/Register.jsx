import axios from 'axios';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
function Register() {
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const [username,setusername]=useState('');
  const nav=useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      await axios.post("http://localhost:5000/api/v1/user/register",{
       email,password,username
      }).then((res)=>{
        
        toast.success(res.data.message);
        setemail('');
        setpassword('');
        setusername('');
        nav('/login');
      })
    }catch(error){
      console.log(error);
      toast.error(error.res.data.message);
    }
  }
  return (
    <div className='container form-component register-form'>
      <h2>Please Register to continue</h2>
      <form onSubmit={handleSubmit}>
      
      <input type='text' placeholder='email' value={email} onChange={(e)=>{setemail(e.target.value)}}/>
   
      <input type='text' placeholder='password' value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
      <input type='text' placeholder='username' value={username} onChange={(e)=>{setusername(e.target.value)}}/>
      
      
      <button type="submit">Register</button>
      <div style={{marginTop:10}}>
        <p>Already Registered?</p>
        <Link to='/login'>Login</Link>
      </div>
       </form>
     </div>
  )
}

export default Register