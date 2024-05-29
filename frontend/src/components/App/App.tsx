import Navbar from '../Navbar/Navbar';
import LandingPage from '../../pages/LandingPage/LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Map from '../Map/Map';

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/restaurants' element />
          <Route path='/map' element={<Map />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
