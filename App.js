import './App.css';
import "milligram";
import { useState } from 'react';
import { generateNum } from './game';

function App() {
  const [input, setInput] = useState("");
  const [goal, setGoal] = useState(generateNum());
  const [result, setResult] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [alert, setAlert] = useState("");

  function updateInput(ev) {
    let num = ev.target.value;

    if (num.length < 5 && /^\d*$/.test(num)) {
      setInput(num);
    }
  }

  console.log(goal);

  function resetGuess() {
    setInput("");
  }

  function checkValid(num) {

    let uniq = String.prototype.concat(...new Set(num));

    if (num.length !== 4) {
      setAlert("Number must be 4 characters");
      return false;
    }
    else if (uniq.length !== num.length) {
      setAlert("Digits must all be unique");
      return false;
    }

    return true;
  }

  function checkGuess(num) {
    if (checkValid(num)) {
      let a = 0;
      let b = 0
      let guess = num.split("");

      for (let i = 0; i < guess.length; i++) {
        if (parseInt(guess[i]) === goal[i]) {
          a++;
        } else if (goal.includes(parseInt(guess[i]))) {
          b++;
        }
      }

      let string = a.toString() + "A" + b.toString() + "B";

      addGuess(num)
      result.push(string);
      console.log(result);
      console.log(a);
      checkOutcome(a);
    }
  }

  function checkEnter(ev) {
    if (ev.key === "Enter") {
      checkGuess(input);
      resetGuess();
    }
  }

  function checkOutcome(a) {
    if (guesses.length === 8) {
      setAlert("You lose!");
      document.getElementById("input").disabled = true;
    }
    if (a === 4) {
      setAlert("You win!");
      document.getElementById("input").disabled = true;
    }
  }

  function addGuess(num) {
    guesses.push(num);
  }

  function restartGame() {
    setInput("");
    setGoal(generateNum());
    setResult([]);
    setGuesses([]);
    document.getElementById("input").disabled = false;
  }

  function OutputTable() {
    let rows = [];

    for (let i = 1; i < 9; i++) {
      rows.push(
        <tr>
          <td>
            {i}
          </td>
          <td>
            {guesses[i - 1]}
          </td>
          <td>
            {result[i - 1]}
          </td>
        </tr>
      )
    }

    return rows;
  }

  return (
    <div className="App">
      <header>
        4Digits
      </header>
      <div>Input:</div>
      <input id="input" type="text" value={input} onChange={updateInput} onKeyPress={checkEnter}></input>
      <button className="button" onClick={() => { resetGuess(); checkGuess(input) }}>Guess</button>
      <button onClick={restartGame}>Restart</button>
      <table>
        <tr>
          <th>Try</th>
          <th>Guess</th>
          <th>Result</th>
        </tr>
        <OutputTable></OutputTable>
      </table>
      <div>{alert}</div>
    </div>
  );
}

export default App;
