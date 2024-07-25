/* Packages Imports */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Episodes from "./pages/Episodes";
import Locations from "./pages/Locations";
import Home from "./pages/Home";


function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/episodes" element={<Episodes />} />
          <Route path="/locations" element={<Locations />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
