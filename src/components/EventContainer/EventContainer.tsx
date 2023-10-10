import styled from "styled-components"
import GridContainer from "./GridContainer"
import { useEffect } from "react"

const Container = styled.div`
flex-grow : 1;
`

const EventContainer = () => {
    useEffect(() => {
        const currentURL = window.location.href;
        const searchParams = new URLSearchParams(currentURL);

        const paramNames = ['name', 'timeStart', 'timeEnd', 'dateStart', 'dateEnd']
        paramNames.forEach(paramName => {
            const paramValue = searchParams.get(paramName)
            if (paramName) {
                console.log(paramName + ` is: ${paramValue}`);
            } else {
                console.log(paramName + ' not found in URL');
            }
        })
    }, []);
    

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
