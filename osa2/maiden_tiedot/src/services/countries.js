import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAllCountries = async () => {
  const { data } = await axios.get(baseUrl)
  
  return data
}

const getWeatherData = async (lat, lon, apiKey) => {
  const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
  const iconName = data.weather[0].icon
  const imageUrl = `https://openweathermap.org/img/wn/${iconName}@2x.png`
  const temperature = data.main.temp
  const windSpeed = data.wind.speed

  return {
    imageUrl,
    temperature,
    windSpeed
  }
}

export default {
  getAllCountries,
  getWeatherData
}