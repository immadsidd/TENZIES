import React from 'react';
import Die from './components/Die';
import Footer from './components/footer';
import './App.css';
import {nanoid} from "nanoid";
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] =React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [numOfRolls, setNumOfRolls] = React.useState(0);

     // States for Timer
     const [time, setTime] = React.useState(0);
     const [running, setRunning] = React.useState(false);
 
     // State for Best Time
     const [bestTime, setBestTime] = React.useState(0);
 
     // useEffect Hook that gets bestTime from localStorage
     React.useEffect(() => {
         const bestTime = JSON.parse(localStorage.getItem("bestTime"));
         if (bestTime) {
             setBestTime(bestTime);
         }
     }, []);
 
     // Calculate time using useEffect Hook & setInterval() method
     React.useEffect(() => {
         let interval;
         if (running) {
             interval = setInterval(() => {
                 setTime((prevTime) => prevTime + 10);
             }, 10);
         } else if (!running) {
             clearInterval(interval);
         }
         return () => clearInterval(interval);
     }, [running]);
 

  React.useEffect(() => {
      const allHeld = dice.every(die => die.isHeld)
      const firstValue = dice[0].value
      const someHeld = dice.some((die) => die.isHeld);
      const allSameValue = dice.every(die =>die.value === firstValue)
      // if `someHeld` === True, Start counting
      if (someHeld) {
        setRunning(true);
    }

    // if `allHeld` and `allSameValue)` === true, we won
    if (allHeld && allSameValue) {
        

        // Game Won
        setTenzies(true);
    }
      if (allHeld && allSameValue) {
        // Stop Counter
        setRunning(false);
 
        // Store Time at the end of a win in a variable
        let currentTime = time;

        // if currentTime > bestTime, store it in localStorage
        if (currentTime < bestTime) {
            setBestTime(currentTime);
            localStorage.setItem("bestTime", JSON.stringify(currentTime));
        }
          setTenzies(true)
          console.log("You won!")
      }
  }, [dice, time, bestTime] )


  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
}

function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
        newDice.push(generateNewDie())
    }
    return newDice
}


function rollDice() {
  if(!tenzies) {
    setNumOfRolls((prevState) => prevState + 1);
    setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? 
            die :
            generateNewDie()
    }))
} else {
    setTenzies(false)
    setDice(allNewDice())
    setNumOfRolls(0);
    // Reset timer
    setTime(0);
}
}
  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? 
          {...die, isHeld: !die.isHeld} :
          die
  }))
}


  const diceElements =dice.map(die => 
    (<Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>
    ))

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <h2 className="track-rolls">Number of Rolls: {numOfRolls}</h2>
                <div className="timer">
                    <div>
                        <h3 >Current</h3>
                        <div>
                            <span>
                                {("0" + Math.floor((time / 60000) % 60)).slice(
                                    -2
                                )}
                                :
                            </span>
                            <span>
                                {("0" + Math.floor((time / 1000) % 60)).slice(
                                    -2
                                )}
                                :
                            </span>
                            <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
                        </div>
                    </div>
                    <div>
                        <h3>Best</h3>
                        <div>
                            <span>
                                {(
                                    "0" + Math.floor((bestTime / 60000) % 60)
                                ).slice(-2)}
                                :
                            </span>
                            <span>
                                {(
                                    "0" + Math.floor((bestTime / 1000) % 60)
                                ).slice(-2)}
                                :
                            </span>
                            <span>
                                {("0" + ((bestTime / 10) % 100)).slice(-2)}
                            </span>
                        </div>
                    </div>
                </div>
      <div className='die-con'>
      {diceElements}
      </div>
  
      <button  onClick={rollDice} className="button">{tenzies ? "New Game" : "Roll"}</button>
      <Footer/>
    </main>
  );
}

export default App;
