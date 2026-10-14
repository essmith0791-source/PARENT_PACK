"use client";

import { useEffect, useState } from "react";
import { COPY } from "@/content/site";
import { THEME_KEY, type ThemeChoice } from "@/lib/theme";

const CHOICES: ThemeChoice[] = ["auto", "day", "night"];

// Auto follows the phone's setting. Day or Night is saved in localStorage,
// the only thing this site stores.
export function ThemeControl() {
  const [choice, setChoice] = useState<ThemeChoice>("auto");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === "day" || saved === "night") setChoice(saved);
    } catch {
      // Storage blocked: stay on Auto.
    }
  }, []);

  function choose(next: ThemeChoice) {
    setChoice(next);
    const root = document.documentElement;
    try {
      if (next === "auto") localStorage.removeItem(THEME_KEY);
      else localStorage.setItem(THEME_KEY, next);
    } catch {
      // Storage blocked: the choice still applies until the page closes.
    }
    if (next === "auto") delete root.dataset.theme;
    else root.dataset.theme = next;
  }

  return (
    <fieldset className="theme">
      <legend>{COPY.theme.legend}</legend>
      <div className="theme-options">
        {CHOICES.map((value) => (
          <label key={value} className="theme-option">
            <input
              type="radio"
              name="theme"
              value={value}
              checked={choice === value}
              onChange={() => choose(value)}
            />
            <span>{COPY.theme[value]}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
