import React, { useState } from 'react'
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons'
import { toast } from 'react-toastify'
function FeedIn({units ,setUnits ,setQuery}) {

  const [city, setCity] = useState('')

  const handleSearch = () =>{
    if(city !== '') setQuery({q: city})
  }

  const handleLocation = () => {
    if(navigator.geolocation){
      toast.info('Fetching current location.')
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success('fetched current location.')
        let lat = position.coords.latitude
        let lon = position.coords.longitude
        setQuery({lat : lat ,lon : lon })
    })
   }
  }

  const handleUnits = (item) =>{
    const selected = item.currentTarget.name
    if (units !== selected){
      toast.success('Temperatur unit changet to '+ selected)
      setUnits(selected)
    } 
  }

  return (
    <div className='flex justify-center'>
      <div className='flex w-3/4 items-center justify-center space-x-4'>

        <input 
        type='text' 
        placeholder='search city...' 
        className='text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize rounded-full' 
        value={city}
        onChange={(item) => setCity(item.currentTarget.value)}/>

        <UilSearch 
        size={25} 
        className='text-white cursor-pointer transition ease-out hover:scale-125' 
        onClick={handleSearch}/>

        <UilLocationPoint 
        size={25} 
        className='text-white cursor-pointer transition ease-out hover:scale-125' 
        onClick={handleLocation} />

      </div>

      <div className='flex items-center justify-center w-1/4'>

        <button name='metric' className='text-xl text-white font-light transition ease-out hover:scale-125' onClick={handleUnits}>°C</button>

        <p  className="text-xl text-white mx-1">|</p>

        <button name='imperial' className='text-xl text-white font-light transition ease-out hover:scale-125' onClick={handleUnits}>°F</button>
      </div>

    </div>
  )
}

export default FeedIn
