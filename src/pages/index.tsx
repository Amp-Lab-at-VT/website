//https://react-icons.github.io/react-icons/icons?name=bs
import { useState } from "react";
import Typewriter from "typewriter-effect";
import Link from "next/link";
import Layout from "@/comps/layout.jsx";

function Home() {
  const [showButton, setShowButton] = useState(false);

  return (
    <div className="App max-h-screen">
      <header className="App-header">
        <div className="App">
          <div className="homeText text-primary-50">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .changeDelay(50)
                  .pauseFor(250)
                  .typeString("The AMP Lab @ Virginia Tech")
                  .pauseFor(500)
                  .callFunction(() => {
                    setShowButton(true);
                  })
                  .start();
              }}
            />
          </div>
          <div style={{ padding: "50px" }}>
            {(showButton && (
              <Link href="/getting_started" className="btn">
                Getting Started
              </Link>
            )) ||
              (!showButton && (
                <Link
                  href="/getting_started"
                  style={{ visibility: "hidden" }}
                  className="btn"
                >
                  Getting Started
                </Link>
              ))}
          </div>
        </div>
      </header>
    </div>
  );
}

export default Layout(Home);
