import React, { useState } from 'react'
import '../../index.css'
import { useAuth } from '../providers/UseAuth'
import Search from '../search/Search'
import { signOut } from 'firebase/auth'
import { Auth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
const Header = () => {
  const { user, ga } = useAuth()
  const navigate = useNavigate()
  function signOutHandler() {
    signOut(ga as Auth)
    navigate('/login')
  }
  return (
    <div className='header_flex'>
      <a href='' className='logo'>
        <img className='logout_avatar' src={user?.avatar} alt='' />
        <h4 className='logout_name'>{user?.name}</h4>
      </a>
      <Search />

      <button onClick={signOutHandler} className='logout_button'>
        <h4>LogOut</h4>
      </button>
    </div>
  )
}

export default Header
