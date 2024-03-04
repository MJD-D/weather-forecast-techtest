
import styles from '../../styles/forecast.module.css';

interface Props {
    dt:number;
    icon:string;
    description:string;
    temp:number;
    humidity:number;
    unitSymbol:string;
}

export const Timeslot = ({dt, icon, description, humidity, temp, unitSymbol}:Props) => {

    const getIconUrl = (iconCode: string) => {
        return `http://openweathermap.org/img/wn/${iconCode}.png`;
      };

      return(
            <div className={styles.timeslot}>
                <div className={styles.iconContainer}>
                    <p>Time: {new Date(dt * 1000).toLocaleTimeString([],{hour:"numeric", minute:"2-digit" })}</p>
                    <img className={styles.icon}
                    src={getIconUrl(icon)}
                    alt={description}
                    />
                </div>
                <p>Weather: {description}</p>
                <p>Temperature: {temp} {unitSymbol}</p>
                <p>Humidity: {humidity}%</p>
            </div>
      );
}