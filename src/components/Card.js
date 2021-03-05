import React, { useState } from "react";

const Card = (props) => {
  return (
    <div onClick={props.onClick} className="cardDiv">
      <img alt={props.imgAlt} src={props.imgSrc}></img>
      {/* {props.cardInfo} */}
    </div>
  );
};

export default Card;
