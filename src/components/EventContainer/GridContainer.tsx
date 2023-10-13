import styled from "styled-components";
import DateLabel from "./DateLabel";
import TimeLabel from "./TimeLabel";
import GridCell from "./GridCell";
import { useState } from "react";

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

type Props = {
    numRows : number;
    numCols : number;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
}

const  get_2d_array_filled = (numRows, numCols, fillValue) => {
    return [...Array(numRows)].map(e => Array(numCols).fill(fillValue));
}


const GridContainer = ({numRows, numCols , startDate, endDate, startTime, endTime}: Props ) => {
    const [matrix, setMatrix] = useState(get_2d_array_filled(numRows, numCols, 0))
    
    const handleSetMatrix = (row,col) =>{
        // let newMatrix = matrix;
        // newMatrix[row][col] = 1;
        // setMatrix(newMatrix);
        setMatrix(prev => {
            return prev.map((_row,rowIndex)=>{
                console.log(_row);
                return _row.map((_col,colIndex)=>{
                    if(row == rowIndex && col == colIndex){
                        return 1;
                    }else {
                        return prev[rowIndex][colIndex];
                    }
                })
            })
        })
    }

    const gridRows = Array.from({ length : numRows }, (_, rowIndex) => (
        <GridRow key={rowIndex}>
            {Array.from({ length : numCols}, (_, colIndex) => (
                    <GridCell handleSetMatrix={handleSetMatrix} matrix={matrix} rowIndex={rowIndex} colIndex={colIndex}/>
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