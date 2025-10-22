import { useEffect, useRef, useState } from "react";

export type Option = { label: string; href: string };

export default function ModpackSelect({
  options,
  value,
  onChange,
  className = "",
  buttonClass = "download-btn", // reuse your button style
}: {
  options: Option[];
  value?: string; // current href
  onChange: (href: string) => void; // fire when selection changes
  className?: string;
  buttonClass?: string;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(
    Math.max(
      0,
      options.findIndex((o) => o.href === value)
    )
  );
  const wrapRef = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const commit = (idx: number) => {
    setActive(idx);
    onChange(options[idx].href);
    setOpen(false);
  };

  return (
    <div
      ref={wrapRef}
      className={`modpack-dropdown custom ${className}`}
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
    >
      <button
        type="button"
        className={`${buttonClass} modpack-trigger`}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        aria-controls="modpack-listbox"
        aria-label="Choose modpack"
      >
        {options[active]?.label ?? "Choose modpack"}
        <span className="chev" aria-hidden>
          ▾
        </span>
      </button>

      {open && (
        <ul
          id="modpack-listbox"
          className="modpack-menu"
          role="listbox"
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
            if (e.key === "ArrowDown")
              setActive((i) => Math.min(i + 1, options.length - 1));
            if (e.key === "ArrowUp") setActive((i) => Math.max(i - 1, 0));
            if (e.key === "Enter") commit(active);
          }}
        >
          {options.map((o, i) => (
            <li
              key={o.href}
              role="option"
              aria-selected={i === active}
              className={`modpack-item ${i === active ? "is-active" : ""}`}
              onMouseEnter={() => setActive(i)}
              onClick={() => commit(i)}
            >
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
