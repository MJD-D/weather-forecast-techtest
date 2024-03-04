'use client'

import { useState } from 'react';
import styles from '../../styles/forecast.module.css';
import { WeatherData } from '../../types';
import { useForecast } from './useForecast';
import { Day } from '../dayComponents/Day';


const WeatherForecast = () => {
  const [city, setCity] = useState('London'); // Default city
  const [unit, setUnit] = useState('metric'); // Default unit
  const [unitSymbol, setUnitSymbol] = useState('°C'); //Default unit symbol

  const {forecastData} = useForecast(city,unit)

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

 

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleUnitToggle = () => {
    setUnitSymbol(unitSymbol === '°C'? '°F' : '°C');
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
    
  };


  return (
    <div className={styles.page}>
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
        <Day key={day} day={day} data={data} unitSymbol={unitSymbol}/>
      ))}
      </div>
    </div>
    
  );
};

export default WeatherForecast;
