import React from "react";

export default function StartGameScreen({ handleStart }) {
  return (
    <div className="startGameScreenDiv">
      <h3>Can you Catch them all?</h3>
      <h3>Catch one of each type of pokemon, but only one!</h3>
      <button onClick={handleStart}>Start Game</button>
    </div>
  );
}
