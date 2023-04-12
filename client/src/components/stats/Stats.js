import React, { useState, useEffect } from 'react'
import './stats.css'

const Stats = () => {

  const [stockData, setstockData] = useState([]);


  useEffect(() => {

  }, []) 

  return (
    <div className='stats'>
      <div className='stats__container'>

        <div className='stats__header'>
          <p>Stocks</p>
        </div>
        
        <div className='stats__content'>
          <div className='stats__rows'>

          </div>
        </div>


        <div className='stats__header'>
          <p>Lists</p>
        </div>

        <div className='stats__content'>
          <div className='stats__rows'>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats
