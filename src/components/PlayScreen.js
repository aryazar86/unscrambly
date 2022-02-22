import React from 'react';

export const PlayScreen = ({
  timeLeft,
  score,
  letters,
  word,
  setWord,
  enterPressed,
  incorrect,
}) => (
  <>
    <div className="row mb-3 py-2 border-top border-bottom">
      <div className="col-6 text-center">
        <small>
          <strong>Time</strong>
        </small>
        <div>
          <small>
            {timeLeft} second{timeLeft !== 1 && 's'}
          </small>
        </div>
      </div>
      <div className="col-6 text-center">
        <small>
          <strong>Score</strong>
        </small>
        <div>
          <small>{score}</small>
        </div>
      </div>
    </div>
    <div className="row mx-0 mb-1">
      {letters.map((l, i) => (
        <div
          key={`letter-${i}`}
          className={`col text-center border py-2 h3 ${
            i % 2 !== 0 && 'bg-light'
          }`}
        >
          <strong>{l.toUpperCase()}</strong>
        </div>
      ))}
    </div>
    <input
      type="text"
      className="form-control border border-primary"
      value={word}
      onChange={(e) => setWord(e.target.value.toLowerCase())}
      onKeyUp={(e) => e.key === 'Enter' && enterPressed()}
      autoFocus
      autoComplete="off"
      spellCheck={false}
    />
    {incorrect.length > 0 && (
      <p className="alert alert-warning" role="alert">
        {incorrect}
      </p>
    )}
  </>
);
