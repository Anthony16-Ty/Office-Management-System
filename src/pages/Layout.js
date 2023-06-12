import React from 'react'
import './App.css'

const Layout = ({children}) => {
  return (
    <div className='app-background'>
      {children}
    </div>
  )
}

export default Layout