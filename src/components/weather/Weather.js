import "./Weather.css"
import {BsFillCloudSunFill} from 'react-icons/bs'

export const Weather = ({data}) => {
    return(
        <div className="weather-container">
            <div className="weather-head">
                <span className="weather-icon-temperature">
                    <BsFillCloudSunFill size={70} className="icon"/>
                    <p>
                        8<sup>°C</sup>
                    </p>
                </span>
                <span className="weather-info">
                    <p>Odczywalne: 6°C</p>
                    <p>Wilgotność: 85%</p>
                    <p>Wiatr: 10 km/h</p>
                    <p>Ciśnienie: 1022 hPa</p>
                </span>
                <span className="weather-city">
                    <h3>Jasło</h3>
                    <p>Przewaga chmur</p>
                </span>
            </div>
        </div>
    )
}