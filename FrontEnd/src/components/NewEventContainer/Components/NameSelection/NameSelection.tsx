import { useState, ChangeEvent } from "react";
import styled from "styled-components";
import InputBox from "../../../Generic/InputBox/InputBox";

const Container = styled.div`
background-color : #3D5A80;
color: #FFFFFF;
text-align : center;
width : 250px;
margin : 20px;
padding : 10px;
border-radius : 5px;
box-shadow: rgb(0 0 0 / 25%) 0px 4px 5px 0px;
`

type Props = {
    onInput: (input: string) => void;
}

const NameSelection = ({onInput} : Props) => {
    const [inputValue, setInputValue] = useState<string>("");
    
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newInput = event.target.value
        setInputValue(newInput);

        onInput(newInput);
      };

    return (
        <Container>
            <div>Event Name</div>
            <InputBox 
              style={{backgroundColor:'#E0FBFC', color:'#3D5A80', border:'none', width:'90%'}}
              placeholder="My Event Name"
              value={inputValue}
              onChange={handleInputChange}
            />
        </Container>
    )
}

export default NameSelection