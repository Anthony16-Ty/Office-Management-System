import React from 'react'
import Navbar from './Navbar'
import StaffSide from './StaffSide'

const Layout = ({ children }) => {
    return (
        <>
            <div className='flex flex-auto h-screen'>
                <StaffSide />
                <div className='grow'>
                    <Navbar />
                    <div className='m-5'>{children}</div>
                </div>
            </div>
        </>
    )
}

export default Layout
