import React, { useState } from "react";

export default function BattleSlides({ battleSlideAnimation }) {
  const [animationEnded, setAnimationEnded] = useState(false);
  let hide;
  if (animationEnded) {
    hide = { display: "none", zIndex: 0 };
  }
  return (
    <div style={hide}>
      {battleSlideAnimation && (
        <div
          id="left"
          //   style={hide}
          onAnimationEnd={() => {
            setAnimationEnded(true);
          }}
          className="left-battleSlide"
        ></div>
      )}
      {battleSlideAnimation && (
        <div
          id="right"
          //   style={hide}
          onAnimationEnd={() => {
            setAnimationEnded(true);
          }}
          className="right-battleSlide"
        ></div>
      )}
    </div>
  );
}
