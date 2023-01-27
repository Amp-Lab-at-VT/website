import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  HashRouter,
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
  UsefulLinks,
  Tutorial,
  MentorSteps,
  Migration} from "./components/pages"

function App() {
  return (
    <HashRouter>
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
          <Route exact path="/tutorial" element={<Tutorial/>} />
          <Route exact path="/mentor_steps" element={<MentorSteps/>} />
          <Route exact path="/migration" element={<Migration/>} />
        </Routes>
    </HashRouter>
  );
}

export default App;
