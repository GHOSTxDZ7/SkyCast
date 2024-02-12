import React from 'react'
import { UilTemperature, UilWind, UilTear, UilSun, UilSunset, UilArrowUp, UilArrowDown } from '@iconscout/react-unicons'
import { iconIdToURL, toLocalTime } from '../services/WeatherApiData'


function Details({weather: {temp, temp_min, temp_max, details, icon, sunrise, sunset, speed, timezone, feels_like, humidity}}) {
  return (
    <div>
      
        <div className='flex items-center justify-center  text-xl text-white font-semibold'>
            <p>{details}</p>
        </div>

        <div className='flex items-center justify-between text-white py-3'>
            
            <img src={iconIdToURL(icon)} alt="" className='w-30'/>

            <p className='text-5xl'>{`${temp.toFixed()}°`}</p>

            <div className='flex flex-col space-y-2'>

                <div className='flex text-sm justify-center items-center font-light'>
                  <UilTemperature size={18} className='mr-1'/>
                  Real fell:
                  <span className='font-medium ml-1'>{`${feels_like.toFixed()}°`}</span>
                </div>

                <div className='flex text-sm justify-center items-center font-light'>
                  <UilTear size={18} className='mr-1'/>
                  Humidity:
                  <span className='font-medium ml-1'>{`${humidity}%`}</span>
                </div>

                <div className='flex text-sm justify-center items-center font-light'>
                  <UilWind size={18} className='mr-1'/>
                  Wind:
                  <span className='font-medium ml-1'>{`${speed.toFixed()} km/h`}</span>
                </div>
            </div>

        </div>

      <div className='text-sm text-white flex justify-center items-center space-x-2 py-3'>
        
        <UilSun />
        
        <p className='font-light'>
          Rise: <span className='font-medium ml-1'>{toLocalTime(sunrise, timezone, 'hh:mm a')}</span>
        </p>
        <p className='font-light'>|</p>

        <UilSunset />
        
        <p className='font-light'>
          Set: <span className='font-medium ml-1'>{toLocalTime(sunset, timezone, 'hh:mm a')}</span>
        </p>
        <p className='font-light'>|</p>

        <UilArrowUp />
        
        <p className='font-light'>
          High: <span className='font-medium ml-1'>{`${temp_max.toFixed()}°`}</span>
        </p>
        <p className='font-light'>|</p>

        <UilArrowDown />
        
        <p className='font-light'>
          Low: <span className='font-medium ml-1'>{`${temp_min.toFixed()}°`}</span>
        </p>
        

      </div>

    </div>
  )
}

export default Details
