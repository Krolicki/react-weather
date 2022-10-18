import './App.css';
import { Search } from './components/search/Search';
import { Weather } from './components/search/weather/Weather';

function App() {

  const handleOnSearch = (query) => {
    console.log(query)
  }

  return (
    <div className="app-container">
      <Search onSearch={handleOnSearch}/>
      <Weather />
    </div>
  );
}

export default App;
