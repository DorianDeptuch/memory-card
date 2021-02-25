import React, { useState } from "react";

const Card = (props) => {
  return (
    <div onClick={props.onClick} className="cardDiv">
      {props.cardInfo}
    </div>
  );
};

export default Card;
