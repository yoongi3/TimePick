import React from 'react';

type GridProps = {
  initialCells: number[][];
  rows: number;
  cols: number;
  users: number;
};

const allUsersColor = `#04a12b`;
const someUsersColor = `#00cc33`;
const oneUserColor = `#0bf446`;

const GridComponent = ({ initialCells, rows, cols, users }: GridProps) => {
  const emptyGrid = Array.from({ length: rows }, () => Array(cols).fill(0));
  const [selectedInfos, setSelectedInfos] = React.useState<Array<string | null>>([]);
  const [hoveredCell, setHoveredCell] = React.useState<{ rowIndex: number; colIndex: number } | null>(null);

  initialCells.forEach((cell) => {
    const [row, col] = cell;
    if (emptyGrid[row] && emptyGrid[row][col] !== undefined) {
      if (emptyGrid[row][col] >= 1) {
        emptyGrid[row][col]++;
        return;
      }
      emptyGrid[row][col] = 1;
      return;
    }
  });

  const onHoverHandler = (rowIndex, colIndex) => {
    const selectedValue = emptyGrid[rowIndex][colIndex];
    const newInfos = [...selectedInfos];
    newInfos[rowIndex * cols + colIndex] = `Selected by: ${selectedValue} users`;
    setSelectedInfos(newInfos);
    setHoveredCell({ rowIndex, colIndex });
  };

  const onMouseLeaveHandler = () => {
    setHoveredCell(null);
  };

  return (
    <div>
      {emptyGrid.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              onMouseEnter={() => onHoverHandler(rowIndex, colIndex)}
              onMouseLeave={onMouseLeaveHandler}
              style={{
                width: '40px',
                height: '10px',
                border: '1px solid #ccc',
                textAlign: 'center',
                backgroundColor: getColor(cell, users),
                position: 'relative',
              }}
            >
              {hoveredCell && hoveredCell.rowIndex === rowIndex && hoveredCell.colIndex === colIndex && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '-50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    padding: '5px',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                    zIndex: 999,
                    pointerEvents: 'none',
                    fontSize: '12px',
                  }}
                >
                  {selectedInfos[rowIndex * cols + colIndex]}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
      {users > 1 && <ColorPalette users={users} />}
    </div>
  );
};

const ColorPalette = ({ users }: { users: number }) => {
  return (
    <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
      <div style={{ width: '30px', height: '10px', textAlign: 'center' }}>1</div>
      <div
        style={{
          backgroundColor: oneUserColor,
          width: '30px',
          height: '10px',
          border: '1px solid #ccc',
          textAlign: 'center',
        }}
      ></div>
      {users > 2 && (
        <div
          style={{
            backgroundColor: someUsersColor,
            width: '30px',
            height: '10px',
            border: '1px solid #ccc',
            textAlign: 'center',
          }}
        ></div>
      )}
      <div
        style={{
          backgroundColor: allUsersColor,
          width: '30px',
          height: '10px',
          border: '1px solid #ccc',
          textAlign: 'center',
        }}
      ></div>
      <div style={{ width: '30px', height: '10px', textAlign: 'center' }}>{users}</div>
    </div>
  );
};

const getColor = (value, users) => {
  switch (true) {
    case value === 1:
      return `${oneUserColor}`;
    case value > 1 && value < users:
      return `${someUsersColor}`;
    case value === users:
      return `${allUsersColor}`;
    default:
      return 'white';
  }
};

export default GridComponent;
