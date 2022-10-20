import { useState } from 'react';
import './App.css';
import { Search } from './components/search/Search';
import { Weather } from './components/weather/Weather';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null)
  
  const handleOnSearch = (query) => {
    const getCurrentWeather = fetch(`http://api.openweathermap.org/data/2.5/weather?q=${query}&lang=pl&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`)

    Promise.all([getCurrentWeather])
      .then(async (response) => {
        const weatherResp = await response[0].json()

        setCurrentWeather({...weatherResp})
      })
  }

  console.log(currentWeather)

  return (
    <div className="app-container">
      <Search onSearch={handleOnSearch}/>
      {currentWeather && <Weather data={currentWeather}/>}
    </div>
  );
}

export default App;
