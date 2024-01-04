import { useEffect, useState } from 'react';
import countriesService from './services/countries';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [capitalWeather, setCapitalWeather] = useState({})
  const apiKey = import.meta.env.VITE_API_KEY

  useEffect(() => {
    fetchAllCountries();
  }, []);

  const filteredCountries = countries.filter((country) => {
    const countryName = country.name.common.toLowerCase();
    const searchedCountry = searchTerm.toLowerCase();

    return countryName.includes(searchedCountry);
  });

  const fetchCapitalWeather = async (lat, lng) => {
    const weatherData = await countriesService.getWeatherData(lat, lng, apiKey)
    setCapitalWeather(weatherData)
  }

  useEffect(() => {
    if (filteredCountries.length !== 1) return
    const [lat, lng] = filteredCountries[0].capitalInfo.latlng

    if (!Object.keys(capitalWeather).length) {
      fetchCapitalWeather(lat, lng)
    }

  }, [filteredCountries])

  const fetchAllCountries = async () => {
    const countries = await countriesService.getAllCountries();

    setCountries(countries);
  };

  const handleSTChange = (e) => {
    const newSearchTerm = e.target.value;

    // If we change the search term and the amount of countries is more than 1, reset weather data
    if (filteredCountries.length > 1) {
      setCapitalWeather({})
    }

    setSearchTerm(newSearchTerm);
  };

  const handleCountrySelection = (countryName) => {
    setSearchTerm(countryName)
  }

  return (
    <div>
      find countries <input value={searchTerm} onChange={handleSTChange} />
      {searchTerm &&
        filteredCountries.length !== 1 &&
        (filteredCountries.length >= 10 && filteredCountries.length > 1 ? (
          <p>Too many matches, specify another filter</p>
        ) : (
          filteredCountries.map((country) => (
            <li key={country.name.common}>{country.name.common} <button onClick={() => handleCountrySelection(country.name.common)}>show</button></li>
          ))
        ))}
      {filteredCountries.length === 1 && (
        <div>
          <h1>{filteredCountries[0].name.common}</h1>
          <p>capital {filteredCountries[0].capital}</p>
          <p>area {filteredCountries[0].area}</p>
          <h3>languages:</h3>
          <ul>
            {Object.values(filteredCountries[0].languages).map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <img src={filteredCountries[0].flags.png} alt={`Flag of ${filteredCountries[0].name.common}`} />
          <h3>{`Weather in ${filteredCountries[0].capital}`}</h3>
          <p>{`temperature ${capitalWeather.temperature || '-'} Celsius`}</p>
          <img src={capitalWeather.imageUrl} />
          <p>{`wind ${capitalWeather.windSpeed || '-'} m/s`}</p>
        </div>
      )}
    </div>
  );
};

export default App;
