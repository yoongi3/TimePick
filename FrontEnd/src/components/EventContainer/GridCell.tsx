import { useEffect, useState } from "react";
import styled from "styled-components";
import { useMatrix } from "../Providers/MatrixProvider";

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
}

const GridCell = ({cellRow, cellCol} : Prop) => {
    const matrixContext = useMatrix()
    const {matrix, updateCell} = matrixContext;
    
    if(!matrixContext){
        return null;
    }

    const [color, setColor] = useState('#FFFFFF');

    // Customise Colors Here:
    const baseColor = "white";
    const onClickColor = "DarkOrange";
    const onHoverColor = "orange";
    //

    const handleOnClick = () => {
        const newValue = matrix[cellRow][cellCol] === 1 ? 0 : 1;
        updateCell(cellRow, cellCol, newValue)
    }

    const handleMouseOver = () => {
        if (matrix[cellRow][cellCol] === 1){
            return;
        } else {
            updateCell(cellRow, cellCol, 2)
        }
    }

    const handleMouseLeave = () => {
        if (matrix[cellRow][cellCol] === 1){
            return;
        } else {
            updateCell(cellRow, cellCol, 0)
        }
    }

    useEffect(() =>{
        if (matrix[cellRow]){
            const colorMap = {
                0: baseColor,
                1: onClickColor,
                2: onHoverColor,
            }

            const cellColor = colorMap[matrix[cellRow][cellCol] || baseColor]
            setColor(cellColor)
        }
    }, [matrix])
    return(
        <Cell
            onClick={handleOnClick}
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            color={color}
        ></Cell>
    )
};

export default GridCell;