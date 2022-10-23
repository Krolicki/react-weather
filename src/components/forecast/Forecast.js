import { useEffect, useState } from "react"
import "./Forecast.css"

export const Forecast = ({data}) => {
    const [forecastDays, setForecastDays] = useState([])

    const getDayName = (dateString) => {
        return new Date(dateString).toLocaleString('pl-pl', {weekday:'long'})
    }

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
            case id >= 800 && id <= 804:
                group = 6
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

    const assingnDays = () => {
        let daysTemp = []
        let dayName = "",
            maxTemp = Number.MIN_VALUE,
            minTemp = Number.MAX_VALUE,
            icon = "",
            weatherID,
            group = 7
        data.list.forEach((day, index) => {
            if(index === 0 || day.dt_txt.slice(8,10) === data.list[index-1].dt_txt.slice(8,10)){
                dayName = getDayName(day.dt_txt)
                if(day.main.temp > maxTemp) maxTemp = day.main.temp
                if(day.main.temp < minTemp) minTemp = day.main.temp
                let dayGroup = getGroup(day.weather[0].id)
                if(dayGroup < group){
                    group = dayGroup 
                    weatherID = day.weather[0].id
                    icon = day.weather[0].icon
                }
                else if(dayGroup === group){
                    if(day.weather[0].id > weatherID){
                        weatherID = day.weather[0].id
                        icon = day.weather[0].icon
                    }
                }
                if(index === data.list.length - 1) daysTemp.push({dayName, maxTemp, minTemp, icon})
            }
            else{
                daysTemp.push({dayName, maxTemp, minTemp, icon})
                dayName = ""
                maxTemp = Number.MIN_VALUE
                minTemp = Number.MAX_VALUE
                icon = ""
                weatherID = null
                group = 7
            }
        })
        setForecastDays(daysTemp)
    }

    useEffect(()=>{
        assingnDays()
    },[])
    console.log(forecastDays)

    return(
        <div className="forecast-container">
            {data.list.map((day, index) => {
                if(index === 0 || day.dt_txt.slice(8,10) !== data.list[index-1].dt_txt.slice(8,10))
                return <div className="forecast-day-wraper" key={index}>
                    <p className="forecast-dayname">{getDayName(day.dt_txt)}</p>
                </div>
            })}
        </div>
    )
}