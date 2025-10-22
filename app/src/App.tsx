import styles from "./App.module.css";
import ServerCard from "./ServerCard";
import { servers } from "./data/servers";

export default function App() {
  return (
    <main className={styles.siteRoot}>
      <section className={`${styles.card}`}>
        <h1 className={styles.serversTitle}>My Minecraft Servers</h1>

        <ul className={styles.serverList}>
          {servers.map((server) => (
            <ServerCard key={server.id} {...server} />
          ))}
        </ul>
      </section>
    </main>
  );
}
