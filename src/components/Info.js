import React from 'react'

const Info = () => {
  return (
    <>
      <div className='width-25'>
        <div className='card-box color-primary'>
          <h2>Upcoming Events</h2>
          <ul>
            <li>
              <div className='event-container'>
                <div className='event-date'>
                  <span className='event-d'>15</span>
                  <span className='event-mon'>Aug</span>
                </div>
                <div className='event-name'>
                  Independence day
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className='card-box color-primary'>
          <h2>Quick Links</h2>
          <ul>
            <li className='qk-link'>NSSPL – HR Portal</li>
            <li className='qk-link'>Submit Your Details</li>
          </ul>
        </div>
      </div>      
    </>
  )
}

export default Info