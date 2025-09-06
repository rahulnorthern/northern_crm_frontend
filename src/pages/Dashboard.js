import React from 'react'

const Dashboard = () => {
  return (
    <div className='card-box width-75 p-4'>
        <h5>Dashboard</h5> 
        <div className='card shadow border-0 p-3 mt-4'>
            <div className='mb-3'>
                <img src='/img/avatar.png' width={'80px'} className='rounded-circle me-3' alt='avatar' />
            </div>     
            <p className='mb-2'>Name</p>
            <p className='mb-1 color-primary cursor-pointer'>Role</p>
            <p className='mb-1 color-primary cursor-pointer'>Edit Profile</p>
            <p className='mb-1 color-primary cursor-pointer'>Logout</p>
        </div>     
    </div>
  )
}

export default Dashboard