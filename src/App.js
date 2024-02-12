import './App.css';
import NavBar from './components/NavBar';
import FeedIn from './components/FeedIn';
import TimeLoc from './components/TimeLoc';
import WeatherDetails from './components/WeatherDetails';
import Forecast from './components/Forecast';
import formatData from './services/WeatherApiData';
import { useEffect, useState } from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const [query, setQuery] = useState({q: "Pune"})
  const [units, setUnits] = useState("metric")
  const [weather, setWeather] = useState(null)

  useEffect(() => {

    const message = query.q ? query.q : 'current location.'
    toast.info('Fetching weather for '+ message)

    const fetchData = async() => {
      await formatData({...query, units}).then((data) => {
        toast.success('Succesfully fetching weather for '+ data.name)
        setWeather(data)
        // console.log(data)
      })
    }
    fetchData()
  }, [query, units])

  
  const backgroundColor = () => {
    if(!weather) return 'from-cyan-700 to-blue-700'
    const threshold = (units === 'metric') ? 20 : 60
    if (weather.temp <= threshold) return 'from-cyan-700 to-blue-700'
    return 'from-yellow-700 to-orange-700'
  }


  return (
<div className={`mx-auto max-w-screen-md  py-5 px-32 bg-gradient-to-br rounded-lg ${backgroundColor()} h-fit shadow-xl shadow-gray-400`}>
    <NavBar setQuery={setQuery}/>
    <FeedIn units={units} setUnits={setUnits} setQuery={setQuery}/>

    {weather && (
      <div>
        <TimeLoc weather = {weather}/>
        <WeatherDetails weather = {weather}/>
        <Forecast title='forecast after every three hours' items={weather.list}/>
        {/* <Forecast title='Daily forecast'/> */}
      </div>
    )}
    
    <ToastContainer
    position="top-right"
    autoClose={4000}
    hideProgressBar={false}
    newestOnTop={true}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    transition={Bounce}/>
    </div>   
  );
}

export default App;
