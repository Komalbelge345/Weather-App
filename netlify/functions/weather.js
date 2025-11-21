exports.handler = async (event) => {
  const apiKey = process.env.API_KEY;  
  const city = event.queryStringParameters.city;

  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
