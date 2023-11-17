import React, { ChangeEvent, useState } from "react";
import InputBox from "../InputBox/InputBox";
import { useUser } from "../../Providers/UserProvider";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

export const LoginBox = () => {
    const { isLoggedIn,login } = useUser();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    } 

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleLogin = () => {
        login();
    }

    return(
    <Container>
        <InputBox 
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
        /> 
        <InputBox 
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
        /> 
        <button onClick={handleLogin}>Login</button>
    </Container>
    
    )
}

export const SignupBox = () => {
    const { login } = useUser();
    const [ name, setName ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    } 

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    } 

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleLogin = () => {
        login();
    }

    return(
    <Container>
        <InputBox 
            placeholder="Display Name"
            value={name}
            onChange={handleNameChange}
        /> 
        <InputBox 
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
        /> 
        <InputBox 
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
        /> 
        <button onClick={handleLogin}>Sign Up</button>
    </Container>
    )
}
