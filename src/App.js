/** Contains the wrapper for all routes */

import React, {useEffect, useState} from 'react';
import { Outlet } from 'react-router-dom';
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
      <TimeContext.Provider value={{timeContext}}>
        <NavBar />
        <main>
          <Outlet />
        </main>
      </TimeContext.Provider>
    </div>
  );
}

export default App;
