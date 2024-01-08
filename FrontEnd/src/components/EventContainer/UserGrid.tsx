import React, { useEffect } from "react";
import { GridProvider, useGrid } from "../Providers/GridProvider";

type GridProps = {
  rows: number;
  cols: number;
};

const Grid: React.FC<GridProps> = ({ rows, cols }) => {
    const gridContext = useGrid()
    const { grid, updateCell, createNewGrid } = gridContext;

    useEffect(() => {
    createNewGrid(rows, cols);
    }, [rows, cols]);

    const handleClick = (row, col) => {
        const newValue = grid[row][col] === 1 ? 0 : 1;
        updateCell(row, col, newValue)
    }
    return (
    <div>
        {grid.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
            {row.map((cell, colIndex) => (
            <div
                key={colIndex}
                onClick={() => handleClick(rowIndex, colIndex)}
                style={{
                width: '40px',
                height: '10px',
                border: '1px solid #ccc',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: cell ? 'lightblue' : 'white',
                }}
            >
            </div>
            ))}
        </div>
        ))}
    </div>
    );
};

export default Grid;
