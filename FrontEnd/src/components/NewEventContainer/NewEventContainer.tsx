import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components"
import DateSelection from "./Components/DateSelection/DateSelection";
import TimeSelection from "./Components/TimeSelection/TimeSelection";
import NameSelection from "./Components/NameSelection/NameSelection";
import { Button } from "../Generic/Button/Button";
import Popup from "../Generic/Popup/Popup";
import { useUser } from "../Providers/UserProvider";

const MainContainer = styled.div`
    padding-top : 50px;
    flex-grow : 1;
    display : flex;
    flex-direction : column;
    text-align : center;
    font-size : 32px;
    color : #27374D;
`
const TopContainer = styled.div`
    display: flex;
    justify-content : center;
    font-size : 16px;
`
const BottomContainer = styled.div`
    padding : 20px;
    margin : 20px;
    width : 50%;
    background-color : #3D5A80;
    font-size : 16px;
    border-radius : 10px;
    align-self:center;
    box-shadow: rgb(0 0 0 / 25%) 0px 4px 5px 0px;
`
const ButtonContainer = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
`

const NewEventContainer = () => {
    const { activeUser } = useUser();
    const navigate = useNavigate();

    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        timeStart: 1,
        timeEnd: 1,
        dateStart: '',
        dateEnd: '',
        participants: '',
    });

    useEffect(() => {
        formData.participants = activeUser;
    },[activeUser])
    
    const handleInput = (inputType: keyof typeof formData, inputValue: string | number) => {
        setFormData({...formData, [inputType]: inputValue});
    }

    const handleClick = async () => {
        try {
            if (!activeUser) {
                showErorMessage('You need to be logged in to create an event');
                return;
            }

            const validationErrors = validateInput();

            if (validationErrors.length > 0) {
                const errorMessage = validationErrors.join(', ');
                showErorMessage(errorMessage);
            } else {
                const eventUrl = 'http://localhost:8080/events/create';
                const gridUrl = 'http://localhost:8080/grid';

                const eventResponse = await fetch(eventUrl, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (!eventResponse.ok) {
                    throw new Error('Network response was not ok');
                }

                const eventData = await eventResponse.json();
                const id = eventData.id;

                await fetch(`${gridUrl}/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        eventId: id,
                        userId: activeUser,
                        selectedCells: [],
                    }),
                });

                navigate(`/event/${id}`);
            }
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };


    const validateInput = () => {
        const errors = [];

        const startDate = new Date(formData.dateStart);
        const endDate = new Date(formData.dateEnd);

        if (formData.name === ''){
            errors.push('Name is required')
        }
        if (formData.timeEnd <= formData.timeStart){
            errors.push('End time must be after start time')
        }
        if (formData.dateStart === '' || formData.dateEnd === ''){
            errors.push('Both start and end dates are required')
        }
        if (startDate > endDate) {
            errors.push('End date must be after start date');
        }
        
        return errors;
    }

    const showErorMessage = (message) => {
        setPopupMessage(message);
        setShowPopup(true);
    }  
    
    const hidePopup = () => {
        setShowPopup(false);
        setPopupMessage('');
    }

    return (
        <MainContainer>
            New Event
            <TopContainer>
                <NameSelection 
                    onInput={(input) => handleInput("name", input)}
                />
                <TimeSelection 
                    onStartInput={(input => handleInput("timeStart", input))} 
                    onEndInput={(input => handleInput("timeEnd", input))} 
                />
            </TopContainer>
            <BottomContainer>
                <DateSelection
                    onStartInput={(input => handleInput("dateStart", input))}
                    onEndInput={(input => handleInput("dateEnd", input))}
                />
                <ButtonContainer>
                    <Button onClick={handleClick}>
                        create
                    </Button>
                </ButtonContainer>
            </BottomContainer>
            {showPopup && (
                <Popup message={popupMessage} onClose={hidePopup} />
            )}
            
        </MainContainer>
    )
}

export default NewEventContainer