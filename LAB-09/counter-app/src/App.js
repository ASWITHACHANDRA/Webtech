import React, { useState } from 'react';
import './App.css';

function App() {
  // Initialize counter with default value (0)
  const [count, setCount] = useState(0);

  // Increment function
  const increment = () => {
    setCount(count + 1);
  };

  // Decrement function
  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="counter-app">
      <div className="counter-container">
        <h1>Simple Counter</h1>
        
        <div className="counter-display">
          <h2>{count}</h2>
        </div>

        <div className="counter-buttons">
          <button 
            onClick={decrement}
            className="btn decrement-btn"
          >
            - Decrement
          </button>
          
          <button 
            onClick={increment}
            className="btn increment-btn"
          >
            Increment +
          </button>
        </div>

        <div className="reset-section">
          <button 
            onClick={() => setCount(0)}
            className="btn reset-btn"
          >
            Reset to 0
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;