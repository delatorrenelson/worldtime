import { useState } from 'react';

import Clock from './components/Clock';

import './App.css';

async function fetcher(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Faild to fetch data');
  }
  return await response.json();
}

function App() {
  const timeZone = fetcher('https://worldtimeapi.org/api/timezone');
  return (
    <div className="App">
      <h1>World Clock</h1>
      <Clock timeZone={timeZone} />
    </div>
  );
}

export default App;
