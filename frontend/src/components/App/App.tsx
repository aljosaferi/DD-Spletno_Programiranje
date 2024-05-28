import Navbar from '../Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.scss';
import Map from '../Map/Map'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element />
          <Route path='/restaurants' element />
          <Route path='/map' element={<Map />}/>
          <Route path='/login' element />
        </Routes>
      </Router>
    </>
  );
}

export default App;
