interface Piece {
  type: 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
  color: 'white' | 'black';
  hasMoved?: boolean;
}

type Square = Piece | null;

type Board = Square[][];

export type { Piece, Square, Board };
