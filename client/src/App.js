import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import './App.scss';
import AuthenticateUser from './components/Middleware/AuthenticateUser';
import AuthRedirectUser from './components/Middleware/AuthRedirectUser';
import Cookies from 'js-cookie';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './Context/AuthContext';
import LoadingBar from 'react-top-loading-bar';
import LoaderContext from './Context/LoaderContext';
import { ToastContainer } from 'react-toastify';
import { createToast } from './components/Utility/Toast';
import Verify from './Pages/Verify/Verify';
import ForgotPassword from './Pages/ForgotPass/ForgotPassword';

import ConfirmResetPassword from './Pages/ConfirmResetPassword/ConfirmResetPassword';


function App() {

  // Get Auth Context & User Token
  const token = Cookies.get('token');
  const { dispatch } = useContext( AuthContext );

  // Get Loader Context
  const { loaderState, loaderDispatch } = useContext(LoaderContext)

  useEffect(() => {
    try {
      axios.get(`http://localhost:5050/api/user/me`,{
        headers :{
          Authorization : `Bearer ${token}`
        }
      }).then(res => {

        if( res.data.isVerifed ){
          loaderDispatch({ type : 'LOADER_START'})
          dispatch({ type : 'USER_LOGIN_SUCCESS', payload : res.data })
        }else{

          dispatch({ type : 'LOGOUT_USER' })
          Cookies.remove('token')
          createToast('Please verify your account')
          
        }
        
      }).catch( error => {
        dispatch({ type : 'LOGOUT_USER' })
      })
    } catch (error) {
      console.log(error);
    }
  }, [token])
  

  return (
    <>
      <LoadingBar
        color='#f11946'
        progress={loaderState}
        onLoaderFinished={() => loaderDispatch(100)}
      />
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
      <Routes>
        <Route path='/' element= { <AuthenticateUser> <Home/> </AuthenticateUser>} />
        <Route path='/login' element= { <AuthRedirectUser> <Login/> </AuthRedirectUser>} />
        <Route path='/user/:id/verify/:token' element= { <Verify />} />
        <Route path='/user/password-recover' element= { <ForgotPassword />} />
        <Route path='/user/:token' element= { <ConfirmResetPassword />} />
        <Route path='/register' element= { <AuthRedirectUser> <Register/> </AuthRedirectUser> } />
      </Routes>
    </>
  );
}

export default App;
