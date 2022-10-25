import { useEffect, useState } from "react"
import "./Weather.css"

export const Weather = ({data}) => {
    const [weatherDate, setWeatherDate] = useState("")

    useEffect(()=>{
        setWeatherDate(new Date().toLocaleString('pl-pl', {weekday:'long'}))
    },[data])

    return(
        <div className="weather-container">
            <div className="weather-head">
                <span className="weather-info-wraper">
                    <span className="weather-icon-temperature">
                        <img alt="weather-icon" src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} />
                        <p>
                            {Math.round(data.main.temp)}°C
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