import React from "react";

const LineStrike = ({ winningLine }) => {
  if (!winningLine) return null;

  const getLineCoordinates = () => {
    switch (winningLine.type) {
      case "row":
        return {
          x1: 0,
          y1: 75 + winningLine.index * 150,
          x2: 450,
          y2: 75 + winningLine.index * 150,
        };
      case "column":
        return {
          x1: 75 + winningLine.index * 150,
          y1: 0,
          x2: 75 + winningLine.index * 150,
          y2: 450,
        };
      case "diagonal":
        return winningLine.index === 0
          ? { x1: 0, y1: 0, x2: 450, y2: 450 }
          : { x1: 450, y1: 0, x2: 0, y2: 450 };
      default:
        return {};
    }
  };

  const { x1, y1, x2, y2 } = getLineCoordinates();

  const lineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

  return (
    <svg className="strike-through" width="450" height="450">
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="black"
        strokeWidth="2"
        className="animated-line"
        strokeDasharray={lineLength}
        strokeDashoffset={lineLength}
      />
    </svg>
  );
};

export default LineStrike;
