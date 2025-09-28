import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import CompatibilityCard from "./src/components/CompatibilityCard";

const API = import.meta.env.VITE_API_URL;

function App() {
  const [signs, setSigns] = useState([]);
  const [sign1, setSign1] = useState("aries");
  const [sign2, setSign2] = useState("leo");
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/signs`)
      .then(r => r.json())
      .then(setSigns);
  }, []);

  useEffect(() => {
    if (signs.length) {
      fetch(`${import.meta.env.VITE_API_URL}/api/compatibility/${sign1}/${sign2}`)
        .then(r => r.json())
        .then(setData);
    }
  }, [sign1, sign2, signs.length]);

  return (
  <div className="app-container">
    <h1>Астрологічна сумісність</h1>

    <div className="selectors">
      <label>
        Мій знак:
        <select value={sign1} onChange={e => setSign1(e.target.value)}>
          {signs.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </label>

      <label>
        Знак партнера:
        <select value={sign2} onChange={e => setSign2(e.target.value)}>
          {signs.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </label>
    </div>

    <CompatibilityCard
      sign1={sign1}
      sign2={sign2}
      data={data}
      signs={signs}
    />
  </div>
);

}


createRoot(document.getElementById("root")).render(<App />);
