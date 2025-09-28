import React from "react";
import CompatibilityCircle from "./CompatibilityCircle";
import "../styles/compatibility.css";

export default function CompatibilityCard({ sign1, sign2, data, signs }) {
  if (!data || !signs || !signs.length) return null;

  // шукаємо українські назви за id
  const s1 = signs.find(s => s.id === sign1);
  const s2 = signs.find(s => s.id === sign2);

  return (
    <div className="compat-card">
      <h2>Сумісність: {s1?.name || sign1} + {s2?.name || sign2}</h2>
      <div className="circle-wrap">
        <CompatibilityCircle score={data.compatibility.score || 0} />
      </div>
      <p><strong>Кохання:</strong> {data.compatibility.love || "-"}</p>
      <p><strong>Дружба:</strong> {data.compatibility.friendship || "-"}</p>
      <p><strong>Кар’єра:</strong> {data.compatibility.career || "-"}</p>
	  <p><strong>Емоційна сумісність:</strong> {data.compatibility.emotional}</p>
	  <p><strong>Комунікація:</strong> {data.compatibility.communication}</p>
	  <p><strong>Інтимність:</strong> {data.compatibility.intimacy}</p>
	  <p><strong>Фінанси:</strong> {data.compatibility.finances}</p>
	  <p><strong>Стихія:</strong> {data.compatibility.element}</p>
	  <p><strong>Порада:</strong> {data.compatibility.advice}</p>

    </div>
  );
}
