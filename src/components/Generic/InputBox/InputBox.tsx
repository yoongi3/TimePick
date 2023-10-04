import React from "react";
import { CSSProperties } from "styled-components";

type Props = {
    style?: CSSProperties;
    placeholder: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox = ({ style, placeholder, value, onChange}: Props) => {
    return(
    <input
    style={style}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    />
    )
}

export default InputBox

