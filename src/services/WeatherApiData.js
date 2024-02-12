import { DateTime } from "luxon";

const API_KEY = "36e200563def60da1ef263368c214cf2"
const BASE_URL = "https://api.openweathermap.org/data/2.5"

const getData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType)
    url.search = new URLSearchParams({...searchParams, appid:API_KEY })
    
    console.log(url)
    return fetch(url)
        .then((res) => res.json())
} 

const formatCurrent = (data) => {
    const {
        coord: {lat, lon},
        main: {temp, feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        sys: {country, sunrise, sunset},
        weather,
        wind: {speed}
    } = data

    const {main: details, icon} = weather[0]

    return {lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country,  sunrise, sunset, details, icon, speed}
}

const timing = (data) => {
    // Get the required days
    let {timezone, list} = data

    // daily = daily.slice(1,6).map((d) => {
    //     return {
    //         title: toLocalTime(d.dt, timezone, 'ccc'),
    //         temp: d.temp.day,
    //         icon: d.weather[0].icon
    //     }
    // })

    //Get required hours
    list = list.slice(1,6).map((d) => {
        return {
            day: toLocalTime(d.dt, timezone, "cccc"),
            date: toLocalTime(d.dt, timezone, " dd LLL"),
            time: toLocalTime(d.dt, timezone, "hh:mm a"),
            icon: d.weather[0].icon,
            temp: d.main.temp
        }
    })
    
    return {timezone, list}
}

const formatData = async(searchParams) => {
    const formattedCurrentData = await getData('weather', searchParams).then(formatCurrent)

    const {lat, lon} = formattedCurrentData
    // One Call API to get forecast for threeHourly time
    const forecastData = await getData("forecast", {lat, lon, exclude:'current, minutely, alerts', units: searchParams.units}).then(timing)

    return {...formattedCurrentData, ...forecastData}
}

const toLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format)

const iconIdToURL = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`

export default formatData

export  {toLocalTime, iconIdToURL} 