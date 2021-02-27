import React from "react";

const GameOver = (props) => {
  return (
    <div className="gameOverDiv">
      <h1>GAME OVER!</h1>
      <p>You scored {props.score} points</p>
      <p>Your all time high score is {props.highScore}</p>
      <button onClick={props.restartGame}>Restart Game?</button>
    </div>
  );
};

export default GameOver;
