import React from 'react'

function NavBar({setQuery}) {

  const cities = [
    {
      'id': 1,
      'name': "Delhi"
    },
    {
      'id': 2,
      'name': "Hyderabad"
    },
    {
      'id': 3,
      'name': "Mumbai"
    },
    {
      'id': 4,
      'name': "Pune"
    },
    {
      'id': 5,
      'name': "Solapur"
    }
  ]

  return (
    <div className='flex items-center justify-around my-6'>
      {cities.map((city) => (
        <button 
        key={city.id} 
        className='text-white font-medium text-lg transition ease-out hover:scale-125'
        onClick={() => setQuery({q: city.name})}>
          {city.name}
        </button>
    ))}
    </div>
  )
}

export default NavBar
