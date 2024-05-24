import Navbar from '../Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.scss';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element />
        </Routes>
      </Router>
    </>
  );
}

export default App;
