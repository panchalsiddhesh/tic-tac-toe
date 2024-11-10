import React, { useState, useEffect } from "react";
import "./TicTacToeGame.css";
import Tile from "./components/Tile.jsx";
import { tileBorders } from "./helper/constant.js";
import LineStrike from "./components/LineStrike.jsx";

const TicTacToeGame = () => {
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [isFirstMove, setIsFirstMove] = useState(true);
  const [currentMove, setCurrentMove] = useState("X");
  const [gameOver, setGameOver] = useState(false);
  const [winningLine, setWinningLine] = useState(null);

  const checkLine = (a, b, c) => a !== "" && a === b && b === c;

  const getHeading = () => {
    if (gameOver) {
      return winningLine ? `${currentMove} Won!` : "Game ended in a draw!";
    }
    return `${currentMove}'s Turn`;
  };

  useEffect(() => {
    // Check rows and columns
    for (let i = 0; i < 3; i++) {
      if (checkLine(board[i][0], board[i][1], board[i][2])) {
        setWinningLine({ type: "row", index: i });
        setGameOver(true);
        return;
      }
      if (checkLine(board[0][i], board[1][i], board[2][i])) {
        setWinningLine({ type: "column", index: i });
        setGameOver(true);
        return;
      }
    }

    // Check diagonals
    if (checkLine(board[0][0], board[1][1], board[2][2])) {
      setWinningLine({ type: "diagonal", index: 0 });
      setGameOver(true);
      return;
    } else if (checkLine(board[0][2], board[1][1], board[2][0])) {
      setWinningLine({ type: "diagonal", index: 1 });
      setGameOver(true);
      return;
    }

    // Check for draw
    const isDraw = board.every((row) => row.every((cell) => cell !== ""));
    if (isDraw) {
      setGameOver(true);
      setWinningLine(null);
      return;
    }

    if (!isFirstMove) {
      currentMove == "X" ? setCurrentMove("O") : setCurrentMove("X");
    } else setIsFirstMove(false);
  }, [board]);

  return (
    <main className="main-container">
      <div className="heading">{getHeading()}</div>
      <div className="board-container">
        {board.map((row, rowIndex) => {
          return (
            <div className="row" key={rowIndex}>
              {row.map((_, colIndex) => {
                return (
                  <Tile
                    key={colIndex}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    board={board}
                    setBoard={setBoard}
                    currentMove={currentMove}
                    setCurrentMove={setCurrentMove}
                    className={tileBorders[`${rowIndex}-${colIndex}`]}
                    gameOver={gameOver}
                  />
                );
              })}
            </div>
          );
        })}
        {gameOver ? <LineStrike winningLine={winningLine} /> : null}
      </div>
    </main>
  );
};

export default TicTacToeGame;
