import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';

function App() {
  return (
    <React.StrictMode>
      <HashRouter>
       <Routes>
        <Route path='/' element={<Home/>}/>
       </Routes>
      </HashRouter>
    </React.StrictMode>
  );
}

export default App;
