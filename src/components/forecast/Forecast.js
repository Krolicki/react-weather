import { useEffect, useState } from "react"
import "./Forecast.css"

export const Forecast = ({data, activeDay, changeDate}) => {
    const [forecastDays, setForecastDays] = useState([])

    const getGroup = (id) =>{
        let group = -1
        switch(true){
            case id >= 200 && id <= 232:
                group = 0
                break
            case id >= 600 && id <= 622:
                group = 1
                break
            case id >= 500 && id <= 531:
                group = 2
                break
            case id >= 300 && id <= 312:
                group = 3
                break
            case id >= 700 && id <= 771:
                group = 4
                break
            case id >= 800 && id <= 804:
                group = 5
                break
            case id === 781:
                group = 0
                break
            default:
                group = -1
                break
        }
        return group
    }

    const dayTemplate = () => {
        return {
            name: data.city.name,
            sys:{country:data.city.country},
            dayName: "",
            fullDayName: "",
            dt_txt: "",
            main: {
                temp_max: Number.MIN_VALUE,
                temp_min: Number.MAX_VALUE,
                feels_like: 0,
                humidity: 0,
            },
            wind: {speed:0},
            weather: [{
                id: null,
                icon: "",
                description: ""
            }],
            group: 7
        }
    }

    const assingnDays = () => {
        let daysTemp = []
        // let day = {
        //     name: data.city.name,
        //     sys:{country:data.city.country},
        //     dayName: "",
        //     fullDayName: "",
        //     dt_txt: "",
        //     main: {
        //         temp_max: Number.MIN_VALUE,
        //         temp_min: Number.MAX_VALUE,
        //         feels_like: 0,
        //         humidity: 0,
        //     },
        //     wind: {speed:0},
        //     weather: [{
        //         id: null,
        //         icon: "",
        //         description: ""
        //     }],
        //     group: 7
        // }
        let day = dayTemplate()
        data.list.forEach((entry, index) => {
            if(index !== 0 && entry.dt_txt.slice(8,10) !== data.list[index-1].dt_txt.slice(8,10)){
                let wholeDay = {...day}
                daysTemp.push(wholeDay)
                day = dayTemplate()
                // day.dayName = ""
                // day.main.temp_max = Number.MIN_VALUE
                // day.main.temp_min = Number.MAX_VALUE
                // day.main.feels_like = 0
                // day.main.humidity = 0
                // day.wind.speed = 0
                // day.weather[0].icon = ""
                // day.weather[0].description = ""
                // day.weather[0].id = null
                // day.group = 7
            }

            if(index === data.list.length - 1) {
                let wholeDay = {...day}
                daysTemp.push(wholeDay)
                day = dayTemplate()
            }
            else{
                if(day.dayName === "") {
                    day.dayName = new Date(entry.dt_txt).toLocaleString('pl-pl', {weekday:'short'})
                    day.fullDayName = new Date(entry.dt_txt).toLocaleString('pl-pl', {weekday:'long'})
                    day.dt_txt = entry.dt_txt
                }
                if(entry.main.temp > day.main.temp_max) {
                    day.main.temp_max = entry.main.temp
                    day.main.feels_like = entry.main.feels_like
                }
                if(entry.main.temp < day.main.temp_min) day.main.temp_min = entry.main.temp
                if(entry.wind.speed > day.wind.speed) day.wind.speed = entry.wind.speed
                if(entry.main.humidity > day.humidity) day.humidity = entry.main.humidity

                let dayGroup = getGroup(entry.weather[0].id)
                if(dayGroup < day.group){
                    day.group = dayGroup 
                    day.weather[0].id = entry.weather[0].id
                    day.weather[0].description = entry.weather[0].description
                    day.weather[0].icon = `${entry.weather[0].icon[0]}${entry.weather[0].icon[1]}d`
                }
                else if(dayGroup === day.group){
                    if(entry.weather[0].id > day.weather[0].id){
                        day.weather[0].id = entry.weather[0].id
                        day.weather[0].description = entry.weather[0].description
                        day.weather[0].icon = `${entry.weather[0].icon[0]}${entry.weather[0].icon[1]}d`
                    }
                }
            }
        })
        setForecastDays(daysTemp)
    }

    useEffect(()=>{
        assingnDays()
    },[data])

    return(
        <div className="forecast-container">
            {forecastDays.map((day, index) => {
                return (
                    <div 
                        className={`forecast-day-wraper ${activeDay === day.fullDayName ? "active-day" : ''}`} 
                        key={index}
                        onClick={()=>{changeDate(day.dt_txt); console.log(day)}}
                    >
                        <p className="forecast-dayname">{day.dayName}</p>
                        <img alt="weather-icon" src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} />
                        <span>
                            <p>{Math.round(day.main.temp_max)}°</p>
                            <p>{Math.round(day.main.temp_min)}°</p>
                        </span>
                    </div>
                )
            })}
        </div>
    )
}