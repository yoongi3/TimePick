import React from "react";
import styled from "styled-components";

type Props = {
    placeholder: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox = ({ placeholder, value, onChange}: Props) => {
    return(
    <StyledInputBox
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    />
    )
}

export default InputBox

const StyledInputBox = styled.input`
    background: #E0FBFC;
    color: #3D5A80;
    border: none;
    width: 90%;
    padding: 8px;
    margin: 4px 0;
    border-radius: 7px;
    box-sizing: border-box;
    font-size: 14px;
`
