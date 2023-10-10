import React from "react";
import styled from "styled-components";

const GridRow = styled.div`
    display: flex;
`
const GridCell = styled.div`
    width: 30px;
    background-color:red;
    border-style: solid;
    border-color: black
`

type Props = {
    numRows : number;
    numCols : number;
}
const GridContainer = ({numRows, numCols}: Props ) => {
    const gridRows = Array.from({ length : numRows }, (_, rowIndex) => (
        <GridRow key={rowIndex}>
            {Array.from({ length : numCols }, (_, colIndex) => (
                <GridCell key={colIndex}>hi</GridCell>
            ))}
        </GridRow>
    ));

    return(
        <div className="grid-container">{gridRows}</div>
    )
}

export default GridContainer