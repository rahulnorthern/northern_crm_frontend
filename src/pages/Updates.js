import React from 'react'
import Tabbar from '../components/Tabbar'

const Updates = () => {
  return (
    <>
      <div className='card-box width-75'>
        <Tabbar />
        <div className='pt-1 project-sec'>
          <div className='tablinks'>
              <span>All</span> |
              <span>Tasks</span> |
              <span>Projects</span>
          </div>          
          <div className='tab-btn-end'>
            <button className='grey-btn-md'>Comments</button>
          </div>
        </div>
        <div className='comment-sec'>
          <div>
            <div className='comment-date p-2 mt-2'>2025-08-14</div>
            <ul>
              <li>
                AA
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Updates