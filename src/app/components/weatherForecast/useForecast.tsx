import axios from 'axios';
import { useEffect, useState, useCallback} from 'react';
import { WeatherData } from '../../types';

export const useForecast =  (city:String, unit: String, timeoutLength = 500) => {

  const [forecastData, setForecastData] = useState<WeatherData[]>([]);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    

    
  const fetchForecast =  () => {
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
    }, timeoutLength)

    setTimeoutId(id);
  }

  useEffect(() => {
    fetchForecast();
    return() => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }
  }, [city,unit]);

  return {forecastData};
  };