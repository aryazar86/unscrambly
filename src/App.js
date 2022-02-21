import React, { useEffect, useState } from 'react';
import './App.scss';

const createEnum = (values) => {
  const enumObject = {};
  for (const val of values) {
    enumObject[val] = val;
  }
  return Object.freeze(enumObject);
};

const App = () => {
  const gameStatuses = createEnum(['New', 'Ongoing', 'End']);

  const [gameStatus, setGameStatus] = useState(gameStatuses.New);
  const [leadTime, setLeadtime] = useState(12);
  const [word, setWord] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [incorrect, setIncorrect] = useState('');
  const [score, setScore] = useState(0);
  const [letters, setLetters] = useState([]);
  const [timeLeft, setTimeLeft] = useState(12);

  useEffect(() => {
    let timer = null;
    if (gameStatus === gameStatuses.Ongoing) {
      timer = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        } else {
          clearInterval(timer);
          setGameStatus(gameStatuses.End);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStatus, timeLeft]);

  const start = () => {
    setTimeLeft(leadTime);
    setGameStatus(gameStatuses.Ongoing);
    randomizeLetters();
  };

  const restart = () => {
    setGameStatus(gameStatuses.New);
    setWord('');
    setGuesses([]);
    setIncorrect('');
    setScore(0);
    setLetters([]);
    setTimeLeft(12);
  };

  const randomizeLetters = () => {
    const shuffledvowels = [...'aeiouy'].sort(() => 0.5 - Math.random());
    const shuffledConsonants = [...'bcdfghjklmnpqrstvwxz'].sort(
      () => 0.5 - Math.random()
    );

    setLetters(
      shuffledConsonants
        .slice(0, 4)
        .concat(shuffledvowels.slice(0, 2))
        .sort(() => 0.5 - Math.random())
    );
  };
  const checkWord = () => {
    if ([...word].filter((w) => letters.indexOf(w) === -1).length > 0) {
      setTimeLeft((timeLeft) => timeLeft - 1);
      setIncorrect('Wrong letter used');
    } else {
      fetch(`//api.dictionaryapi.dev/api/v2/entries/en/${word}`).then((res) => {
        if (!res.ok) {
          setIncorrect('This is not a word');
          setTimeLeft((timeLeft) => timeLeft - 1);
        } else {
          setIncorrect('');
          setGuesses((prev) => [...prev, word]);
          setScore(score + word.length);
          setTimeLeft((timeLeft) => timeLeft + word.length);
          setWord('');
          randomizeLetters();
        }
      });
    }
  };

  return (
    <div
      className="App"
      style={{ backgroundImage: "url('https://picsum.photos/600')" }}
    >
      <div className="container text-center my-5 game">
        <div className="row">
          <div className="col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <div className="card shadow-lg">
              <div className="card-body">
                <h1>Unscramb.ly</h1>
                {gameStatus === gameStatuses.New ? (
                  <>
                    <label htmlFor="leadTime" className="form-label">
                      <strong>Lead time is {leadTime} seconds</strong>
                    </label>
                    <input
                      type="range"
                      className="mb-3 form-range"
                      min="4"
                      max="20"
                      value={leadTime}
                      onChange={(e) => setLeadtime(e.target.value)}
                      id="leadTime"
                    />
                    <button
                      className="btn btn-primary btn-block btn-lg"
                      onClick={() => start()}
                    >
                      Let's do it
                    </button>
                  </>
                ) : gameStatus === gameStatuses.Ongoing ? (
                  <>
                    <p className="text-bold">
                      {timeLeft} second{timeLeft !== 1 && 's'}
                    </p>
                    <p>Score: {score}</p>
                    <div className="row mx-0 mb-2">
                      {letters.map((l, i) => (
                        <div
                          key={`letter-${i}`}
                          className={`col text-center border py-2 ${
                            i % 2 !== 0 && 'bg-light'
                          }`}
                        >
                          {l.toLowerCase()}
                        </div>
                      ))}
                    </div>

                    <input
                      type="text"
                      className="form-control border border-primary"
                      value={word}
                      onChange={(e) => setWord(e.target.value.toLowerCase())}
                      onKeyUp={(e) => e.key === 'Enter' && checkWord()}
                    />
                    {incorrect.length > 0 && (
                      <p className="alert alert-warning" role="alert">
                        {incorrect}
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <p>Guesses: {guesses.join(', ')}</p>
                    <h3>Your final score: {score}</h3>
                    <button
                      className="btn btn-success bt-lg"
                      onClick={() => restart()}
                    >
                      Try again
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
