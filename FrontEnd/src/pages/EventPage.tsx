import Header from "../components/Header"
import styled from "styled-components"
import NavBar from "../components/NavBar/NavBar";
import EventContainer from "../components/EventContainer/EventContainer";

const Container = styled.div`   
display : flex;
justify-content : center;
background-color: #98C1D9;
`;
function EventPage() {
    return (
        <>
            <Header/>
            <Container>
                <EventContainer/>
                <NavBar/>
            </Container>
        </>
    )
}

export default EventPage