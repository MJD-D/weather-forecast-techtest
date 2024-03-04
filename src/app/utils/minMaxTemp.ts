import { WeatherData } from "../types";


export const findMinMaxTemperature = (data: WeatherData[]) => {
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