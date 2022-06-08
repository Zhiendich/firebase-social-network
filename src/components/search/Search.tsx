import React, { useContext, useState } from 'react'
import { searchPostContext } from '../../App'



const Search = () => {
  const { value, setValue } = useContext(searchPostContext)

  return (
    <input
      type='text'
      value={value}
      onChange={e => setValue(e.target.value)}
      className='input_search'
      placeholder='Search...'
    />
  )
}

export default Search
