import styled from "styled-components"
import { useUser } from "./Providers/UserProvider"
import { useState } from "react"

const Container = styled.div`
    background-color : #3D5A80;
    color : #E0FBFC;
    min-height : 100vh;
    text-align : left;
    width : 10vw;
    padding : 5vw;
`

function NavBar() {
    const { isLoggedIn, login, logout } = useUser();

    return (
        <Container>
            <div>
            <span>{isLoggedIn ? 'Welcome, User!' : 'Please log in.'}</span>
                <div>
                    {!isLoggedIn && <button onClick={login}>Login</button>}
                </div>
                <div>
                    {isLoggedIn &&
                    <>
                        <button onClick={logout}>Logout</button>
                        <div>dada</div>
                    </>}
                </div>
            </div>
        </Container>
    )
}

export default NavBar