import styles from './home.module.css';

function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Варианты реализации</h1>
      <ul className={styles.list}>
        <li><a className={styles.link} href="/virtuoso">✈️ Virtuoso</a></li>
        <li><a className={styles.link} href="/sw">🚀 Sliding window</a></li>
      </ul>
    </main>
  );
}

export default Home;
