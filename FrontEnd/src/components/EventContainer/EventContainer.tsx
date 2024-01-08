import styled from "styled-components"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useUser } from "../Providers/UserProvider"
import { addParticipantToEvent } from "../Services/EventService"
import { Button } from "../Generic/Button/Button"
import Grid from "./UserGrid"
import { useGrid } from "../Providers/GridProvider"
import DateLabel from "./DateLabel"
import TimeLabel from "./TimeLabel"
import EventGrid from "./EventGrid"

const Container = styled.div`
flex-grow : 1;
display : flex;
flex-direction : column;
align-items : center;
`

const ScrollBox = styled.div`
  width: 500px; 
  height: 500px; 
  overflow: auto;
  border: 2px solid #3498db;
  border-radius: 8px; 
  background-color: #f0f0f0;
`
const GridContainer = styled.div`
  display: flex;
  padding: 15px; 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`
const Grids = styled.div`
  display: flex;
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
    const { activeUser, displayName } = useUser();
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
    const [initialCells, setInitialCells] = useState<[number, number][]>()
    const {grid, updateCell} = useGrid();

    const [groupCells, setGroupCells] = useState<[number,number][]>([])

    useEffect(() => {
      const fetchEventInfo = async () => {
        try {
          const response = await fetch(`http://localhost:8080/events?id=${id}`);
          const data = await response.json();
          setEventInfo(data[0]);
          participantListHandler(data[0].participants);
        } catch (error) {
          console.error("Error fetching event data:", error);
        }
      };
      fetchEventInfo();
    }, [id]);

    const fetchEventGrid = async () => {
      try {
        const eventGridResponse = await fetch(`http://localhost:8080/grid/getData/${id}`);
        const eventGridData = await eventGridResponse.json();
        console.log("Updated Event Grid:", eventGridData);
        setGroupCells(eventGridData)
      } catch (error) {
        console.error("Error fetching updated event grid:", error);
      }
    };

    useEffect(() => {
      const fetchUserGrid = async () => {
        try {
          const response = await fetch(`http://localhost:8080/usergrid/${id}/${activeUser}`);
          
          const data = await response.json();
          const userInitialCells = data.map(([row, col]) => [row, col]);
          setInitialCells(userInitialCells);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      if(activeUser){
        fetchUserGrid();
        fetchEventGrid();
      }
    }, [activeUser])

    useEffect(() => {
      InitGrid();
    },[initialCells])

    const InitGrid = () => {
      if (initialCells) {
        initialCells.forEach(([row, col]) => {
          updateCell(row, col, 1);
        });
      }
    };

    const handleSubmit = async () => {
      try {
        await handleAddParticipant();
        const data = convertDataToArray(grid)
        await pushUserGrid(data);
        fetchEventGrid();
      } catch (error) {
        console.error("Error submitting and saving:", error);
      }
    };

    const convertDataToArray = (grid) => {
      const result = [];
  
      for (let row = 0; row < grid.length; row++) {
          for (let col = 0; col < grid[row].length; col++) {
              if (grid[row][col] === 1) {
                  result.push([row, col]);
              }
          }
      }
  
      return result;
  };

    const handleAddParticipant = async () => {
      try {
        if (eventInfo.participants.includes(activeUser)) {
          console.log('User is already a participant.');
          return;
        }

        await addParticipantToEvent(eventInfo.id, activeUser);
  
        const updatedEventResponse = await fetch(
          `http://localhost:8080/events?id=${id}`
        );
        const updatedEventData = await updatedEventResponse.json();
  
        setEventInfo(updatedEventData[0]);
        participantListHandler(updatedEventData[0].participants);
      } catch (error) {
        console.error("Error adding participant to the event:", error);
      }
    };

    const pushUserGrid = async (userGridState: [number, number][]) => {
      try {
        const response = await fetch(`http://localhost:8080/grid/${id}/${activeUser}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ selectedCells: userGridState }),
        });
    
        if (response.ok) {
          console.log('User grid successfully updated on the server.');
        } else {
          console.error('Failed to update user grid on the server.');
        }
      } catch (error) {
        console.error('Error updating user grid:', error);
      }
    }

    const participantListHandler = async (participantIds: string[]) => {
      const updatedParticipantDisplayNames = await Promise.all(
        participantIds.map(async (participantId) => {
          try {
            const userNameResponse = await fetch(
              `http://localhost:8080/users?id=${participantId}`
            );
            const userNameData = await userNameResponse.json();
            return userNameData[0]?.displayName || "Unknown User";
          } catch (error) {
            console.error("Error fetching user data:", error);
            return "Unknown User";
          }
        })
      );
      setParticipants(updatedParticipantDisplayNames);
    };

    const millSecInDay = 1000 * 60 * 60 * 24;
    const colLength = Math.floor((new Date(eventInfo.dateEnd).getTime() - new Date(eventInfo.dateStart).getTime()) / millSecInDay + 1);

    const intervals = 60/30; // 30 min intervals
    const rowLength = (parseInt(eventInfo.timeEnd, 10) - parseInt(eventInfo.timeStart, 10)) * intervals; 

    return(
        <Container>
            {!activeUser && <div>Login to edit availabilities</div>}

            {activeUser &&
                <>
                    <p>{eventInfo.name}</p>
                    <Grids>
                      <div>
                        <div>{displayName}'s Availability</div>
                        <ScrollBox>
                          <GridContainer>
                            <TimeLabel startTime={eventInfo.timeStart} endTime={eventInfo.timeEnd}/>
                            <div>
                              <DateLabel startDate={eventInfo.dateStart} endDate={eventInfo.dateEnd}/>
                              <Grid rows={rowLength} cols={colLength}/>
                            </div>
                          </GridContainer>
                        </ScrollBox>
                        
                        <Button onClick={handleSubmit}>Update Availability</Button>
                      </div>
                      <div>
                        <div>Groups Availability</div>
                        <ScrollBox>
                          <GridContainer>
                            <TimeLabel startTime={eventInfo.timeStart} endTime={eventInfo.timeEnd}/>
                            <div>
                              <DateLabel startDate={eventInfo.dateStart} endDate={eventInfo.dateEnd}/>
                              <EventGrid initialCells={groupCells} rows={rowLength} cols={colLength} users={participants.length}/>
                            </div>
                          </GridContainer>
                        </ScrollBox>
                      </div>
                      
                    </Grids>
                    
                    
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