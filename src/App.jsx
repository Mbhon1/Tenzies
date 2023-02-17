import { useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";

function App() {
  const [dice, setDice] = useState(allNewDice());

  const dieElements = dice.map((die) => {
    return <Die key={die.id} value={die.value} isHeld={die.isHeld} />;
  });

  function allNewDice() {
    const randomNewDie = [];
    for (let i = 0; i < 10; i++) {
      randomNewDie.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: true,
        id: nanoid(),
      });
    }
    return randomNewDie;
  }

  function rollDice() {
    setDice(allNewDice());
  }

  function heldDice() {
    setDice((prevState) => !prevState.isHeld);
  }

  return (
    <main>
      <div className="dice-container">{dieElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}

export default App;
