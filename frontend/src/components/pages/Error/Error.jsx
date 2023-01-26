import { Link } from "react-router-dom";
import "./error.css"

export default function Error() {
  return (
    <div class="App">
      <header class="App-header">
      <div class="wrapper">
        <p class="line__1">An error occured</p>
        <p class="line__2">Please return <Link to="/">Home</Link></p>
      </div>        
      </header>
    </div>
  );
}

