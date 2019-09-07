import React from 'react';
import './App.css';
import backgroundImage from'./image.jpg'

const inlineStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
}

function App() {
  return (
    <div className="App">
      <header className="App-header" style={inlineStyle}>
        <div className="header-title"> 
        Enclave
        </div> 
        <p className="header-subtitle">
          Privacy by design
        </p>
      </header>
    </div>
  );
}

export default App;
