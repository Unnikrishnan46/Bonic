import React from 'react'

function AdminHeader({handleToggleClick}) {
    return (
        <header>
            <div className="menu-toggle">
                <label htmlFor="sidebar-toogle" ><span className='las la-bars' onClick={handleToggleClick}></span></label>
            </div>


            <div className='header-icons'>
                <span className='las la-search'></span>
                <span className='las la-bookmark'></span>
                <span className='las la-sms'></span>
            </div>
        </header>
    )
}

export default AdminHeader
