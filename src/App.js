/** Contains the wrapper for all routes */

import React, {useEffect, useState} from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import TimeContext from './TimeContext';
import NavContext from './NavContext';
import './App.css';
import NavBar from './NavBar';

function App() {
  const [timeContext, setTimeContext] = useState(Date.now());
  const location = useLocation();
  const [navContext, setNavContext] = useState({home: (location.pathname === "/"), modalType: null});

  useEffect(() => {
    setTimeout(() => {
      setTimeContext(Date.now());
      const interval = setInterval(() => {
        setTimeContext(Date.now());
      }, 60000);
    }, 60000 - Date.now() % 60000);
  },[]);

  useEffect(() => {
    const isHome = (location.pathname === "/");
    setNavContext(nc => ({home: isHome, modalType: (isHome) ? nc.modalType : null}));
  }, [location]);



  return (
    <div className="App">
      <TimeContext.Provider value={{timeContext}}>
        <NavContext.Provider value={{navContext, setNavContext}}>
          <NavBar />
          <main>
            <Outlet />
          </main>
        </NavContext.Provider>
      </TimeContext.Provider>
    </div>
  );
}

export default App;
