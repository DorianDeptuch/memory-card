import React, { useEffect, useState } from "react";

export default function GameComplete(props) {
  const [mew, setMew] = useState("Mew");
  const [mewImg, setMewImg] = useState(
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png"
  );
  const [mewCaught, setMewCaught] = useState(false);

  function handleMewCaught() {
    props.setScore(151);
    props.setHighScore(`151 in ${props.totalTime}`);
    setMewCaught(true);
  }

  const restartGame = () => {
    props.restartGame();
    setMewCaught(false);
    props.setCaughtAllPokemon(false);
    props.setStartTime(new Date());
    props.setSelectedCards([]);
  };

  return (
    <div className="gameCompleteDiv">
      <h3>
        Congratulations! You caught all {props.score} Pokemon in{" "}
        {props.totalTime}
      </h3>
      {!mewCaught ? (
        <div className="center">
          <h3>But, what's this? A wild Mew appeared!!</h3>
          <div className="mewDiv">
            <img alt={mew} src={mewImg} onClick={handleMewCaught}></img>
          </div>
        </div>
      ) : (
        <div className="center">
          <h3>You are a true POKEMON MASTER!</h3>
          <button onClick={restartGame}>Play Again?</button>
        </div>
      )}
    </div>
  );
}
