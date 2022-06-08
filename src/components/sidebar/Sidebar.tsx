import React from 'react'
import { NavLink } from 'react-router-dom'
import '../../index.css'
import { useAuth } from '../providers/UseAuth'
import { meny } from './dataMenu'
const Sidebar = () => {
  const { user } = useAuth()
  return (
    <div className='sidebar'>
      <nav className='sidebarFlex'>
        {meny.map(item => (
          item.title.includes('My Page') ?
            (<NavLink key={item.link} to={`${item.link}/${user?.id}`}>
              {item.title}
            </NavLink>)
            :
            (<NavLink key={item.link} to={`${item.link}`}>
              {item.title}
            </NavLink>)
        ))}
      </nav>
    </div>
  )
}

export default Sidebar
