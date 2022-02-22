import React from 'react';

export const StartScreen = ({ leadTime, setLeadtime, start }) => (
  <>
    <div className="row">
      <div class="col-md-8 offset-md-2">
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
    </div>
  </>
);
