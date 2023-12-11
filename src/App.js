import React, {useEffect, useState} from 'react';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import TimeContext from './TimeContext';
import './App.css';
import NavBar from './NavBar';

function App() {
  const [timeContext, setTimeContext] = useState(Date.now());

  useEffect(() => {
    setTimeout(() => {
      setTimeContext(Date.now());
      const interval = setInterval(() => {
        setTimeContext(Date.now());
      }, 60000);
    }, 60000 - Date.now() % 60000);
  },[]);

  return (
    <div className="App">
      <BrowserRouter>
      <TimeContext.Provider value={{timeContext}}>
        <NavBar />
        <main>
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route path='*' element={<Navigate to='/'/>}/>
          </Routes>
        </main>
      </TimeContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
