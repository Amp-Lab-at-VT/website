//https://react-icons.github.io/react-icons/icons?name=bs
import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "../../modules/Nav/Nav.jsx"
import Typewriter from "typewriter-effect";

import "./home.css"

export default function Home() {
  const [showButton, setShowButton] = useState(false);


  return (
    <div class="App">
      <Navigation></Navigation>
      <header class="App-header">
        <div class="App">
          <div class = "homeText">
            <Typewriter
            onInit={(typewriter)=> {
            typewriter.changeDelay("50")
            .pauseFor(250)
            .typeString("The Amp Lab at Virginia Tech")
            .pauseFor(500)
            .callFunction(() => {
              setShowButton(true);
            })
            .start();
            }}
            />
          </div>
          <div style = {{padding: "50px"} }>
          {(showButton && <Link to="/getting_started" class = "btn">Getting Started</Link>) ||
          (!showButton && <Link to="/getting_started" style = {{visibility: "hidden"}} class = "btn">Getting Started</Link>)}
          </div>
        </div>
      </header>
    </div>
  );
}

