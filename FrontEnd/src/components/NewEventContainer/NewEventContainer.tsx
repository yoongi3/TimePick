import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components"
import DateSelection from "./DateSelection/DateSelection";
import TimeSelection from "./TimeSelection/TimeSelection";
import NameSelection from "./NameSelection/NameSelection";
import Button from "../Generic/ReusableButton/Button";

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
    padding : 10px;
    margin : 20px;
    width : 50%;
    background-color : #3D5A80;
    font-size : 16px;
    border-radius : 10px;
    align-self:center;
    box-shadow: rgb(0 0 0 / 25%) 0px 4px 5px 0px;
`

const NewEventContainer = () => {
    const navigate = useNavigate();

    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        name: '',
        timeStart: 0,
        timeEnd: 0,
        dateStart: '',
        dateEnd: ''
    });
    
    const handleInput = (inputType: keyof typeof formData, inputValue: string | number) => {
        setFormData({...formData, [inputType]: inputValue});
    }

    const validateInput = () => {
        if (formData.name === ''){
            setError('Name is required.')
            console.log(error)
            return false;
        }
        else if (formData.timeEnd <= formData.timeStart){
            setError('Times need to be 1 hour apart')
            console.log(error)
            return false;
        }
        else if (formData.dateStart === '' || formData.dateEnd === ''){
            setError('Both start and end dates are required')
            console.log(error);
            return false
        }

        const startDate = new Date(formData.dateStart);
        const endDate = new Date(formData.dateEnd);

        if (startDate > endDate) {
            setError('End date must be after start date');
            console.log(error)
            return false;
        }

        setError('');
        return true;
    }

    const handleClick = (event) => {
        if(validateInput()){
            const url = 'http://localhost:8080/events/create';

            fetch (url, {
                method: 'Post',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then((response) => {
                if(!response.ok){
                    throw new Error ('Network response was not ok')
                } 
                return response.json()
            })
            .then((data) => {
                const id = data.id;
                navigate(`/event/${id}`)
            })
        }
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
                <Button 
                    onClick={handleClick} 
                    style={{backgroundColor: '#EE6C4D', color: '#FFFFFF'}}>
                    create
                </Button>
            </BottomContainer>
            
        </MainContainer>
    )
}

export default NewEventContainer