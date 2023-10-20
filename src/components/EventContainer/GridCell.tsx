import { useEffect, useState } from "react";
import styled from "styled-components";

const Cell = styled.div`
    width: 50px;
    height: 10px;
    background-color: ${props => (props.color)};
    border: 1px solid black;
    color: black;
    font-size: 5px;
`
type Prop = {
    cellRow: number;
    cellCol: number;
    matrix: number[][];
    handleSetMatrix: (row: number, col: number) => void;
}

const GridCell = ({cellRow, cellCol, matrix, handleSetMatrix} : Prop) => {
    const [color, setColor] = useState('#FFFFFF');

    const handleOnClick = () => {
        handleSetMatrix(cellRow, cellCol);
    }


    // Need to fix dragover bugs

    // const handleDragOver = () =>{
    //     handleSetMatrix(cellRow, cellCol);
    // }

    useEffect(()=>{
        if(!matrix){
            return;
        }
        setColor(matrix[cellRow][cellCol] == 1 ? 'red':'#FFFFFF')
    },[matrix])

    return(
        <Cell
            onClick={handleOnClick}
            // onDragOver={handleDragOver}
            color={color}
        ></Cell>
    )
};

export default GridCell;