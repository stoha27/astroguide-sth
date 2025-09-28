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
    fetch(`${API}/api/signs`).then(r => r.json()).then(setSigns);
  }, []);

  const load = async () => {
    try {
		const res = await fetch(`${API}/api/compatibility/${sign1}/${sign2}`);
		if (!res.ok) {
			setData(null);
			return;
		}
		const json = await res.json();
		setData(json);
	}	catch (err) {
		console.error("Помилка завантаження:", err);
		setData(null);
	}
  };

  useEffect(() => { if (signs.length) load(); }, [sign1, sign2, signs.length]);

  return (
    <div style={{padding:"20px", fontFamily:"system-ui"}}>
      <h1>Астрологічна сумісність</h1>
      <div>
        <select value={sign1} onChange={e => setSign1(e.target.value)}>
          {signs.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <select value={sign2} onChange={e => setSign2(e.target.value)}>
          {signs.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
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
