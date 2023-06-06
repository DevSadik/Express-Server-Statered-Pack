import React from 'react';
import { GrFacebook } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import mobile from './AuthImg/auth.png'
import Footer from '../../components/Fotter/Footer';
import './AuthTemp.scss'

const AuthTemp = () => {
  return (
    <div className="auth-container">
       
        <div className="auth-temp-container">
            <div className="auth-temp-left">  
                <img src={ mobile } alt="" />
            </div>
            <div className="auth-temp-right">
                <div className="auth-wrapper">
                    <a href='#' className="auth-logo"></a>
                    <form className='auth-form' action="">
                        <input className='auth-form-input' type="text" placeholder='Phone number, username, or email' />
                        <input className='auth-form-input' type="text" placeholder='Password' />
                        <button className='auth-form-button'>Log In</button>
                    </form>
                    <div className="devider">
                        OR
                    </div>
                    <a className='auth-with-facebook' href="#"> <div className="auth-with-facebook-icon"><GrFacebook/></div>Log in with Facebook </a>
                    <a className='forgot-password' href="#">Forgot password </a>
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
            </div>
        </div>

    <Footer />
 
</div>
  )
};

export default AuthTemp;