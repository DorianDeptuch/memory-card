import React, { useState } from "react";

const Card = (props) => {
  return (
    <div onClick={props.onClick} className="cardDiv">
      <img alt={props.pokemon} src={props.pokemon}></img>
      {props.cardInfo}
    </div>
  );
};

export default Card;
