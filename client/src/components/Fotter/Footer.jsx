import React from 'react';
import './Footer.scss'

const Footer = () => {
  return (
    <div className="Footer-container">
        <div className="footer-wrapper">
            <div className="footer-menu-top">
                <ul>
                    <li><a href="#">Meta</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Jobs</a></li>
                    <li><a href="#">Help</a></li>
                    <li><a href="#">API</a></li>
                    <li><a href="#">Privacy</a></li>
                    <li><a href="#">Terms</a></li>
                    <li><a href="#">Top Accounts</a></li>
                    <li><a href="#">Locations</a></li>
                    <li><a href="#">Instagram Lite</a></li>
                    <li><a href="#">Contact Uploading & Non-Users</a></li>
                    <li><a href="#">Meta Verified</a></li>
                </ul>
            </div>
            <div className="footer-menu-bottom">
                <ul>
                    <li><a href="#">
                        <select name="" id="">
                            <option value="English">English</option>
                            <option value="English">English</option>
                            <option value="English">English</option>
                            <option value="English">English</option>
                        </select></a></li>
                    <li>© 2023 Instagram from Meta</li>
                </ul>
            </div>
        </div>
    </div>
  )
};

export default Footer;