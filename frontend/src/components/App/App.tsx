import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Entry from "../Entry/Entry";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.scss";

function App() {
  const [option, setOption] = useState<string>("Login");

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/restaurants" element={<div>Restaurants Page</div>} />
          <Route path="/map" element={<div>Map Page</div>} />
          <Route
            path="/login"
            element={<Entry option={option} setOption={setOption} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
