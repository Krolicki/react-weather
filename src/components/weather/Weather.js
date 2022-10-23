import "./Weather.css"

export const Weather = ({data}) => {
    return(
        <div className="weather-container">
            <div className="weather-head">
                <span className="weather-icon-temperature">
                    <img alt="weather-icon" src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} />
                    <p>
                        {Math.round(data.main.temp)}°C
                    </p>
                </span>
                <span className="weather-info">
                    <p>Odczuwalne: {Math.round(data.main.feels_like)}</p>
                    <p>Wilgotność: {data.main.humidity}%</p>
                    <p>Wiatr: {data.wind.speed} km/h</p>
                </span>
                <span className="weather-city">
                    <h3>{data.name}</h3>
                    <p>{data.weather[0].description}</p>
                </span>
            </div>
        </div>
    )
}