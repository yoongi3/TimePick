import { createContext, useContext, useState } from 'react';

type GridContextType = {
    grid: any[][];
    updateCell: (row: number, col: number, value: number) => void;
    createNewGrid: (rows: number, cols: number) => void;
}

const GridContext = createContext< GridContextType | undefined >(undefined);

export const useGrid = (): GridContextType => {
    const context = useContext(GridContext);
    if (!context) {
        throw new Error('useGrid must be used within a GridProvider');
    }
    return context;
};

export const GridProvider = ({ children }) => {
    const [grid, setGrid] = useState<any[][]>([]);

    const updateCell = (row, col, value) => {
        const updatedGrid = [...grid];
        updatedGrid[row][col] = value;
        setGrid(updatedGrid)
    };

    const createNewGrid = (rows: number, cols: number) => {
        const newGrid = Array.from({ length: rows }, () => Array(cols).fill(0));
        setGrid(newGrid);
    };

    return (
        <GridContext.Provider value={{ grid: grid, updateCell, createNewGrid }}>
            {children}
        </GridContext.Provider>
    )
}