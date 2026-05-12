import type { Board } from '../types/types';

interface BoardProps {
  board: Board;
}

export function Board({ board }: BoardProps) {
  return (
    <div>
      {board.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((square, colIndex) => (
            <div key={colIndex}>{square ? square.type : ''}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
