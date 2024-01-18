/** Contains the wrapper for all routes */

import React, {useEffect, useState} from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import TimeContext from './TimeContext';
import NavContext from './NavContext';
import SettingsContext from './SettingsContext';
import { useLocalStorage } from './hooks';
import './App.css';
import NavBar from './NavBar';

function App() {
  const [timeContext, setTimeContext] = useState(Date.now());
  const location = useLocation();
  const [navContext, setNavContext] = useState({home: (location.pathname === "/"), modalType: null});
  const [settings, setSettings] = useLocalStorage("settings", true, () => ({speed: "mph", temperature: "f", pressure: "in"}));
  const [locations, setLocations, updateLocations] = useLocalStorage("locations", true, () => ({}));
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 800);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    setTimeout(() => {
      setTimeContext(Date.now());
      const interval = setInterval(() => {
        setTimeContext(Date.now());
      }, 60000);
    }, 60000 - Date.now() % 60000);
    window.addEventListener("resize", () => {
      setIsDesktop(window.innerWidth >= 800);
      setWidth(window.width);
    });
  },[]);

  useEffect(() => {
    const isHome = (location.pathname === "/");
    setNavContext(nc => ({home: isHome, modalType: (isHome) ? nc.modalType : null}));
  }, [location]);

  return (
    <div className={`App App${(isDesktop) ? "Desktop" : "Mobile"}`}>
      <TimeContext.Provider value={{timeContext}}>
        <NavContext.Provider value={{navContext, setNavContext}}>
          <SettingsContext.Provider value={{settings, setSettings, isDesktop, width, locations, setLocations, updateLocations}}>
            <NavBar />
            <main>
              <Outlet />
            </main>
          </SettingsContext.Provider>
        </NavContext.Provider>
      </TimeContext.Provider>
    </div>
  );
}

export default App;
