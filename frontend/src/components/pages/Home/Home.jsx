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
      <header class="App-header">
        <Navigation></Navigation>
        <div class="App">
          <div class = "homeText">
            <Typewriter
            onInit={(typewriter)=> {
            typewriter.changeDelay("50")
            .pauseFor(250)
            .typeString("The Amp Lab at Virginia Tech")
            .pauseFor(250)
            .callFunction(() => {
              setShowButton(true);
            })
            .start();
            }}
            />
          </div>
          {showButton && <Link to="/quickstart" class = "btn">Getting Started</Link> ||
          !showButton && <div style = {{visibility: "hidden"} }class = "btn">Getting Started</div>}

        </div>
      </header>
    </div>
  );
}

