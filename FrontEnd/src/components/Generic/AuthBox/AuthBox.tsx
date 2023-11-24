import { ChangeEvent, useState } from "react";
import InputBox from "../InputBox/InputBox";
import { useUser } from "../../Providers/UserProvider";
import styled from "styled-components";
import { Button } from "../Button/Button";
import { addParticipantToEvent } from "../../Services/EventService";

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
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background: #3D5A80;
`

const fetchHandler = async (url: string, method: string, body: Object) => {
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            throw new Error(data.error || 'Server error');
        } else {
            throw new Error('Network response was not ok');
        }
    }

    return response.json();
}

export const LoginBox = ( {onClose} ) => {
    const { login } = useUser();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    } 

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleLogin = async () => {
        try {
            const data = await fetchHandler('http://localhost:8080/login', 'POST', { username, password });

            if (data && data.displayName) {
                const { displayName, id } = data;
                login(displayName, id);
                console.log(`Login successful, welcome ${displayName}`);
            } else {
                console.error('Error during login: Missing or undefined displayName property in response');
            }
        } catch(error: any) {
            console.error('Error during login:', error.message);
        };
    }

    return(
    <Container>
        <Button onClick={onClose}>X</Button>
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
        <Button onClick={handleLogin}>Login</Button>
    </Container>
    
    )
}

export const SignupBox = ( {onClose} ) => {
    const { login } = useUser();
    const [ displayName, setDisplayName ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDisplayName(event.target.value);
    } 

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    } 

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleSignup = async () => {
        try {
            const data = await fetchHandler('http://localhost:8080/register', 'POST', {
                displayName, 
                username, 
                password 
            });

            console.log('Server response:', data);

            if (data && !data.error) {
                const { displayName, id } = data;
                login(displayName, id);
                console.log(`Register successful, welcome ${displayName} ${id}`)
            } else {
                console.error('Error during Register:', data ? data.error: 'Unexpected response format');
            }
        } catch (error: any) {
            console.error('Error during register', error.message);
        }
    }

    return(
    <Container>
        <Button onClick={onClose}>X</Button>
        <InputBox 
            placeholder="Display Name"
            value={displayName}
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
        <Button onClick={handleSignup}>Sign Up</Button>
    </Container>
    )
}
