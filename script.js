async function getWeather(city) {
  // 1. Get coordinates
  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
  );
  const geo = await geoRes.json();

  const lat = geo.results[0].latitude;
  const lon = geo.results[0].longitude;

  // 2. Fetch weather (current + max/min + humidity)
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
  );

  const data = await response.json();

  // Extract data
  const current = data.current_weather;
  const daily = data.daily;

  // humidity from hourly at nearest time
  const humidity = data.hourly.relativehumidity_2m[0];

  const weatherInfo = {
    temperature: current.temperature,
    windspeed: current.windspeed,
    humidity: humidity,
    max_temp: daily.temperature_2m_max[0],
    min_temp: daily.temperature_2m_min[0]
  };

  console.log(weatherInfo);
}
getWeather("south korea");