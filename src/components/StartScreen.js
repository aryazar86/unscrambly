import React from 'react';

export const StartScreen = ({ leadTime, setLeadtime, start }) => (
  <>
    <div className="row">
      <div className="col-sm-8 offset-sm-2">
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
      </div>
      <div className="col-12 border-top mt-4 pt-3">
        <p className="text-decoration-underline">
          <strong>Gameplay</strong>
        </p>

        <small className="text-start">
          <ul>
            <li>
              You get 4 consonants and 2 vowels, randomized. Your task is to
              find as many words as you can.
            </li>
            <li>
              When you press Enter, your guess will be evaluated. If correct, 6
              new letters will appear.
            </li>
            <li>
              For each correct word, you recieve 1 point and 1 second, per
              letter used.
            </li>
            <li>
              If you want to guess multiple words, separate them with a comma
              (,). If each word is correct, you points total for that round is
              multiplied by the number of words guessed.{' '}
            </li>
            <li>
              Every wrong letter used or wrong word guessed, you lose 1 second
              from your time. You cannot proceed until you correct, or retry
              your guess.{' '}
            </li>
            <li>If you want to skip, make no guesses and press Enter.</li>
          </ul>
        </small>
      </div>
    </div>
  </>
);
