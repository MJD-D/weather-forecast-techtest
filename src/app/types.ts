export interface WeatherData {
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