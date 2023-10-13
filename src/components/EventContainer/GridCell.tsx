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
    rowIndex: number;
    colIndex: number;
    matrix: number[][];
    handleSetMatrix: () => void;
}

const GridCell = ({rowIndex, colIndex, matrix, handleSetMatrix} : Prop) => {
    const [color, setColor] = useState('#FFFFFF');

    const handleOnClick = () => {
        //setColor('blue');
        handleSetMatrix(rowIndex,colIndex);
    }

    // const handleMouseOver = () => {
    //     setColor((prev) => {
    //         setTimeout(() => {
    //             setColor(prev)
    //         }, 100)
    //         return 'red'
    //     });
    // }

    const handleDragOver = (event: any) =>{
        //event.stopPropogation()
        handleSetMatrix(rowIndex,colIndex);
        event.preventDefault()
      // Turn the endzone red, perhaps?
      //setColor('blue')
    }

    useEffect(()=>{
        if(!matrix){
            return;
        }
        setColor(matrix[rowIndex][colIndex] == 1 ? 'red':'white')
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