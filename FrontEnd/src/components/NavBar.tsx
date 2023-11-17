import styled from "styled-components"
import { useUser } from "./Providers/UserProvider"
import { useState } from "react"
import {LoginBox, SignupBox} from "./Generic/AuthBox/AuthBox";

const Container = styled.div`
    background-color : #3D5A80;
    color : #E0FBFC;
    min-height : 100vh;
    text-align : left;
    width : 10vw;
    padding : 5vw;
`

function NavBar() {
    const { isLoggedIn, login, logout, name } = useUser();
    const [activeAction, setActiveAction] = useState(null);

    const handleAction = (action) => {
        setActiveAction(action);
      };
    
      const handleLogout = () => {
        setActiveAction(null);
        logout();
      };

    return (
        <Container>
            <div>
            <span>{isLoggedIn ? `Welcome, ${name}!` : 'Log in to see saved events.'}</span>
                <div>
                    {!isLoggedIn && (
                        <>
                            <button onClick={()=>handleAction("signin")}>Login</button>
                            {activeAction === "signin" && <LoginBox/>}
                            <button onClick={()=>handleAction("signup")}>Signup</button>
                            {activeAction === "signup" && <SignupBox/>}
                        </>
                    )}
                </div>
                <div>
                    {isLoggedIn &&
                    <>
                        <button onClick={handleLogout}>Logout</button>
                        <div>User events</div>
                    </>}
                </div>
            </div>
        </Container>
    )
}

export default NavBar