import React from "react";

const Card = (props) => {
  return (
    <div onClick={props.onClick} className="cardDiv">
      <img alt={props.imgAlt} src={props.imgSrc}></img>
    </div>
  );
};

export default Card;
