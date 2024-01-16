import styles from "@/styles/error.module.css";

import Link from "next/link";

export default function Error() {
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
