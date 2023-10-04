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

    const handleClick = () => {
        console.log('event name: ' + formData.name)
        console.log('Time start: ' + formData.timeStart,'/ Time end: ' + formData.timeEnd)
        console.log('Date start: ' + formData.dateStart,'/ Date end: ' + formData.dateEnd)
        navigate(`/event?name=${formData.name}&timeStart=${formData.timeStart}&timeEnd=${formData.timeEnd}&dateStart=${formData.dateStart}&dateEnd=${formData.dateEnd}`)
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