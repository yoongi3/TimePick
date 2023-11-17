import styled from "styled-components"
import GridContainer from "./GridContainer"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useUser } from "../Providers/UserProvider"
import LoginBox from "../Generic/AuthBox/AuthBox"

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
    const { isLoggedIn, login, logout } = useUser();

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
        fetch(`http://localhost:8080/events?id=${id}`)
        .then(response => response.json())
        .then(data => {
            setEventInfo(data[0])
        })
    }, []);

    const millSecInDay = 1000 * 60 * 60 * 24; // (mill/sec) * (sec/min) * (min/hour) * (hour/day)
    const colLength = Math.floor((new Date(eventInfo.dateEnd).getTime() - new Date(eventInfo.dateStart).getTime()) / millSecInDay + 1);

    const intervals = 60/30; // 30 min intervals
    const rowLength = (parseInt(eventInfo.timeEnd, 10) - parseInt(eventInfo.timeStart, 10)) * intervals; 

    return(
        <Container>
            {!isLoggedIn && 
                <>
                    <div>Login to edit availabilities</div>
                </>
            }
            
            {isLoggedIn &&
                <>
                    <p>{eventInfo.name}</p>
                    <GridContainer 
                    numCols={colLength} numRows={rowLength}
                    startDate={eventInfo.dateStart} endDate={eventInfo.dateEnd} 
                    startTime={eventInfo.timeStart} endTime={eventInfo.timeEnd}
                    />
                    <button>submit and save</button>
                </>
            }
        </Container>
    )
}

export default EventContainer