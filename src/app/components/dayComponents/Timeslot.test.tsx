import { Timeslot } from "./Timeslot"
import {render, screen} from '@testing-library/react'

const mockTimeslotData = {
    dt : 1661871600,
    icon : "10d",
    description : "light rain",
    humidity: 69,
    temp :7.48,
    unitSymbol: "°C"
}

describe('Timeslot', ()=> {
    test('renders Timeslot correctly', async () => {
        render(<Timeslot {...mockTimeslotData}/>);
        expect(screen.getByAltText("light rain")).toBeVisible();
        expect(screen.getByText("Weather: light rain")).toBeVisible();
        expect(screen.getByText("Temperature: 7.48 °C")).toBeVisible();
        expect(screen.getByText("Humidity: 69%")).toBeVisible();
        expect(screen.getByText("Time: 16:00")).toBeVisible();

    })
})