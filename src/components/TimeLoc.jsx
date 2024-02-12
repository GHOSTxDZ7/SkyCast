import React from 'react'
import { toLocalTime } from '../services/WeatherApiData'

function TimeLoc({weather : {dt, timezone, name, country}}) {
  return (
    <div>
      <div className='flex justify-center items-center my-6'>
        <p className='text-xl text-white font-light'>
            {toLocalTime(dt, timezone)}
        </p>
      </div>

        <div className='flex justify-center items-center my-3'>
            <p className='text-3xl text-white font-medium'>
                {`${name}, ${country}`}
            </p>
        </div>

    </div>
  )
}

export default TimeLoc
