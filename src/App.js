import { useState } from 'react';
import './App.css';
import { Forecast } from './components/forecast/Forecast';
import { Search } from './components/search/Search';
import { Weather } from './components/weather/Weather';
import { ErrorMsg } from './components/error/ErrorMsg';
import { Loader } from './components/loader/Loader';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecastWeather, setForecastWeather] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [loading, setLoading] = useState(null)
  
  const handleOnSearch = async (query) => {
    setErrorMsg(false)
    setCurrentWeather(null)
    setForecastWeather(null)
    setLoading(true)
    const getCurrentWeather = fetch(`http://api.openweathermap.org/data/2.5/weather?q=${query}&lang=pl&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`)
    const getForecastWeather = fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${query}&lang=pl&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
    Promise.all([getCurrentWeather, getForecastWeather])
      .then(async (response) => {
        setLoading(true)
        if(response[0].ok && response[1].ok){
          const weatherResp = await response[0].json()
          const forecastResp = await response[1].json()
          setCurrentWeather({...weatherResp})
          setForecastWeather(forecastResp)
        }
        else if(response[0].status === 404 || response[1].status === 404){
          setErrorMsg(`Nie znaleziono miasta "${query}"`)
        }
        else{
          setErrorMsg("Brak połącznia z serwerem pogodowym")
        }
      })
      .catch(err => {
        console.log(err)
      })
      .finally(()=>{
        setLoading(false)
      })
  }

  return (
    <div className="app-container">
      <Search onSearch={handleOnSearch} setLoading={setLoading}/>
      {loading && <Loader />}
      {currentWeather && <Weather data={currentWeather}/>}
      {forecastWeather && <Forecast data={forecastWeather}/>}
      {errorMsg && <ErrorMsg message={errorMsg}/>}
    </div>
  );
}

export default App;
