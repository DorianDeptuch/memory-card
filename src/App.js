import React, { useState, useEffect } from "react";
import "./App.css";
import Score from "./components/Score";
import Card from "./components/Card";
import Title from "./components/Title";
import GameOver from "./components/GameOver";

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [cards, setcards] = useState(SAMPLE_POKEMON);
  const [card1, setCard1] = useState(1);
  const [card2, setCard2] = useState(2);
  const [card3, setCard3] = useState(3);
  const [card4, setCard4] = useState(4);
  const [card5, setCard5] = useState(5);
  const [card6, setCard6] = useState(6);
  const [gameOver, setGameOver] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [cardOrder, setCardOrder] = useState([
    card1,
    card2,
    card3,
    card4,
    card5,
    card6,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const controller = new AbortController();

        for (let i = 1; i < 150; i++) {
          let response = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=150`
          );
          let data = await response.json();
          let pokemon = await data.results[i].name;
          // SAMPLE_POKEMON[i].id = pokemon;
          console.log(pokemon);
        }

        for (let i = 1; i < 151; i++) {
          let imageResponse = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${i}`
          );
          let imageData = await imageResponse.json();
          let pokeImages = await imageData.sprites.front_default;
          // SAMPLE_POKEMON[i].img = pokeImages;
          // console.log(pokeImages);
        }
        // setCard1(arr[0]);
        // setCard2(arr[1]);
        // setCard3(arr[2]);
        // setCard4(arr[3]);
        // setCard5(arr[4]);
        // setCard6(arr[5]);
        // console.log(arr);
        // console.log(card1);
        // console.log(card2);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();

    // return () => {
    //   controller.abort();
    // };
  });

  const items = cardOrder.map((card) => (
    <Card key={card} cardInfo={card} onClick={handleClick} />
  ));

  function handleClick(e) {
    shuffleCards();
    pushSelectedCards(e);
    scoreLogic(e);
  }

  function shuffleCards() {
    setCardOrder(
      cardOrder.sort(function () {
        return 0.5 - Math.random();
      })
    );

    setCard1(cardOrder[0]);
    setCard2(cardOrder[1]);
    setCard3(cardOrder[2]);
    setCard4(cardOrder[3]);
    setCard5(cardOrder[4]);
    setCard6(cardOrder[5]);

    // console.log(cardOrder);
  }

  function pushSelectedCards(e) {
    setSelectedCards((prev) => {
      return [...prev, e.target.textContent];
    });
    // console.log("selected: ", selectedCards);
  }

  function scoreLogic(e) {
    if (selectedCards.includes(e.target.textContent)) {
      setHighScore(highScore > score ? highScore : score);
      setSelectedCards([]);
      setGameOver(true);
    } else {
      setScore((previous) => previous + 1);
    }
  }

  function restartGame() {
    setGameOver(false);
    setScore(0);
  }

  return (
    <>
      <Title />
      <Score gameOver={gameOver} score={score} highScore={highScore} />
      {!gameOver ? (
        <div className="gameDiv">{items}</div>
      ) : (
        <GameOver
          score={score}
          highScore={highScore}
          restartGame={restartGame}
        />
      )}
    </>
  );
}
const SAMPLE_POKEMON = [
  {
    id: "Bulbasaur",
    img:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  },
  {
    id: "Ivysaur",
    img:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
  },
];

export default App;
//If card is clicked, push that card's info into an array.
//If a clicked card's info is in the array,
//    set the the highescore to current score (only if current score > current high score)
//    set score to zero
//Randomize order by mapping the Cards into an array and returning that array???
