import { ChangeEvent, useState } from "react"
import styled from "styled-components"

const MainContainer = styled.div`
color: #FFFFFF;
text-align : center;
font-size : 16px;
`
const Container = styled.div`
display: flex;
justify-content: space-evenly;
`
const DateBox = styled.div`
background: #E0FBFC;
width: 45%;
height: 200px;
border-radius: 5px
`

type Props = {
    onStartInput: (input: string) => void;
    onEndInput: (input: string) => void;
}

function DateSelection({onStartInput, onEndInput} : Props) {
    const [startValue, setStartValue] = useState<string>("")
    const [endValue, setEndValue] = useState<string>("")

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newInput = event.target.value
        const inputName = event.target.name 

        if(inputName === "startDate"){
            setStartValue(newInput);
            onStartInput(newInput);
        } else if(inputName === "endDate"){
            setEndValue(newInput);
            onEndInput(newInput);
        }  
      };
    return (
        <MainContainer>
            Choose Date Range
            <Container>
                <DateBox>
                    <input 
                    type="date" 
                    name="startDate"
                    onChange={handleInputChange} 
                    value={startValue}/>
                </DateBox>
                <DateBox>
                    <input 
                    type="date" 
                    name="endDate"
                    onChange={handleInputChange} 
                    value={endValue}/>
                </DateBox>
            </Container>
        </MainContainer>
    )
}
export default DateSelection