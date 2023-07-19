import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Fotter/Footer';
import forgotLogo from './Screenshot.png'
import './Forgotpassword.scss'
import TopNav from '../../components/Header/TopNav';
import axios from 'axios'
import { createToast } from '../../components/Utility/Toast';
import swal from 'sweetalert2';

const ForgotPassword = () => {

    const [ email , setEmail] = useState('');
    const [ msg , setMsg] = useState({
      type : '',
      msg : '',
      status : false
    });
  
    

    const handelForgotPassword = async(e) => {
     
      e.preventDefault()

      try {

        if( !email ){
          createToast('Enter your email')

        }else{

          axios.post(`http://localhost:5050/api/user/forgot-password`, {email} ).then( res => {
            swal.fire("Success!", "Your verification link send successfully !", "success");
            
          }).catch(error => {
            setMsg({
              type : 'danger',
              msg : 'User email do not exist',
              status : true
            })
          })
          
        }
      } catch (error) {
        console.log(error);
      }
      
    }

  return (
   <>
    <TopNav />
    <div className="auth-container">
          <div className="auth-wrapper">
                <a href='#' className="forgot-logo"><img src={forgotLogo} alt="" /></a>
                <div className="forgot-title">Trouble logging in?</div>
                {msg.status && <p className={` alert alert-${msg.type}`}>{msg.msg}</p>}
                <form className='auth-form' onSubmit={handelForgotPassword}>
                    <input className='auth-form-input' type="text" name='email' value={email} onChange={ (e) => setEmail(e.target.value)} placeholder='Email, Phone, or Username' />
                    <button type='submit' className='auth-form-button'>Send login link</button>
                    <a className='reset-password' href="#">Can't reset your password?</a>
                </form>
                <div className="devider">
                    OR
                </div>
                <a className='auth-with-new-account' href="#"> Create new account </a>
                
          </div>

          <div className="auth-signup-wrapper">
            <Link to={'/login'}  className="auth-login-text" >Back to login</Link>
          </div>

          <div className="app-wrapper">
            <span className="app-text">Get the app.</span>
            <div className="app-logo">
              <img src="https://static.cdninstagram.com/rsrc.php/v3/yt/r/Yfc020c87j0.png" alt="playstore" className="app-image" />
              <img src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" alt="playstore" className="app-image" />
            </div>
          </div>

          <Footer />
       
      </div>
   </>
    
  )
};

export default ForgotPassword;