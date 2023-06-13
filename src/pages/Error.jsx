import styles from '@/styles/error.module.css'

import Link from 'next/link'

export default function Error() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="wrapper">
          <p className={styles.line__1}>An error occured</p>
          <p className={styles.line__2}>Please return <Link href="/">Home</Link></p>
        </div>
      </header>
    </div>
  );
}

