import React, { useContext } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Context';

const Login = () => {

  const [username, setUsername ] = useState('');
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const { setUserInfo } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await fetch('http://localhost:3300/login', {
      method:'POST',
      body: JSON.stringify({username, password}) ,
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    })

    if(data.ok){
      setUsername('')
      setPassword('')

      data.json().then(userData => {
        setUserInfo(userData);
        navigate('/');
      })
    }

    else{
      alert("Problem check userId or Password");
    }

  }

  return (
      <form className='login' onSubmit={handleSubmit} action="">
      <h2>Login</h2>
        <input type="text" onChange={(e) => {setUsername(e.target.value)}} value={username} placeholder='Username' />
        <input type="password" onChange={(e) => {setPassword(e.target.value)}} value={password} placeholder='Password' />
        <button type='submit'>Login</button>
      </form>
  )
}

export default Login