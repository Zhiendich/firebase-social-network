import React from 'react'
import { NavLink } from 'react-router-dom'
import '../../index.css'
import { meny } from './dataMenu'
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <nav className='sidebarFlex'>
        {meny.map(item => (
          <NavLink key={item.link} to={item.link}>
            {item.title}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar
