import styled from "styled-components";
import DateLabel from "./DateLabel";
import TimeLabel from "./TimeLabel";

const GridContainerWrapper = styled.div`
    display: flex;
`

const GridColumn = styled.div`
    display: flex;
    flex-direction: column;
`

const GridRow = styled.div`
    display: flex;
`
const GridCell = styled.div`
    width: 50px;
    height: 10px;
    background-color: #FFFFFF;
    border: 1px solid black;
`

type Props = {
    numRows : number;
    numCols : number;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
}

const GridContainer = ({numRows, numCols , startDate, endDate, startTime, endTime}: Props ) => {
    const gridRows = Array.from({ length : numRows }, (_, rowIndex) => (
        <GridRow key={rowIndex}>
            {Array.from({ length : numCols}, (_, colIndex) => (
                    <GridCell key={colIndex} />
            ))}
        </GridRow>
    ));

    return(
        <GridContainerWrapper>
            <GridColumn>
                <TimeLabel startTime={startTime} endTime={endTime}/>
            </GridColumn>
            <div>
            <GridRow>
                <DateLabel startDate={startDate} endDate={endDate}/>
            </GridRow>
                {gridRows}
            </div>
        </GridContainerWrapper>
    )
}

export default GridContainer