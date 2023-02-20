import React from "react";

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "green" : "white",
  };
  return (
    <div onClick={props.onClick} className="die-face" style={styles}>
      <h2 className="die-num">{props.value}</h2>
    </div>
  );
}

// TODO
// const dices = [dice1, dice2, dice3, dice4, dice5, dice6]
// <img src={dices[value - 1]} alt="dice"/>
