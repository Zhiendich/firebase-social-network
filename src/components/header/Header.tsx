import React, { useState } from 'react'
import '../../index.css'
import { initialPosts } from '../../pages/posts/InitialPost'
import Search from '../search/Search'


const Header = () => {

 
  return (
    <div className='header_flex'>
       <a href="" className="logo">
      
         <img src="https://cdn.dribbble.com/users/24078/screenshots/15522433/media/e92e58ec9d338a234945ae3d3ffd5be3.jpg?compress=1&resize=400x300" style={{width : '50px', height: '50px'}} alt="" />
       </a>
     <Search/>
       <h4><a href="">Log out</a></h4>
    </div>
  )
}

export default Header