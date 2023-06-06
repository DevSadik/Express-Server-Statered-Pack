import React, { useContext, useState } from 'react';
import { GrFacebook } from 'react-icons/gr';
import { Link, Navigate } from 'react-router-dom';
import Footer from '../../components/Fotter/Footer';
import '../Login/Login.scss';
import './Register.scss';
import axios from 'axios';
import swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoaderContext from '../../Context/LoaderContext';



const Register = () => {

  const { loaderDispatch } = useContext(LoaderContext)

  const createToast = (msg) => {
    return toast.error(msg)
  }

  const [input , setInput] = useState({
    name : '',
    email : '',
    username : '',
    password : ''
  })

  const handelInput = (e) => {
    setInput( (prev) => ({ ...prev , [e.target.name] : e.target.value }) )
  }


  const handelUserRegister = async(e) => {
    e.preventDefault();

    if( !input.name || !input.email || !input.username || !input.password ){
      createToast('All feilds are required')
    }else{
      try {
        await axios.post('http://localhost:5050/api/user/register' , input).then( res => {
          loaderDispatch({ type : 'LOADER_START'})
          swal.fire("Success!", "Your account created successfully! Please active your account", "success");
        })

        setInput({
          name : '',
          email : '',
          username : '',
          password : ''
        })

        Navigate('/login')
        
      } catch (error) {
        console.log(error.response.data);
      }
    }

  }

  return (
    <div className="auth-container">
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
    <div className="auth-wrapper">
          <a href='#' className="auth-logo"></a>

          <div className="signup-text">Sign up to see photos and videos from your friends.</div>
          <a className='auth-with-facebook auth-with-facebook-button' href="#"> <div className="auth-with-facebook-icon"><GrFacebook/></div>Log in with Facebook </a>

          <div className="devider">
              OR
          </div>

          <form  className='auth-form' onSubmit={ handelUserRegister }>

              <input name='email' className='auth-form-input' onChange={ handelInput } value={input.email} type="text" placeholder='Mobile Number or Email' />
              <input name='name' className='auth-form-input' onChange={ handelInput } value={input.name} type="text" placeholder='Full Name' />
              <input name='username' className='auth-form-input' onChange={ handelInput } value={input.username} type="text" placeholder='Username' />
              <input name='password' className='auth-form-input' onChange={ handelInput } value={input.password} type="password" placeholder='Password' />

              
              <div className="signup-submit-text-wrapper">
              <div className="signup-submit-text">
                People who use our service may have uploaded your contact information to Instagram. <a href="#">Learn More</a>
              </div>
              <div className="signup-submit-cookie">
                By signing up, you agree to our <a href="#"> Privacy Policy</a> and <a href="#">Cookies Policy .</a>
              </div>
              </div>

              <button type='submit' className='auth-form-button'>Sign Up</button>
          </form>
          
    </div>

    <div className="auth-signup-wrapper">
      <div className="auth-signup-text">Have an account? <Link to={'/login'} >Log in</Link></div>
    </div>

    <div className="app-wrapper">
      <span className="app-text">Get the app.</span>
      <div className="app-logo">
        <img src="https://static.cdninstagram.com/rsrc.php/v3/yt/r/Yfc020c87j0.png" alt="playstore" className="app-image" />
        <img src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" alt="playstore" className="app-image" />
      </div>
    </div>

    <Footer/>
</div>
  )
};

export default Register;