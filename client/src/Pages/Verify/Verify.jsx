import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Verify = () => {

  const params = useParams();
  const navigate = useNavigate()

  useEffect( () => {
    axios.post('http://localhost:5050/api/user/verify', params ).then( res => {
      navigate('/login')
    }).catch( error => {
      console.log(error);
    })
  })
  

  return (
    <div>Verify</div>
  )
}

export default Verify;