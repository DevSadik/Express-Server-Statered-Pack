import Cookies from 'js-cookie';
import React, { useContext } from 'react';
import TopNav from '../../components/Header/TopNav';
import Post from '../../components/Post/Post';
import AuthContext from '../../Context/AuthContext';
import AuthTemp from '../AuthTemp/AuthTemp';
import './Home.scss'

const Home = () => {

  const { dispatch, user } = useContext( AuthContext );

  const handelLogout = (e) => {
    
    e.preventDefault();
    Cookies.remove('token')
    dispatch({ type : 'LOGOUT_USER'})
    
  }

  return (
    <>
       {/* <AuthTemp /> */}
      <TopNav />

      <div className="home-container">
        <div className="home-wrapper">

          <div className="home-timeline">
            <Post />
            <Post />
            <Post />
          </div>

          <div className="home-profile-container">
            <div className="profile-wrapper">
              <div className="profile-photo">
                <img src={`${user.photo ? user.photo : 'https://images.vexels.com/media/users/3/147102/isolated/preview/082213cb0f9eabb7e6715f59ef7d322a-instagram-profile-icon.png'}`} alt="" />
              </div>
              <div className="user-profile-name">
                <a className='user-name' href="#">{user.username}</a>
                <div className="profile-name">{user.name}</div>
              </div>
              <button className='switch-profile-btn' onClick={ handelLogout } >Log Out</button>
            </div>
          </div>

        </div>
      </div>

    </>
  )
};

export default Home;