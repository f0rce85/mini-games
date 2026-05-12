import { useState } from 'react';
import { Board } from './components/Board';
import type { Board as BoardType } from './types/types';

const createEmptyBoard = (): BoardType =>
  Array(8)
    .fill(null)
    .map(() => Array(8).fill(null));

export default function App() {
  const [board] = useState<BoardType>(createEmptyBoard());

  return (
    <div>
      <h1>Chess</h1>
      <Board board={board} />
    </div>
  );
}
