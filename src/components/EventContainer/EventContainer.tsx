import styled from "styled-components"
import GridContainer from "./GridContainer"

const Container = styled.div`
flex-grow : 1;
`

const EventContainer = () => {
    return(
        <Container>
            Title
            <GridContainer numCols={10} numRows={10}/>
        </Container>
    )
}

export default EventContainer
// title

// single grid

// invite link + add to nav list
