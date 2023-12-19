export const addParticipantToEvent = async (eventId, participantId) => {
    try {
        const response = await fetch(`http://localhost:8080/events/addParticipant/${eventId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ participantId }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error('Server Error:', responseData);
            throw new Error('Failed to add participant to the event');
          }
        
        return responseData
        } catch (error) {
          console.error('Error adding participant to the event:', error);
          throw error;
        }
};