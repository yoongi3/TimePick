import { useEffect, useState } from "react";
import styled from "styled-components";

const Cell = styled.div`
    width: 50px;
    height: 20px;
    background-color: ${props => (props.color)};
    border: 1px solid black;
    color: black;
    font-size: 5px;
`
type Prop = {
    cellRow: number;
    cellCol: number;
    matrix: number[][];
    handleSetMatrix: () => void;
}

const GridCell = ({cellRow, cellCol, matrix, handleSetMatrix} : Prop) => {
    const [color, setColor] = useState('#FFFFFF');

    const handleOnClick = () => {
        handleSetMatrix(cellRow, cellCol);
    }

    const handleDragOver = () =>{
        handleSetMatrix(cellRow, cellCol);
    }

    useEffect(()=>{
        if(!matrix){
            return;
        }
        setColor(matrix[cellRow][cellCol] == 1 ? 'red':'white')
        console.log('refreshed')
        console.log(matrix)
    },[matrix])

    return(
        <Cell
            onClick={handleOnClick}
            onDragOver={handleDragOver}
            color={color}
        ></Cell>
    )
};

export default GridCell;