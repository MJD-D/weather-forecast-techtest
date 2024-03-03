'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/forecast.module.css';

interface WeatherData {
  dt: number;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon:string;
  }[];
}

const WeatherForecast: React.FC = () => {
  const [forecastData, setForecastData] = useState<WeatherData[]>([]);
  const [city, setCity] = useState('London'); // Default city
  const [unit, setUnit] = useState('metric'); // Default unit
  const [unitSymbol, setUnitSymbol] = useState('°C'); //Default unit symbol
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  useEffect(() => {
  fetchForecast();
  }, [city,unit]);
  
  const fetchForecast = async () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const id = setTimeout(async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=62cbc9de2249a2cfdab33873db7fba5c&units=${unit}`
        );
        setForecastData(response.data.list);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    }, 500);

    setTimeoutId(id);
  };

  const groupForecastByDay = () => {
    const groupedData: { [key: string]: WeatherData[] } = {};

    forecastData.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const day = date.toDateString();

      if (!groupedData[day]) {
        groupedData[day] = [];
      }

      groupedData[day].push(item);
    });

    return groupedData;
  };

  const findMinMaxTemperature = (data: WeatherData[]) => {
    let minTemp = Infinity;
    let maxTemp = -Infinity;

    data.forEach((item) => {
      const temp = item.main.temp;
      if (temp < minTemp) {
        minTemp = temp;
      }
      if (temp > maxTemp) {
        maxTemp = temp;
      }
    });

    return { minTemp, maxTemp };
  };

 

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleUnitToggle = () => {
    setUnitSymbol(unitSymbol === '°C'? '°F' : '°C');
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
    
  };

  const getIconUrl = (iconCode: string) => {
    return `http://openweathermap.org/img/wn/${iconCode}.png`;
  };

  return (
    <div>
      <h1>5 Day Weather Forecast</h1>
      <label htmlFor="city">Enter City: </label>
      <input
        type="text"
        id="city"
        value={city}
        onChange={handleCityChange}
      />
      
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={unit === 'imperial'}
          onChange={handleUnitToggle}
        />
        <span className={styles.slider}></span>
      </label>
    
      <div className={styles.week} >
      {Object.entries(groupForecastByDay()).map(([day, data]) => (
        <div key={day} className={styles.container}>
          <h2>{day}</h2>
          <div className={styles.dayContainer}>
          <p>High {findMinMaxTemperature(data).maxTemp} {unitSymbol}</p>
          <p>Low {findMinMaxTemperature(data).minTemp} {unitSymbol}</p>
            {data.map((item) => (
              <div key={item.dt} className={styles.day}>
                <div className={styles.iconContainer}>
                    <p>Time: {new Date(item.dt * 1000).toLocaleTimeString([],{hour:"numeric", minute:"2-digit" })}</p>
                    <img className={styles.icon}
                    src={getIconUrl(item.weather[0].icon)}
                    alt={item.weather[0].description}
                    />
                </div>
                <p>Weather: {item.weather[0].description}</p>
               
                <p>Temperature: {item.main.temp} {unitSymbol}</p>
                <p>Humidity: {item.main.humidity}%</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      </div>
    </div>
    
  );
};

export default WeatherForecast;
