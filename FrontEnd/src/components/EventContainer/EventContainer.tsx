import styled from "styled-components"
import GridContainer from "./GridContainer"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useUser } from "../Providers/UserProvider"
import { addParticipantToEvent } from "../Services/EventService"
import { Button } from "../Generic/Button/Button"

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
    const { isLoggedIn, id: userID } = useUser();
    const {id} = useParams();

    const [eventInfo, setEventInfo] = useState<EventInfo>({
        id: '',
        name: '',
        timeStart: '',
        timeEnd: '',
        dateStart: '',
        dateEnd: '',
    });

    useEffect(() => {
        fetch(`http://localhost:8080/events?id=${id}`)
        .then(response => response.json())
        .then(data => {
            setEventInfo(data[0])
        })
    }, [id]);

    const handleAddParticipant = async () => {
        try {
            await addParticipantToEvent(eventInfo.id, userID); // Replace 'userID' with the actual user ID
            console.log('Participant added to the event');
            console.log()
          } catch (error) {
            console.error('Error adding participant to the event:', error);
          }
    }

    const millSecInDay = 1000 * 60 * 60 * 24;
    const colLength = Math.floor((new Date(eventInfo.dateEnd).getTime() - new Date(eventInfo.dateStart).getTime()) / millSecInDay + 1);

    const intervals = 60/30; // 30 min intervals
    const rowLength = (parseInt(eventInfo.timeEnd, 10) - parseInt(eventInfo.timeStart, 10)) * intervals; 

    return(
        <Container>
            {!isLoggedIn && <div>Login to edit availabilities</div>}

            {isLoggedIn &&
                <>
                    <p>{eventInfo.name}</p>
                    <GridContainer 
                    numCols={colLength} numRows={rowLength}
                    startDate={eventInfo.dateStart} endDate={eventInfo.dateEnd} 
                    startTime={eventInfo.timeStart} endTime={eventInfo.timeEnd}
                    />
                    <Button onClick={handleAddParticipant}>submit and save</Button>
                </>
            }
        </Container>
    )
}

export default EventContainer