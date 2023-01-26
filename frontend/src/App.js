import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import {Home, 
  Error, 
  Projects, 
  About, 
  Leadership, 
  GettingStarted, 
  Soldering, 
  BasicSoldering, 
  AdvSoldering,
  UsefulLinks} from "./components/pages"

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/AmpWebV2" element={<Home/>} />
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/projects" element={<Projects/>} />
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/leadership" element={<Leadership/>} />
          <Route exact path="/getting_started" element={<GettingStarted/>} />
          <Route exact path="/soldering" element={<Soldering/>} />
          <Route exact path="/useful_links" element={<UsefulLinks/>} />
          <Route exact path="*" element={<Error/>} />
          <Route exact path="/basic_soldering" element={<BasicSoldering/>} />
          <Route exact path="/adv_soldering" element={<AdvSoldering/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
