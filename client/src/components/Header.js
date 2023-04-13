import React from 'react'
import Search from './Search';


const Header = ({name}) => {
  return (
   <>
    <div className='xl:px-32'>
        <h1 className='text-4xl'>{name}</h1>
        <Search />
    </div>
    {/* <ThemeIcon /> */}
    
   </>
  )
}

export default Header
