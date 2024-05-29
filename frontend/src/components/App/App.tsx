import  { useState } from 'react';

import Navbar from '../Navbar/Navbar';
import LandingPage from '../../pages/LandingPage/LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Map from '../Map/Map'
import styles from './App.module.scss';
import Entry from '../Entry/Entry';

function App() {
  const [option, setOption] = useState("Login");

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/restaurants' element />
          <Route path='/map' element={<Map />}/>
          <Route 
          path='/login' 
          element={<Entry option={option} setOption={setOption} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
