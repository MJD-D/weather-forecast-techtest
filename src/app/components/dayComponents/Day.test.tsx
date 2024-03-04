import { Day } from "./Day"
import {render, screen} from '@testing-library/react'


const mockDay = "Tue Mar 05 2024";
const mockTimeslotData = 
    [
    {
        dt : 1709586000,
        main: {
            temp :9.48,
            humidity: 69,
        },
        weather: [{
            description : "light rain",
            icon : "10d",
        }]
    },
    {
        dt : 1709596800,
        main: {
            temp :7.48,
            humidity: 69,
        },
        weather: [{
            description : "light rain",
            icon : "10d",
        }]
    },
    {
        dt : 1709607600,
        main: {
            temp :5.48,
            humidity: 69,
        },
        weather: [{
            description : "light rain",
            icon : "10d",
        }]
    },
    ]


describe('Day', ()=> {
    test('renders days correctly', async () => {
        render(<Day day={mockDay} data={mockTimeslotData} unitSymbol="°C"/>);
        screen.debug()
        expect(screen.getByText("Tue Mar 05 2024")).toBeVisible();
        expect(screen.getByText("High 9.48 °C")).toBeVisible();
        expect(screen.getByText("Low 5.48 °C")).toBeVisible();
        

    })
})