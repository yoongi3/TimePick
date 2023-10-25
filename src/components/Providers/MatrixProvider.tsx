import { createContext, useContext, useState } from 'react';

type MatrixContextType = {
    matrix: any[][];
    updateCell: (row: number, col: number, value: number) => void;
    createNewMatrix: (rows: number, cols: number) => void;
}

const MatrixContext = createContext< MatrixContextType | undefined >(undefined);

export const useMatrix = () => {
    return useContext(MatrixContext)
}

export const MatrixProvider = ({ children }) => {
    const [matrix, setMatrix] = useState<any[][]>([]);

    const updateCell = (row, col, value) => {
        const updatedMatrix = [...matrix];
        updatedMatrix[row][col] = value;
        setMatrix(updatedMatrix)
    };

    const createNewMatrix = (rows, cols) => {
        const newMatrix = [];
        for (let i=0; i<rows; i++){
            const row = new Array(cols).fill(0);
            newMatrix.push(row);
        }
        setMatrix(newMatrix);
    };

    return (
        <MatrixContext.Provider value={{ matrix, updateCell, createNewMatrix }}>
            {children}
        </MatrixContext.Provider>
    )
}