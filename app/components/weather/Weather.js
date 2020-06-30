import React, { useState } from 'react';
import { httpCall } from '../common/http';

import './less/weather.less';

function Weather() {
  const [zipCode, setZipCode] = useState('97006');
  const [weatherData, setWeatherData] = useState({});
  const [scrubbedName, setScrubbedName] = useState('');
  const weatherKey = WEATHER_KEY;

  const handleChange = (e) => {
    e.preventDefault();
    setZipCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const weather = await httpCall(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${weatherKey}`, 'GET', {}, {});
    
    setWeatherData(weather.data);
    const editedName = await httpCall('/word', 'GET', {}, { word: weather.data.name, operation: 'scrub' });
    setScrubbedName(editedName.data);
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Zip Code: <input type="text" value={zipCode} name="zipcode" onChange={handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
      <div>
        <div>
          City: { weatherData.name !== undefined ? weatherData.name : '' }
        </div>
        <div>
          Temp: {weatherData.main !== undefined ? Math.round(weatherData.main.temp * (9 / 5) - 459.67) : ''}
        </div>
        <div>
          Scrubbed City Name: { scrubbedName }
        </div>
      </div>
    </div>
  );
}

export default Weather;
