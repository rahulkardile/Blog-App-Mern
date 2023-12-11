import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const [username, setUsername ] = useState('');
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await fetch('http://localhost:3300/register', {
      method:'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type': 'application/json'},
      // credentials: 'include'
    })

    if(data.status === 200){
      setUsername('')
      setPassword('')
      navigate('/');
    } else {
      alert("Problem")

    }

  }

  return (

        <form className='register' onSubmit={handleSubmit} action="">
            <h2>Register</h2>
            <input type="text" value={username} onChange={(e) => {setUsername(e.target.value)}} placeholder='Username' />
            <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='Password' />
            <button type='submit'>Register</button>
        </form>

  )
}

export default Register