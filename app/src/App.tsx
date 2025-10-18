import { useState } from "react";
import "./App.css";
import { servers } from "./data/servers";

export default function App() {
  return (
    <main className="site-root">
      <section className="card servers">
        <h1>My Minecraft Servers</h1>

        <ul className="server-list">
          {servers.map((s) => (
            <li key={s.id} className="server">
              <div className="server-info">
                <div className="server-title">{s.title}</div>
                <div className="server-address">{s.address}</div>
              </div>
              <a
                className="download-btn"
                href={s.download ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Modpack
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
