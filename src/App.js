import React, { useState, useEffect } from "react";
import "./App.css";
import Score from "./components/Score";
import Card from "./components/Card";
import Title from "./components/Title";

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [card1, setCard1] = useState(1);
  const [card2, setCard2] = useState(2);
  const [card3, setCard3] = useState(3);
  const [card4, setCard4] = useState(4);
  const [card5, setCard5] = useState(5);
  const [card6, setCard6] = useState(6);
  const [selectedCards, setSelectedCards] = useState([]); //new Set()
  const [cardOrder, setCardOrder] = useState([
    card1,
    card2,
    card3,
    card4,
    card5,
    card6,
  ]);

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

    console.log(cardOrder);
  }

  function pushSelectedCards(e) {
    setSelectedCards((prev) => {
      return [...prev, e.target.textContent];
    });
    console.log("selected: ", selectedCards);
    console.log(typeof selectedCards);
  }

  // function scoreLogic(e) {
  //   // use new Set to check array for doubles.
  //   if (selectedCards.has(e.target.textContent)) {
  //     alert("you already have that one!!");
  //   }
  //   console.log(typeof e.target.textContent);
  // }

  function scoreLogic(e) {
    if (selectedCards.includes(e.target.textContent)) {
      setHighScore(highScore > score ? highScore : score);
      setScore(0);
      setSelectedCards([]);
      alert("Game Over");
    } else {
      setScore((previous) => previous + 1);
    }
  }

  // function highScoreLogic() {
  //   if
  // }

  return (
    <>
      <Title />
      <Score score={score} highScore={highScore} />
      <div className="gameDiv">{items}</div>
    </>
  );
}

export default App;
//If card is clicked, push that card's info into an array.
//If a clicked card's info is in the array,
//    set the the highescore to current score (only if current score > current high score)
//    set score to zero
//Randomize order by mapping the Cards into an array and returning that array???
