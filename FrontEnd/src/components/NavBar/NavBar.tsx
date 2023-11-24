import { useUser } from "../Providers/UserProvider"
import { useState } from "react"
import { LoginBox, SignupBox } from "../Generic/AuthBox/AuthBox";
import { ActionButtons, Container, UserSection, WelcomeMessage } from "./NavBarStyle";
import { AuthButton } from "../Generic/Button/Button";

function NavBar() {
    const { isLoggedIn, logout, name } = useUser();
    const [activeAction, setActiveAction] = useState(null);

    const handleAction = (action) => {
        setActiveAction(action);
      };
    
    const handleLogout = () => {
        setActiveAction(null);
        logout();
    };

    const handleCloseAuthBox = () => {
        setActiveAction(null);
    }

    return (
        <Container>
            <div>
                <WelcomeMessage>
                    {isLoggedIn 
                    ? `Welcome, ${name}!` 
                    : 'Log in to see and edit events.'}
                </WelcomeMessage>
                <ActionButtons>
                    {!isLoggedIn && (
                        <>
                            <AuthButton onClick={()=>handleAction("signin")}>Login</AuthButton>
                            {activeAction === "signin" && <LoginBox onClose={handleCloseAuthBox}/>}
                            <AuthButton onClick={()=>handleAction("signup")}>Signup</AuthButton>
                            {activeAction === "signup" && <SignupBox onClose={handleCloseAuthBox}/>}
                        </>
                    )}
                </ActionButtons>
                <UserSection>
                    {isLoggedIn &&
                    <>
                        <AuthButton onClick={handleLogout}>Logout</AuthButton>
                        <div>User events</div>
                    </>}
                </UserSection>
            </div>
        </Container>
    )
}

export default NavBar