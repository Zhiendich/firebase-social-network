import React, { useContext, useState } from 'react'
import { searchPostContext } from '../../App'
import { initialPosts } from '../../pages/posts/InitialPost'
import { useSearch } from '../hooks/useSearch'


const Search = () => {

  const { value, setValue } = useContext(searchPostContext)


  return (
    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className='input_search' placeholder='Search...' />
  )
}

export default Search