import { useEffect, useState } from "react"
import "./Weather.css"
import {  DayTemplate } from "../../App"

export const Weather = ({data} : {data : DayTemplate}) => {
    const [weatherDate, setWeatherDate] = useState("")

    useEffect(()=>{
        setWeatherDate(data?.fullDayName ? data.fullDayName : new Date().toLocaleString('pl-pl', {weekday:'long'}))
    },[data])

    return(
        <div className="weather-container">
            <div className="weather-head">
                <span className="weather-info-wraper">
                    <span className="weather-icon-temperature">
                        <img alt="weather-icon" src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} />
                        <p>
                            {data.main?.temp ? Math.round(data.main.temp) : Math.round(data.main.temp_max)}°C
                        </p>
                    </span>
                    <span className="weather-info">
                        <p>Odczuwalne: {Math.round(data.main.feels_like)}°C</p>
                        <p>Wilgotność: {data.main.humidity}%</p>
                        <p>Wiatr: {data.wind.speed} km/h</p>
                    </span>
                </span>
                <span className="weather-city">
                    <h3>{data.name}{data.sys.country !== "PL" ? `, ${data.sys.country}` : ""}</h3>
                    <p>{weatherDate}</p>
                    <p>{data.weather[0].description}</p>
                </span>
            </div>
        </div>
    )
}