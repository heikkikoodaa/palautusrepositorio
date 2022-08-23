import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [countryFilter, setCountryFilter] = useState('');
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => setCountryData(response.data));
  }, []);

  const handleFilterChange = (event) => {
    const { value } = event.target;

    setCountryFilter(value);
  };

  const handleShowCountry = (event) => {
    event.preventDefault();
    const { innerText } = event.target.firstChild;

    setCountryFilter(innerText);
  };

  const countries = countryData.filter((country) => {
    const { common: countryName } = country.name;
    return countryName.toLowerCase().includes(countryFilter.toLowerCase());
  });

  let countryList = [];

  if (countries.length <= 10) {
    countryList = countries.map((country) => (
      <form onSubmit={handleShowCountry} key={country.name.official}>
        <p>{country.name.common}</p>
        <button type="submit">show</button>
      </form>
    ));
  }

  if (countries.length === 1) {
    countryList = countries.map((country) => {
      const languages = Object.values(country.languages).map((language) => {
        return <li key={language}>{language}</li>;
      });

      return (
        <div key={country.name.common}>
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital[0]}</p>
          <p>Area: {country.area}</p>
          <h3>Languages:</h3>
          <ul>{languages}</ul>
          <img alt={`Flag of ${country.name.common}`} src={country.flags.png} />
        </div>
      );
    });
  }

  return (
    <div>
      find countries:{' '}
      <input value={countryFilter} onChange={handleFilterChange} />
      <br />
      {countries.length > 10 && 'Too many matches, specify another filter'}
      {countryList}
    </div>
  );
};

export default App;
