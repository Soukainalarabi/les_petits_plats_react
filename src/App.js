import React from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';

function App() {
  return (
    <React.StrictMode>
      <Router>
      <div className="container">

       <Routes>
        <Route path='' element={<Home/>}/>
       </Routes>
       </div>
      </Router>
    </React.StrictMode>
  );
}

export default App;
