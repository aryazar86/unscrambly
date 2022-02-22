import React from 'react';

export const EndScreen = ({
  guesses,
  score,
  restart,
  timeElapsed,
  highScoreCookie,
  prevScore,
}) => {
  const newScore = prevScore.current.score < score;
  const newTime = prevScore.current.time < timeElapsed;

  return (
    <>
      <div className="row mb-3 py-2 border-top border-bottom">
        {guesses.length > 0 && (
          <div className="col-12 text-center mb-3">
            <small>
              <strong>Guesses</strong>
            </small>
            <div className="game__guesses">
              <div className="row">
                {guesses.map((guess, index) => (
                  <div className="col-3" key={'guess-' + index}>
                    <small>{guess}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="col-6 text-center">
          <small>
            <strong>Final Score</strong>
          </small>
          <div className="fw-bolder">
            {score}{' '}
            {newScore && (
              <span className="badge bg-primary">
                +{score - prevScore.current.score}
              </span>
            )}
          </div>
          <div>
            <small>Highest: {highScoreCookie.score}</small>
          </div>
        </div>
        <div className="col-6 text-center">
          <small>
            <strong>Time Elapsed</strong>
          </small>
          <div className="fw-bolder">
            {timeElapsed}{' '}
            {newTime && (
              <span className="badge bg-primary">
                +{timeElapsed - prevScore.current.time}
              </span>
            )}
          </div>
          <div>
            <small>Highest: {highScoreCookie.time}</small>
          </div>
        </div>
      </div>
      <button className="btn btn-success btn-lg" onClick={() => restart()}>
        Try again
      </button>
    </>
  );
};
