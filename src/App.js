import { useState } from 'react';
import './App.css';
import { Search } from './components/search/Search';
import { Weather } from './components/weather/Weather';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecastWeather, setForecastWeather] = useState(null)
  
  const handleOnSearch = (query) => {

    const getCurrentWeather = fetch(`http://api.openweathermap.org/data/2.5/weather?q=${query}&lang=pl&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`)
    const getForecastWeather = fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${query}&cnt=7&lang=pl&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
    Promise.all([getCurrentWeather, getForecastWeather])
      .then(async (response) => {
        const weatherResp = await response[0].json()
        const forecastResp = await response[1].json()

        setCurrentWeather({...weatherResp})
        setForecastWeather(forecastResp)
      })
      .catch(err => {
        console.log(err)
      })
  }

  console.log(forecastWeather)

  return (
    <div className="app-container">
      <Search onSearch={handleOnSearch}/>
      {currentWeather && <Weather data={currentWeather}/>}
    </div>
  );
}

export default App;
