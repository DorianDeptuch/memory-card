import React, { useState } from "react";

const Score = (props) => {
  return (
    <div
      style={!props.gameOver ? { display: "flex" } : { display: "none" }}
      className="scoreDiv"
    >
      <h3>Current Score: {props.score}</h3>
      <h3>High Score: {props.highScore}</h3>
    </div>
  );
};

export default Score;
