import { Link } from 'react-router-dom';
import styles from './home.module.css';

function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Варианты реализации</h1>
      <ul className={styles.list}>
        <li><Link className={styles.link} to="/virtuoso">✈️ Virtuoso</Link></li>
        <li><Link className={styles.link} to="/sw">🚀 Sliding window</Link></li>
      </ul>
    </main>
  );
}

export default Home;
