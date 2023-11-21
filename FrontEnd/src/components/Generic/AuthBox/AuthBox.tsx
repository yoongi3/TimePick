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
    const { login, name } = useUser();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    } 

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleLogin = async () => {
        fetch('http://localhost:8080/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => {
            if (!response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    return response.json().then(data => {
                        console.error('Error during login:', data.error);
                    });
                } else {
                    console.error('Error during login:', 'Server response was not JSON');
                }
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data && data.displayName) {
                const { displayName } = data;
                login(displayName);
                console.log(`Login successful, welcome ${displayName}`);
            } else {
            console.error('Error during login: Missing or undefined displayName property in response');
        }
        })
        .catch(error => {
            console.error('Error during login:', error.message);
        });
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
        fetch('http://localhost:8080/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ displayName, username, password}),
        })
        .then(response => {
            if (!response.ok){
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    return response.json().then(data => {
                        console.error('Error during register:', data.error);
                    });
                } else {
                    console.error('Error during register:', 'Server response was not JSON');
                }
                throw new Error('Netwoek response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Server response:', data);

            if (data && !data.error) {
                login(displayName);
                console.log(`Register successful, welcome ${displayName} `)
            } else {
                console.error('Error during Register:', data ? data.error: 'Unexpected response format');
            }
        })
        .catch(error => {
            console.error('Error during register', error.message);
        })
    }

    return(
    <Container>
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
        <button onClick={handleSignup}>Sign Up</button>
    </Container>
    )
}
