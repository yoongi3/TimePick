import styled from "styled-components"
import GridContainer from "./GridContainer"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const Container = styled.div`
flex-grow : 1;
display : flex;
flex-direction : column;
align-items : center;
`

type EventInfo = {
    id: string;
    name: string;
    timeStart: string;
    timeEnd: string;
    dateStart: string;
    dateEnd: string;
  };

const EventContainer = () => {
    const [eventInfo, setEventInfo] = useState<EventInfo>({
        id: '',
        name: '',
        timeStart: '',
        timeEnd: '',
        dateStart: '',
        dateEnd: '',
    });

    const {id} = useParams();

    useEffect(() => {
        // const currentURL = window.location.href;
        // const searchParams = new URLSearchParams(currentURL);

        // const paramNames = ['name', 'timeStart', 'timeEnd', 'dateStart', 'dateEnd']

        // const updatedEventInfo: EventInfo = { ...eventInfo };

        // paramNames.forEach(paramName => {
        //     const paramValue = searchParams.get(paramName) ?? '';
            
        //     if (paramName) {
        //         updatedEventInfo[paramName as keyof EventInfo] = paramValue;
        //     } else {
        //         console.log(paramName + ' not found in URL');
        //     }
        // })
        fetch(`http://localhost:8080/events?id=${id}`)
        .then(response => response.json())
        .then(data => {
            setEventInfo(data[0])
        })
    }, []);

    if (!eventInfo.name) {
        return <p>Loading...</p>;
    }

    const millSecInDay = 1000 * 60 * 60 * 24; // (mill/sec) * (sec/min) * (min/hour) * (hour/day)
    const colLength = Math.floor((new Date(eventInfo.dateEnd).getTime() - new Date(eventInfo.dateStart).getTime()) / millSecInDay + 1);

    const intervals = 60/30; // 30 min intervals
    const rowLength = (parseInt(eventInfo.timeEnd, 10) - parseInt(eventInfo.timeStart, 10)) * intervals; 

    return(
        <Container>
            <p>{eventInfo.name}</p>
            <GridContainer 
            numCols={colLength} numRows={rowLength}
            startDate={eventInfo.dateStart} endDate={eventInfo.dateEnd} 
            startTime={eventInfo.timeStart} endTime={eventInfo.timeEnd}
            />
            <button>submit</button>
        </Container>
    )
}

export default EventContainer