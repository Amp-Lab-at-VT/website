import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import {Home, Error, Projects} from "./components/pages"

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/AmpWebV2" element={<Home/>} />
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/projects" element={<Projects/>} />
          <Route exact path="*" element={<Error/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
