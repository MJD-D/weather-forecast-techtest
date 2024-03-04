
import { findMinMaxTemperature } from '@/app/utils/minMaxTemp';
import { WeatherData } from '@/app/types';
import { Timeslot } from './Timeslot';

import styles from '../../styles/forecast.module.css';

interface Props {
    day:string,
    data: WeatherData[]
    unitSymbol: string
}

export const Day = ({day, data, unitSymbol}:Props) => {

    const {minTemp,maxTemp} = findMinMaxTemperature(data)
    return (
    <div className={styles.container}>
        <h2>{day}</h2>
        <div className={styles.dayContainer}>
        <p>High {maxTemp} {unitSymbol}</p>
        <p>Low {minTemp} {unitSymbol}</p>
        {data.map((item) => (
            <Timeslot key={item.dt} dt= {item.dt} icon= {item.weather[0].icon} description={item.weather[0].description}  humidity={item.main.humidity} temp= {item.main.temp} unitSymbol={unitSymbol}/>
        ))}
        </div>
    </div>
    );
}