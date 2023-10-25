import styled from "styled-components"

const Container = styled.div`
    background-color : #3D5A80;
    color : #E0FBFC;
    min-height : 100vh;
    text-align : left;
    width : 10vw;
    padding : 5vw;
`

function NavBar() {
    return (
        <Container>
            My Events
            <p>event1</p>
            <p>event2</p>
            <p>event3</p>
        </Container>
    )
}

export default NavBar