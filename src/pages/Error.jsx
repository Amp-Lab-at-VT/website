import styles from "@/styles/error.module.css";
import Layout from "@/comps/layout.jsx";

import Link from "next/link";

function Error() {
  return (
    <div class="App">
      <header class="App-header">
        <div class="wrapper">
          <p class={styles.line__1}>An error occured</p>
          <p class={styles.line__2}>
            Please return <Link href="/">Home</Link>
          </p>
        </div>
      </header>
    </div>
  );
}

export default Layout(Error);
