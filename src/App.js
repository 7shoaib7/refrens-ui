/* Packages Imports */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Component
import Navbar from "./components/Navbar";
//pages
import Episodes from "./pages/Episodes";
import Locations from "./pages/Locations";
import Home from "./pages/Home";
import CharacterProfile from "./pages/CharacterProfile";


function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<CharacterProfile />} />
          <Route path="/episodes" element={<Episodes />} />
          <Route path="/locations" element={<Locations />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
