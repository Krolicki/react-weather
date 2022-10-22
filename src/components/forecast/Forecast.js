import { useEffect, useState } from "react"
import "./Forecast.css"

export const Forecast = ({data}) => {
    const [forecastDays, setForecastDays] = useState([])

    const getDayName = (dateString) => {
        return new Date(dateString).toLocaleString('pl-pl', {weekday:'long'})
    }

    const assingnDays = () => {
        let daysTemp = []
        let dayName = "",
            maxTemp = 0,
            minTemp = 0
        data.list.forEach((day, index) => {
            if(index === 0 || day.dt_txt.slice(8,10) === data.list[index-1].dt_txt.slice(8,10)){
                dayName = getDayName(day.dt_txt)
                if(day.main.temp > maxTemp) maxTemp = day.main.temp
                if(day.main.temp < minTemp) minTemp = day.main.temp

                if(index === data.list.length - 1) daysTemp.push({dayName, maxTemp, minTemp})
            }
            else{
                daysTemp.push({dayName, maxTemp, minTemp})
                dayName = ""
                maxTemp = 0
                minTemp = 0
            }
        })
        setForecastDays(daysTemp)
    }

    useEffect(()=>{
        assingnDays()
    },[])


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