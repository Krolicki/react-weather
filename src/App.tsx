import { useEffect, useState } from 'react';
import './App.css';
import { Forecast } from './components/forecast/Forecast';
import { Search } from './components/search/Search';
import { Weather } from './components/weather/Weather';
import { ErrorMsg } from './components/error/ErrorMsg';
import { Loader } from './components/loader/Loader';

export type DayTemplate = {
  name: string;
  sys: { country: string };
  dayName: string;
  fullDayName: string;
  dt_txt: string;
  main: {
    temp_max: number;
    temp_min: number;
    feels_like: number;
    humidity: number;
    temp?: number
  };
  wind: { speed: number };
  weather: [
    {
      id: number | null;
      icon: string;
      description: string;
    }
  ];
  group: number;
}

export type ListItem  = {
  dt_txt: string;
  main:{
    temp: number
    temp_max: number
    temp_min: number
    feels_like: number
    humidity: number
  }
  wind: { speed: number }
  weather: [
    {
      id: number | null;
      icon: string;
      description: string;
    }
  ]
}

export type DayFetch<T extends ListItem> = {
  city: {
    name : string
    country: string
  }
  list: T[]
}

function App() {
  const [currentWeather, setCurrentWeather] = useState<DayTemplate | null>(null)
  const [forecastWeather, setForecastWeather] = useState(null)
  const [errorMsg, setErrorMsg] = useState<string | boolean | null>(null)
  const [loading, setLoading] = useState(false)
  const [weatherDate, setWeatherDate] = useState("")

  useEffect(() => {
    setWeatherDate(new Date().toLocaleString('pl-pl', { weekday: 'long' }))
  }, [])

  const handleOnSearch = async (query: string) => {
    setErrorMsg(false)
    setCurrentWeather(null)
    setForecastWeather(null)
    setWeatherDate(new Date().toLocaleString('pl-pl', { weekday: 'long' }))
    setLoading(true)
    const getCurrentWeather = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&lang=pl&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`)
    const getForecastWeather = fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${query}&lang=pl&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
    Promise.all([getCurrentWeather, getForecastWeather])
      .then(async (response) => {
        setLoading(true)
        if (response[0].ok && response[1].ok) {
          const weatherResp = await response[0].json()
          const forecastResp = await response[1].json()
          setCurrentWeather({ ...weatherResp })
          setForecastWeather(forecastResp)
        }
        else if (response[0].status === 404 || response[1].status === 404) {
          setErrorMsg(`Nie znaleziono miasta "${query}"`)
        }
        else {
          setErrorMsg("Brak połącznia z serwerem pogodowym")
        }
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const changeDate = (date: string) => {
    setWeatherDate(new Date(date).toLocaleString('pl-pl', { weekday: 'long' }))
  }

  return (
    <div className="app-container">
      <Search onSearch={handleOnSearch} setLoading={setLoading} />
      {loading && <Loader />}
      {currentWeather && <Weather data={currentWeather} />}
      {forecastWeather &&
        <Forecast
          data={forecastWeather}
          activeDay={weatherDate}
          changeDate={changeDate}
          changeWeather={setCurrentWeather}
        />}
      {typeof errorMsg === "string" && <ErrorMsg message={errorMsg} />}
    </div>
  );
}

export default App;
