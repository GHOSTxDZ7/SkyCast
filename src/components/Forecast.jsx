import React from 'react'
import { iconIdToURL } from '../services/WeatherApiData'

function Forecast({ title, items}) {
  // console.log(items)
  return (
    <div>

      <div className='flex items-center justify-start'>
        <p className='font-medium uppercase text-white'>{ title }</p>
      </div>

      <hr className='my-2'/>

      <div className='flex items-center justify-between text-white'>

        {items.map((item) => (
          <div className='flex flex-col items-center justify-center'>
          
          <p className='text-sm font-light'>{item.date}</p>
          <p className='text-sm font-light'>{item.time}</p>

          <img src={iconIdToURL(item.icon)} alt="" className='w-12 my-1'/>

          <p className='font-medium'>{`${item.temp.toFixed()}°`}</p>
        </div>
        ))}
        
      </div>

    </div>
  )
}

export default Forecast
