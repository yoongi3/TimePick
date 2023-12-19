import React, {useState} from "react";
import styled from "styled-components"
import Dropdown from "../../../Generic/Dropdown/Dropdown";

const MainContainer = styled.div`
background-color : #3D5A80;
color: #FFFFFF;
text-align : center;
width : 250px;
margin : 20px;
padding : 10px;
border-radius : 5px;
box-shadow: rgb(0 0 0 / 25%) 0px 4px 5px 0px;
`
const Container = styled.div`
display : flex;
justify-content : space-evenly;
`
type Props = {
    onStartInput: (input: number) => void;
    onEndInput: (input: number) => void;
}

function TimeSelection({onStartInput, onEndInput}: Props) {
    const timeDropdown = [
        {label : '12:00 AM', value : 0},
        {label : '1:00 AM', value : 1},
        {label : '2:00 AM', value : 2},
        {label : '3:00 AM', value : 3},
        {label : '4:00 AM', value : 4},
        {label : '5:00 AM', value : 5},
        {label : '6:00 AM', value : 6},
        {label : '7:00 AM', value : 7},
        {label : '8:00 AM', value : 8},
        {label : '9:00 AM', value : 9},
        {label : '10:00 AM', value : 10},
        {label : '11:00 AM', value : 11},
        {label : '12:00 PM', value : 12},
        {label : '1:00 PM', value : 13},
        {label : '2:00 PM', value : 14},
        {label : '3:00 PM', value : 15},
        {label : '4:00 PM', value : 16},
        {label : '5:00 PM', value : 17},
        {label : '6:00 PM', value : 18},
        {label : '7:00 PM', value : 19},
        {label : '8:00 PM', value : 20},
        {label : '9:00 PM', value : 21},
        {label : '10:00 PM', value : 22},
        {label : '11:00 PM', value : 23},
        {label : '12:00 AM', value : 24}
    ]

    const [startValue, setStartValue] = useState<number>(0)
    const [endValue, setEndValue] = useState<number>(0)

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newInput = Number(event.target.value)

        if(event.target.name === "startTime"){
            setStartValue(newInput);
            onStartInput(newInput);
        } else if(event.target.name === "endTime"){
            setEndValue(newInput);
            onEndInput(newInput);
        }   
    }

    return (
        <MainContainer>
            Choose Time Range
            <Container>
                <Dropdown 
                    options={timeDropdown}
                    name= "startTime"
                    value={startValue} 
                    handleValueSelect={handleChange} 
                    style={{backgroundColor:'#E0FBFC', color:'#3D5A80', borderRadius: '5px', border:'none'}}
                />
                <Dropdown 
                    options={timeDropdown}
                    name= "endTime"
                    value={endValue} 
                    handleValueSelect={handleChange}
                    style={{backgroundColor:'#EE6C4D', color:'#FFFFFF', borderRadius: '5px', border:'none'}}
                />
            </Container>
        </MainContainer>
    )
}
export default TimeSelection