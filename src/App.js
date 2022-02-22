import React, { useEffect, useState, useRef } from 'react';

import { EndScreen } from './components/EndScreen';
import { PlayScreen } from './components/PlayScreen';
import { StartScreen } from './components/StartScreen';

import { gameStatuses, errorMessages } from './constants';
import { getCookie, setCookie, randomizeLetters } from './utils';

import './App.scss';

const App = () => {
  const [gameStatus, setGameStatus] = useState(gameStatuses.New);
  const [leadTime, setLeadtime] = useState(12);
  const [word, setWord] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [incorrect, setIncorrect] = useState('');
  const [score, setScore] = useState(0);
  const [letters, setLetters] = useState([]);
  const [timeLeft, setTimeLeft] = useState(12);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [highScoreCookie, setHighScoreCookie] = useState({ time: 0, score: 0 });
  const prevScore = useRef({});

  useEffect(() => {
    const highScore = getCookie('unscrambly_highscore');
    if (highScore) {
      setHighScoreCookie(JSON.parse(highScore));
    } else {
      setCookie('unscrambly_highscore', JSON.stringify(highScoreCookie));
    }
  }, []);

  useEffect(() => {
    prevScore.current = highScoreCookie;
  }, [highScoreCookie]);

  useEffect(() => {
    let timer = null;
    if (gameStatus === gameStatuses.Ongoing) {
      timer = setInterval(() => {
        if (timeLeft > 0) {
          setTimeElapsed((prev) => prev + 1);
          setTimeLeft(timeLeft - 1);
        } else {
          clearInterval(timer);
          setGameStatus(gameStatuses.End);
          if (
            highScoreCookie.time < timeElapsed ||
            highScoreCookie.score < score
          ) {
            setHighScoreCookie({ time: timeElapsed, score: score });
            setCookie(
              'unscrambly_highscore',
              JSON.stringify({ time: timeElapsed, score: score })
            );
          }
        }
      }, 1000);
    }
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStatus, timeLeft]);

  const start = () => {
    setTimeLeft(leadTime);
    setGameStatus(gameStatuses.Ongoing);
    getNewLetters();
  };

  const restart = () => {
    setGameStatus(gameStatuses.New);
    setWord('');
    setGuesses([]);
    setIncorrect('');
    setScore(0);
    setLetters([]);
    setTimeLeft(12);
    setTimeElapsed(0);
  };

  const getNewLetters = () => {
    const randoms = randomizeLetters();
    setLetters(
      randoms.consonants
        .slice(0, 4)
        .concat(randoms.vowels.slice(0, 2))
        .sort(() => 0.5 - Math.random())
    );
  };

  const thankYouNext = () => {
    setIncorrect('');
    getNewLetters();
    setWord('');
  };

  const enterPressed = async () => {
    if (word.length === 0) {
      thankYouNext();
    } else if (word.indexOf(',') > -1) {
      let stillCorrect = true;
      const multiWordArray = [
        ...new Set(word.split(',').map((item) => item.trim())),
      ];
      for (const wordToTry of multiWordArray) {
        if (stillCorrect && wordToTry.length > 0) {
          if (
            [...wordToTry].filter((w) => letters.indexOf(w) === -1).length > 0
          ) {
            setTimeLeft((timeLeft) => timeLeft - 1);
            setIncorrect(errorMessages.incorrectLetter);
            stillCorrect = false;
          } else {
            await fetch(
              `//api.dictionaryapi.dev/api/v2/entries/en/${wordToTry}`
            ).then((res) => {
              if (!res.ok) {
                setIncorrect(errorMessages.oneIncorrectWord);
                setTimeLeft((timeLeft) => timeLeft - 1);
                stillCorrect = false;
              }
            });
          }
        }
      }
      if (stillCorrect) {
        let scoreKeeping = 0;

        multiWordArray.forEach((wordToTry) => {
          setGuesses((prev) => [...prev, wordToTry]);
          scoreKeeping += wordToTry.length;
        });
        setScore(score + scoreKeeping * multiWordArray.length);
        setTimeLeft((timeLeft) => timeLeft + scoreKeeping);

        thankYouNext();
      }
    } else {
      if ([...word].filter((w) => letters.indexOf(w) === -1).length > 0) {
        setTimeLeft((timeLeft) => timeLeft - 1);
        setIncorrect(errorMessages.incorrectLetter);
      } else {
        await fetch(`//api.dictionaryapi.dev/api/v2/entries/en/${word}`).then(
          (res) => {
            if (!res.ok) {
              setIncorrect(errorMessages.incorrectWord);
              setTimeLeft((timeLeft) => timeLeft - 1);
            } else {
              setGuesses((prev) => [...prev, word]);
              setScore(score + word.length);
              setTimeLeft((timeLeft) => timeLeft + word.length);

              thankYouNext();
            }
          }
        );
      }
    }
  };

  return (
    <div
      className="App"
      style={{ backgroundImage: "url('https://picsum.photos/600')" }}
    >
      <div className="container text-center my-5 game">
        <div className="row justify-content-center">
          <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <div className="game__card card shadow-lg">
              <div className="card-body">
                <h1 className="display-6 pt-4 pb-3">Unscramb.ly</h1>
                {gameStatus === gameStatuses.New ? (
                  <StartScreen
                    leadTime={leadTime}
                    setLeadtime={setLeadtime}
                    start={start}
                  />
                ) : gameStatus === gameStatuses.Ongoing ? (
                  <PlayScreen
                    timeLeft={timeLeft}
                    score={score}
                    letters={letters}
                    word={word}
                    setWord={setWord}
                    enterPressed={enterPressed}
                    incorrect={incorrect}
                  />
                ) : (
                  <EndScreen
                    guesses={guesses}
                    score={score}
                    timeElapsed={timeElapsed}
                    prevScore={prevScore}
                    highScoreCookie={highScoreCookie}
                    restart={restart}
                  />
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
