import React, { useState, useEffect } from "react";
import "./App.css";
import Score from "./components/Score";
import Card from "./components/Card";
import Title from "./components/Title";
import GameOver from "./components/GameOver";
import StartGameScreen from "./components/StartGameScreen";
import GameComplete from "./components/GameComplete";
import BattleSlides from "./components/BattleSlides";
import useKonamiCode from "./components/KonamiCode";

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  // const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [pokemonImages, setPokemonImages] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const [caughtAllPokemon, setCaughtAllPokemon] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [battleSlideAnimation, setBattleSlideAnimation] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);

  useEffect(() => {
    // setIsLoading(true);
    let pokeNamesArray = [];
    let pokeImagesArray = [];

    const fetchData = async () => {
      try {
        // const controller = new AbortController();

        for (let i = 0; i < 150; i++) {
          let response = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=150`
          );
          let data = await response.json();
          let pokemon = await data.results[i].name;
          pokeNamesArray.push(pokemon);
          setPokemon(pokeNamesArray);
        }
        for (let i = 1; i < 151; i++) {
          let imageResponse = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${i}`
          );
          let imageData = await imageResponse.json();
          let pokeImages = await imageData.sprites.front_default;
          console.log(pokeImages);
          pokeImagesArray.push(pokeImages);
          setPokemonImages(pokeImagesArray);
        }

        // setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();

    // return () => {
    //   controller.abort();
    // };
  }, []);

  useKonamiCode(() => {
    setScore(150);
    setCaughtAllPokemon(true);
    setEndTime(new Date());

    setTotalTime(
      new Date(endTime - startTime)
        .toISOString()
        .slice(14, 20)
        .replace(":", "m ")
        .replace(".", "s")
    );
  });

  function checkWin() {
    if (score >= 149) {
      setCaughtAllPokemon(true);
      setHighScore(150);
      setEndTime(new Date());

      setTotalTime(
        new Date(endTime - startTime)
          .toISOString()
          .slice(14, 20)
          .replace(":", "m ")
          .replace(".", "s")
      );
    }
  }

  function handleStart() {
    setBattleSlideAnimation(true);
    setTimeout(() => {
      setStartGame(true);
      setStartTime(new Date());
    }, 1200);
  }

  function handleClick(e) {
    shuffleCards();
    pushSelectedCards(e);
    scoreLogic(e);
    checkWin();
    console.log(e.target.src);
  }

  function shuffleCards() {
    let shuffled = [];
    shuffled.push(
      pokemon.sort(function () {
        return 0.5 - Math.random();
      })
    );
    setPokemon(shuffled);
    setPokemonImages(
      pokemonImages.sort(function () {
        return 0.5 - Math.random();
      })
    );
  }

  function pushSelectedCards(e) {
    setSelectedCards((prev) => {
      return [...prev, e.target.src];
    });
  }

  function scoreLogic(e) {
    if (selectedCards.includes(e.target.src)) {
      setHighScore(highScore > score ? highScore : score);
      setSelectedCards([]);
      setGameOver(true);
    } else if (score >= highScore) {
      setScore((previous) => previous + 1);
      setHighScore((previous) => previous + 1);
    } else {
      setScore((previous) => previous + 1);
    }
  }

  function restartGame() {
    setGameOver(false);
    setScore(0);
    setStartTime(new Date());
  }

  return (
    <>
      <Title />
      <Score gameOver={gameOver} score={score} highScore={highScore} />

      <div className="gameDiv">
        {!startGame ? (
          <StartGameScreen handleStart={handleStart} />
        ) : !gameOver ? (
          !caughtAllPokemon ? (
            [...new Array(150)].map((e, card) => (
              <Card
                key={card}
                cardInfo={card}
                onClick={handleClick}
                imgSrc={pokemonImages[card]}
                imgAlt={pokemon[card]}
              />
            ))
          ) : (
            <GameComplete
              score={score}
              setScore={setScore}
              setHighScore={setHighScore}
              restartGame={restartGame}
              setCaughtAllPokemon={setCaughtAllPokemon}
              totalTime={totalTime}
              setStartTime={setStartTime}
              setSelectedCards={setSelectedCards}
            />
          )
        ) : (
          <GameOver
            score={score}
            highScore={highScore}
            restartGame={restartGame}
          />
        )}
        <BattleSlides battleSlideAnimation={battleSlideAnimation} />
      </div>
    </>
  );
}

export default App;

// TODO
//DONE    Add a message for capturing all 150
//DONE    make it possible to catch mew
//DONE    Make a time along with highscore available to those who capture all 150
//DONE    add a start game button
//DONE    add pokemon images
//DONE    start game function should also start a timer
//DONE    clicking on the last pokemon should stop the timer, and the game complete screen should pop up
//DONE    make mew available to catch, making sure it disappears when you catch it so there is not gameOver
//            button to try again
//DONE    randomize order of cards when clicked
//DONE    play again? => clear selected pokemon array so you don't lose right away and set start time on play again?
//DONE    make score and highscore component sticky or position absolute so it moves down with you as you scroll
//DONE    make sure the image alt don't have the pokemon font, so fix the h3, h2, h1 properties
//DONE    make the sliding thing lower or fix the camera position to the top when the button is pressed
//        add pokemon battle music and possible an animation when you get into a battle
//            victory music and defeat music
//        make a folder for audio files and images
//        make a copyright component
//        have each pokemon make a sound when clicked
//        reOrganize code into their own components
//        find out why the time isn't correcting
//        save score in local storage
//        fix cursor: pointer and z-index issue
