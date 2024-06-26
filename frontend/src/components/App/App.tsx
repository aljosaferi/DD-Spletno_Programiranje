import { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import LandingPage from '../../pages/LandingPage/LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Map from '../Map/Map';
import { UserContext } from '../../userContext';

function App() {
  const [user, setUser] = useState(localStorage.user ? JSON.parse(localStorage.user) : null);
  const updateUserData = (userInfo) => {
    localStorage.setItem("user", JSON.stringify(userInfo));
    setUser(userInfo);
  }

  return (
    <>
      <Router>
      <UserContext.Provider value={{
        user: user,
        setUserContext: updateUserData
      }}>
        <Navbar />
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/restaurants' element />
          <Route path='/map' element={<Map />}/>
        </Routes>
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
