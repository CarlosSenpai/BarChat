import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import LogReg from './views/LogReg';
import MainPage from './components/MainPage';
import ViewProfile from './components/ViewProfile';
import InfoPage from './components/InfoPage';
import ChatSocket from './views/ChatSocket';
import Discover from './views/Discover';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<LogReg />} path="/"  />
          <Route element={<MainPage />} path="/home"  />
          <Route element={<ViewProfile />} path="/profile/:id" />
          <Route element={<InfoPage/>} path="/app/info" />
          <Route element={<ChatSocket/>} path="/barchat/:id"/>
          <Route element={<Discover/>} path="/discover/:id"/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
