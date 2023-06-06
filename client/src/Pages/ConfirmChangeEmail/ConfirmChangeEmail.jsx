
import React from 'react';
import {useParams} from 'react-router-dom'

const ConfirmChangeEmail = () => {

    const {token} = useParams()
    console.log(token);
    // let name = ''
    
    // try {
    //     await axios.post(`http://localhost:5050/api/user/info-password/${token}`).then(res => {
    //         let name = res.data
    //     })
    // } catch (error) {
    //     console.log(error);
    // }

  return (
    <div>

        <div className="auth-container">
            <div className="auth-wrapper">
                <div className="title"></div>
                <div className="content">We sent an email to w*******8@gmail.com with a link to get back into your account.</div>
                <div className="confirm"></div>
            </div>
        </div>

    </div>
  )
}

export default ConfirmChangeEmail;