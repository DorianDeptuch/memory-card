import React from "react";

const GameOver = (props) => {
  return (
    <div className="gameOverDiv">
      <h1>GAME OVER!</h1>
      <h3>You scored {props.score} points</h3>
      <h3>Your all time high score is {props.highScore}</h3>
      <button onClick={props.restartGame}>Restart Game?</button>
    </div>
  );
};

export default GameOver;
