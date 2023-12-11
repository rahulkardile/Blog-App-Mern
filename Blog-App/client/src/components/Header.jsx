import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../Context'

const Header = () => {
    const { userInfo, setUserInfo } = useContext(UserContext)

    useEffect(() => {
        fetch('http://localhost:3300/profile', {
            credentials: 'include',
        }).then(resp => resp.json().then(userData => {
            setUserInfo(userData)
        }))
    }, [])

const logout = () => {
    fetch('http://localhost:3300/logout', {
        credentials: 'include',
        method: 'POST'
    })
    setUserInfo(null);
}

const username = userInfo?.username;

    return (
        <>
            <header>
                <Link to="/" className='logo'>Wix<b>Blog</b></Link>
                <nav>
                    {
                        username && (
                            <>
                                <Link to={'/create'} >Create Post</Link>
                                <a style={{cursor: 'pointer'}} onClick={logout}>Logout</a>
                            </>
                        )
                    }
                    {!username && (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}

                </nav>
            </header>

        </>

    )
}

export default Header