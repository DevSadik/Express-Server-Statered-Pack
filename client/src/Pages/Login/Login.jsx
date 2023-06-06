import axios from 'axios';
import React, { useContext, useState } from 'react';
import { GrFacebook } from "react-icons/gr";
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../components/Fotter/Footer';
import "./Login.scss";
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import Cookeis from 'js-cookie'
import AuthContext from '../../Context/AuthContext';
import LoaderContext from '../../Context/LoaderContext';
import { createToast } from '../../components/Utility/Toast';

const Login = () => {

  // use auth context
  const {dispatch} = useContext(AuthContext)
  const { loaderDispatch } = useContext(LoaderContext)

  const navigate = useNavigate()

  const [input, setInput] = useState({
    email : '',
    password : ''
  });

  const handelinput = (e) => {
    setInput( (prev) => ({ ...prev, [e.target.name] : e.target.value }) )
  }

  const handelLoginInput = async(e) => {
    e.preventDefault();

    try {

      if( !input.email || !input.password){
        return createToast('All feilds are required')
      }else{
        await axios.post(`http://localhost:5050/api/user/login` , input ).then( res => {

        loaderDispatch({ type : 'LOADER_START'})

          

          console.log(res.data);

          if( res.data.user.isVerifed){

            dispatch({ type : 'USER_LOGIN_SUCCESS' , payload : res.data.user})  
            Cookeis.set('token', res.data.token)
            Swal.fire(
              'Wellcome!',
              'You are login succsesfully',
              'success'
            );
            navigate('/') 
            
          }else{
            createToast('Please verify your account')
          }

        })
      }
      
      
    } catch (error) {
      createToast('Email or Password are incorrect')
    }
  };

  
  return (
    <>
      <div className="auth-container">
          <div className="auth-wrapper">
                <a href='#' className="auth-logo"></a>
                <form className='auth-form' onSubmit={handelLoginInput}>
                    <input className='auth-form-input' type="text" name='email' value={input.email} onChange={handelinput}  placeholder='Phone number, username, or email' />
                    <input className='auth-form-input' type="password" name='password' value={input.password} onChange={handelinput} placeholder='Password' />
                    <button type='submit' className='auth-form-button'>Log In</button>
                </form>
                <div className="devider">
                    OR
                </div>
                <a className='auth-with-facebook' href="#"> <div className="auth-with-facebook-icon"><GrFacebook/></div>Log in with Facebook </a>
                <Link className='forgot-password' to={'/user/password-recover'}>Forgot password </Link>
          </div>

          <div className="auth-signup-wrapper">
            <div className="auth-signup-text">Don't have an account? <Link to={'/register'} >Sign up</Link></div>
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

export default Login;