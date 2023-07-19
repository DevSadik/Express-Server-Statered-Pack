import React, { useState } from 'react';
import './ConfirmResetPassword.scss'
import axios from 'axios';
import { createToast } from '../../components/Utility/Toast';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';


const ConfirmResetPassword = () => {

  const navigate = useNavigate()

  // Get user Token
  const {token} = useParams();

  const [password , setPassword] = useState('');
  const [Cpassword , setCpassword] = useState('');

  const handelChangePassword = async (e) => {
    e.preventDefault();


    if (!password) {
      createToast('All fields are required')
    }else if(password !== Cpassword ){
      createToast('Enter correct new password')
    }else{
        await axios.post(`http://localhost:5050/api/user/reset-password`,{ token , password }).then(res => {
        Swal.fire("Success!", "Your password reset successfully !", "success");
        navigate('/login')
      }).catch(error => {
        createToast('Request timeout, Please try again reset your password')
      })
    }

    
  }
  

  
  return (
    <div className="auth-container">
        <div className="auth-wrapper">
            <div className="title">Create A Strong Password</div>
            <p className="content">
                Your password must be at least 6 characters and should include a combination of numbers, letters and special characters (!$@%).
            </p>
            <form className='auth-form' onSubmit={handelChangePassword} >

                    <input className='auth-form-input' type="password" placeholder='New password' name='password' value={password} onChange={ (e) => setPassword(e.target.value)} />
                    <input className='auth-form-input' type="password" placeholder='New password, again' name='Cpassword' value={Cpassword} onChange={ (e) => setCpassword(e.target.value)} />
                    
                    <button type='submit' className='auth-form-button'>Reset Password</button>
                    
                </form>
            <div className="confirm"></div>
        </div>
    </div>
  )
};

export default ConfirmResetPassword;