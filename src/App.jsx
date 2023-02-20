import { useEffect, useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [counter, setCounter] = useState(0);
  const [prevCounter, setPrevCounter] = useState(0);
  const [time, setTime] = useState({
    time: 0,
    lastTime: 0,
    stop: true,
  });

  useEffect(() => {
    const allDiceHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allDiceHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  // TODO
  useEffect(() => {
    if (time.stop) return;
    const intervalID = setInterval(() => {
      setTime((prevState) => {
        return {
          ...prevState,
          time: prevState.time + 1,
        };
      }, 1000);
      return () => clearInterval(intervalID);
    });
  }, [time.stop]);

  function allNewDice() {
    const randomNewDie = [];
    for (let i = 0; i < 10; i++) {
      randomNewDie.push(generateNewDie());
    }
    return randomNewDie;
  }

  const dieElements = dice.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        onClick={() => holdDice(die.id)}
      />
    );
  });

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    };
  }

  function rollDice() {
    if (tenzies) {
      setPrevCounter(counter);
      setTime((prevState) => ({
        ...prevState,
        time: 0,
        lastTime: prevState.time,
      }));
      setCounter(-1);
      setDice(allNewDice());
      setTenzies(false);
    } else {
      setDice((prevState) =>
        prevState.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
      setTime((prev) => ({ ...prev, stop: false }));
    }
  }

  function handleCount() {
    setCounter((prevState) => prevState + 1);
  }

  function holdDice(id) {
    setDice((prevState) =>
      prevState.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  return (
    <main>
      {tenzies === true ? <ReactConfetti /> : ""}
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value for each roll.{" "}
      </p>
      <div className="dice-container">{dieElements}</div>

      <div>
        <h2>Last Game Rolls</h2>
        <p>{prevCounter}</p>
      </div>

      <button
        className="roll-dice"
        onClick={() => {
          rollDice();
          handleCount();
        }}
      >
        {tenzies === true ? "New game" : "Roll"}{" "}
      </button>

      <div>
        <h2>Number of Rolls</h2>
        <p>{counter}</p>
      </div>
      <div>
        <p>Time: {time.time}</p>
        <p>Last Time: {time.lastTime}</p>
      </div>
    </main>
  );
}

export default App;
