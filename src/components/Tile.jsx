import React from "react";

const Tile = ({
  currentMove,
  board,
  setBoard,
  rowIndex,
  colIndex,
  className = "red",
  gameOver,
}) => {
  const handleTileClick = () => {
    if (board[rowIndex][colIndex] || gameOver) return;
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => [...row]);
      newBoard[rowIndex][colIndex] = currentMove;
      return newBoard;
    });

    return;
  };

  return (
    <button className={`col ${className}`} onClick={handleTileClick}>
      {board[rowIndex][colIndex]}
    </button>
  );
};

export default Tile;
