import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [userName, setUserName] = useState('');
  const [userCode, setUserCode] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');
  const [validCombination, setValidCombination] = useState([]);
  const [checked, setChecked] = useState(false); 
  const [validCombinations] = useState([
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],
    ['1', '5', '9'],
    ['3', '5', '7'],
  ]);

  const handleCellClick = (e) => {
    const cellValue = e.target.textContent;

    if (userCode.includes(cellValue) || checked) {
      setStatusMessage('Invalid code');
      return;
    }

    const updatedCode = [...userCode, cellValue];
    setUserCode(updatedCode);
  };

  const handleCheckClick = () => {
    const validComb = isValidCombination(userCode);
    if (validComb) {
      setValidCombination(validComb);
      alert(`BINGO, ${userName}!`); 
      setStatusMessage('');
    } else {
      setStatusMessage('Invalid code');
    }
    setChecked(true);
  };
  

  const isValidCombination = (code) => {
    for (const combination of validCombinations) {
      if (
        combination.every((digit) => code.includes(digit)) ||
        combination.every((digit) => code.includes(digit.split('').reverse().join('')))
      ) {
        return combination;
      }
    }
    return null;
  };

  useEffect(() => {
    if (statusMessage === 'BINGO!' && checked) {
      alert('BINGO!');
      setUserCode([]); 
      setChecked(false);
    } else if (statusMessage === 'Invalid code' && checked) {
      alert('Invalid code');
      setUserCode([]); 
      setChecked(false);
    }
  }, [statusMessage, checked]);

  return (
    <div id="gameContainer">
      <h1>Username</h1>
      <input
        type="text"
        className="cellInput"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
     

      <div id="cellContainer">
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i} className="cell" onClick={handleCellClick}>
            {i + 1}
          </div>
        ))}
      </div>

      <button onClick={handleCheckClick}>Check</button>


      {statusMessage === 'Invalid code' && !checked && (
        <h2 id="statusText">{statusMessage}</h2>
      )}
    </div>
  );
}

export default App;