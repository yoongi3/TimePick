import styled from "styled-components";
import DateLabel from "./DateLabel";
import TimeLabel from "./TimeLabel";
import GridCell from "./GridCell";
import { useEffect, useState } from "react";
import { useMatrix } from "../Providers/MatrixProvider";

const GridContainerWrapper = styled.div`
    display: flex;
    border: 1px solid black;
`

const TimeContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const DateContainer = styled.div`
    display: flex;
`

type Props = {
    numRows : number;
    numCols : number;
    startDate: string;
    endDate: string;
    startTime: string
    endTime: string;
}

const GridContainer = ({ numRows, numCols , startDate, endDate, startTime, endTime }: Props) => {
    const matrixContext = useMatrix()
    const {matrix, createNewMatrix} = matrixContext;
    
    if(!matrixContext){
        return null;
    }

    const gridRows = Array.from({ length : numRows }, (_, rowIndex) => (
        <DateContainer key={rowIndex}>
            {Array.from({ length : numCols}, (_, colIndex) => (
                    <GridCell 
                        key={colIndex}
                        cellRow={rowIndex} 
                        cellCol={colIndex}
                    />
            ))}
        </DateContainer>
    ));

    useEffect(() => {
        if (matrix.length === 0) {
            createNewMatrix(numRows, numCols);
        }
    }, [createNewMatrix, matrix, numRows, numCols]);

    useEffect(() => {
        console.log(matrix);
    }, [matrix]);

    return(
        <GridContainerWrapper>
            <TimeContainer>
                <TimeLabel startTime={startTime} endTime={endTime}/>
            </TimeContainer>

            <div>
                <DateContainer>
                    <DateLabel startDate={startDate} endDate={endDate}/>
                </DateContainer>

                {gridRows}
            </div>
        </GridContainerWrapper>
    )
};

export default GridContainer