export const addParticipantToEvent = async (eventId, participantId) => {
    try {
        const response = await fetch(`http://localhost:8080/events/addParticipant/${eventId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ participantId }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server Error:', errorData);
            throw new Error('Failed to add participant to the event');
          }
      
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error adding participant to the event:', error);
          throw error;
        }
};