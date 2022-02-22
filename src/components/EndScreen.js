import React from 'react';

export const EndScreen = ({ guesses, score, restart }) => (
  <>
    <div className="row mb-3 py-2 border-top border-bottom">
      {guesses.length > 0 && (
        <div className="col-12 text-center mb-3">
          <small>
            <strong>Guesses</strong>
          </small>
          <div className="game__guesses">
            <div class="row">
              {guesses.map((guess) => (
                <div class="col-3">
                  <small>{guess}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="col-12 text-center">
        <small>
          <strong>Final Score</strong>
        </small>
        <div>
          <small>{score}</small>
        </div>
      </div>
    </div>
    <button className="btn btn-success btn-lg" onClick={() => restart()}>
      Try again
    </button>
  </>
);
