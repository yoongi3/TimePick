import styled from "styled-components";
import DateLabel from "./DateLabel";
import TimeLabel from "./TimeLabel";
import GridCell from "./GridCell";
import { useState } from "react";

const GridContainerWrapper = styled.div`
    display: flex;
    border: 1px solid black;
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
    startTime: string
    endTime: string;
}

const  get_2d_array_filled = (numRows:number, numCols:number, fillValue:number) => {
    return [...Array(numRows)].map(e => Array(numCols).fill(fillValue));
}


const GridContainer = ({numRows, numCols , startDate, endDate, startTime, endTime}: Props) => {
    const [matrix, setMatrix] = useState(get_2d_array_filled(numRows, numCols, 0))
    
    const handleSetMatrix = (cellRow, cellCol) => {

        setMatrix(prev => {
            return prev.map((_row,_rowIndex)=>{
                return _row.map((_col,_colIndex)=>{
                    if(cellRow === _rowIndex && cellCol === _colIndex){
                        return prev[_rowIndex][_colIndex] === 1 ? 0 : 1;
                    }else {
                        return prev[_rowIndex][_colIndex];
                    }
                })
            })
        })
    }

    //*************************

    const findSelectedCells = () => {
        const selectedCells = [];

        matrix.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell === 1) {
                    selectedCells.push({row: rowIndex, col: colIndex});
                }
            });
        });
        console.log(selectedCells)
        return selectedCells;
    }

    //***********************

    const gridRows = Array.from({ length : numRows }, (_, rowIndex) => (
        <GridRow key={rowIndex}>
            {Array.from({ length : numCols}, (_, colIndex) => (
                    <GridCell key={colIndex} 
                    handleSetMatrix={handleSetMatrix} matrix={matrix} 
                    cellRow={rowIndex} cellCol={colIndex}/>
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
};

export default GridContainer