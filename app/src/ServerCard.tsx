import { useEffect, useRef, useState } from "react";
import ModpackSelect from "./ModpackSelect";
import s from "./ServerCard.module.css";

type Modpack = { label: string; href: string };

export default function ServerCard({
  title,
  address,
  modpacks,
}: {
  title: string;
  address: string;
  modpacks?: Modpack[];
}) {
  const [selected, setSelected] = useState(modpacks?.[0]?.href ?? "");
  const [copied, setCopied] = useState(false);

  // Use a portable timeout type (works in browser + TS)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // cleanup to avoid memory leaks if component unmounts
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const copyAddress = async () => {
    // prefer modern API
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(address);
        showCopied();
        return;
      } catch (err) {
        // fall through to legacy path
      }
    }

    // fallback (legacy). execCommand is deprecated but still widely supported.
    // We verify success and throw if it fails to help debugging.
    try {
      const ta = document.createElement("textarea");
      ta.value = address;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      ta.style.pointerEvents = "none";
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, ta.value.length);

      const ok = document.execCommand("copy"); // deprecated but usable fallback
      document.body.removeChild(ta);

      if (!ok) throw new Error("document.execCommand('copy') returned false");
      showCopied();
    } catch (err) {
      // optional: surface a toast, console for now
      console.warn("Copy failed:", err);
    }
  };

  const showCopied = () => {
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 1200);
  };

  // derive a filename for download attribute (nice UX, optional)
  const downloadName = selected?.split("/").pop() || "modpack.mrpack";

  return (
    <li className={s.server}>
      <div className={s.serverInfo}>
        <div className={s.serverText}>
          <div className={s.serverTitle}>{title}</div>
          <div className={s.serverAddress}>{address}</div>
        </div>

        <button
          className={`${s.copyBtn} ${copied ? s.isCopied : ""}`}
          onClick={copyAddress}
          title={copied ? "Copied!" : "Copy"}
          aria-live="polite"
        >
          <svg
            className={s.copyIc}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="9"
              y="9"
              width="11"
              height="11"
              rx="2"
              stroke="currentColor"
              strokeWidth="2"
            />
            <rect
              x="4"
              y="4"
              width="11"
              height="11"
              rx="2"
              stroke="currentColor"
              strokeWidth="2"
              opacity=".7"
            />
          </svg>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {modpacks?.length ? (
        <div className="modpack-dropdown custom">
          <ModpackSelect
            options={modpacks}
            value={selected}
            onChange={setSelected}
            buttonClass={s.downloadBtn}
          />

          {/* Remove target="_blank" for consistent download behavior */}
          <a
            href={selected || "#"}
            download={downloadName}
            rel="noopener"
            className={s.downloadBtn}
            aria-disabled={!selected}
            onClick={(e) => {
              if (!selected) e.preventDefault();
            }}
          >
            Download
          </a>
        </div>
      ) : (
        <button className={s.downloadBtn} disabled>
          No modpack
        </button>
      )}
    </li>
  );
}
