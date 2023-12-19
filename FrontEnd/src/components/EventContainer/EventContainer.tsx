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
    participants: string[];
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
        participants: []
    });

    const [participants, setParticipants] = useState<string[]>([]);

    useEffect(() => {
        fetch(`http://localhost:8080/events?id=${id}`)
        .then(response => response.json())
        .then(data => {
            setEventInfo(data[0])
            participantListHandler(data[0].participants)
        })
    }, [id]);

    const handleAddParticipant = async () => {
        try {
            await addParticipantToEvent(eventInfo.id, userID); 
            
            const updatedEventResponse = await fetch(
                `http://localhost:8080/events?id=${id}`
            );
            const updatedEventData = await updatedEventResponse.json();
            
            setEventInfo(updatedEventData[0]);

            participantListHandler(updatedEventData[0].participants);
          } catch (error) {
            console.error('Error adding participant to the event:', error);
          }
    }

    const participantListHandler = async (participantIds: string[]) => {
        const updatedParticipantDisplayNames = await Promise.all(
            participantIds.map(async (participantId) => {
              const userNameResponse = await fetch(
                `http://localhost:8080/users?id=${participantId}`
              );
              const userNameData = await userNameResponse.json();
              return userNameData[0]?.displayName || 'Unknown User';
            })
          );
          setParticipants(updatedParticipantDisplayNames);
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
                    <div>
            <p>List of Participants:</p>
            <ul>
              {participants.map((participant, index) => (
                <li key={index}>{participant}</li>
              ))}
            </ul>
          </div>
                </>
            }
        </Container>
    )
}

export default EventContainer