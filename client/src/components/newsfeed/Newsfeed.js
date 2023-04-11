import React from 'react'
import './newsfeed.css'

const Newsfeed = () => {
  return (
    <div className='newsfeed'>
      <div className='newsfeed__container'>
        <div classname="newsfeed__chartSection">
          <div className='newsfeed__currentValue'>
            <h1>$100,020.45</h1>
            <p>+$44.63 (+0.04%) Today</p>
          </div>
          <div className='newsfeed__chart'>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Newsfeed
