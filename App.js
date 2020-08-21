import React from 'react';
import './App.css';
import View from './components/View'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{color: "blueviolet"}}>Type Writer</h1>
      </header>
      <div className="content">
        <View letters="abcd efghi jklmno pqrs tuv wxyz;,."/>
      </div>
      <footer></footer>
    </div>
  );
}

export default App;
