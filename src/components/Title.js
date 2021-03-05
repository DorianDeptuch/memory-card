import React from "react";
import logo from "../Images/pokemon-logo.png";

const Title = (props) => {
  return (
    <div className="titleDiv">
      <img
        alt="Pokemon title"
        src={logo}
        style={{ transform: "scale(0.25)" }}
      ></img>
      <h1> Memory Card Game </h1>
    </div>
  );
};

export default Title;
