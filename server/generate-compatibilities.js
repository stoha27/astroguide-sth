import fs from "fs";

const signs = [
  { id: "aries", name: "Овен", element: "Вогонь" },
  { id: "taurus", name: "Телець", element: "Земля" },
  { id: "gemini", name: "Близнюки", element: "Повітря" },
  { id: "cancer", name: "Рак", element: "Вода" },
  { id: "leo", name: "Лев", element: "Вогонь" },
  { id: "virgo", name: "Діва", element: "Земля" },
  { id: "libra", name: "Терези", element: "Повітря" },
  { id: "scorpio", name: "Скорпіон", element: "Вода" },
  { id: "sagittarius", name: "Стрілець", element: "Вогонь" },
  { id: "capricorn", name: "Козоріг", element: "Земля" },
  { id: "aquarius", name: "Водолій", element: "Повітря" },
  { id: "pisces", name: "Риби", element: "Вода" }
];

// Таблиця сумісності
const table = {
  aries: { best:["leo","sagittarius","gemini"], medium:["libra","aquarius"], hard:["cancer","capricorn"] },
  taurus: { best:["virgo","capricorn","cancer"], medium:["pisces","scorpio"], hard:["leo","aquarius"] },
  gemini: { best:["libra","aquarius","aries"], medium:["leo","sagittarius"], hard:["virgo","pisces"] },
  cancer: { best:["pisces","scorpio","taurus"], medium:["virgo","capricorn"], hard:["aries","libra"] },
  leo: { best:["aries","sagittarius","gemini"], medium:["libra","aquarius"], hard:["taurus","scorpio"] },
  virgo: { best:["taurus","capricorn","cancer"], medium:["scorpio","pisces"], hard:["gemini","sagittarius"] },
  libra: { best:["gemini","aquarius","leo"], medium:["sagittarius","aries"], hard:["cancer","capricorn"] },
  scorpio: { best:["cancer","pisces","virgo"], medium:["capricorn","taurus"], hard:["leo","aquarius"] },
  sagittarius: { best:["aries","leo","libra"], medium:["aquarius","gemini"], hard:["virgo","pisces"] },
  capricorn: { best:["taurus","virgo","scorpio"], medium:["pisces","cancer"], hard:["aries","libra"] },
  aquarius: { best:["gemini","libra","sagittarius"], medium:["aries","leo"], hard:["taurus","scorpio"] },
  pisces: { best:["cancer","scorpio","capricorn"], medium:["taurus","virgo"], hard:["gemini","sagittarius"] }
};

function makeDescription(cat, s1, s2) {
  const n1 = s1.name;
  const n2 = s2.name;

  if (cat === "best") return {
    love:`Сильна гармонія між ${n1} і ${n2}.`,
    friendship:"Легко знаходять спільну мову.",
    career:"Добре працюють разом.",
    emotional:`${n1} і ${n2} швидко відчувають настрій одне одного.`,
    communication:"Відкрита і легка комунікація.",
    intimacy:"Пристрасть і глибока близькість.",
    finances:"Мають схожі підходи до грошей.",
    element:`${s1.element} + ${s2.element} = природна підтримка.`,
    advice:"Використовуйте вашу енергію для спільних цілей.",
    score: 90
  };
  if (cat === "medium") return {
    love:`Є потенціал, але потрібні зусилля між ${n1} і ${n2}.`,
    friendship:"Можуть підтримувати одне одного.",
    career:"Потрібен компроміс.",
    emotional:`Іноді ${n1} і ${n2} не розуміють почуттів одне одного.`,
    communication:"Розмови можуть бути продуктивними, але потрібна терпимість.",
    intimacy:"Є пристрасть, але вона нестабільна.",
    finances:"Різні підходи до витрат і заощаджень.",
    element:`${s1.element} + ${s2.element} = цікаве, але не завжди просте поєднання.`,
    advice:"Будьте терплячими і шукайте баланс.",
    score: 65
  };
  return {
    love:`Складна пара: різні підходи у ${n1} і ${n2}.`,
    friendship:"Можливі непорозуміння.",
    career:"Часто конфліктують.",
    emotional:`${n1} і ${n2} важко налаштуватися на одну хвилю.`,
    communication:"Часто виникають суперечки.",
    intimacy:"Іскра є, але швидко згасає.",
    finances:"Різні фінансові звички створюють напругу.",
    element:`${s1.element} + ${s2.element} = протиріччя, які важко подолати.`,
    advice:"Якщо хочете бути разом — потрібна велика робота над собою.",
    score: 45
  };
}

const compatibilities = [];

for (let i=0;i<signs.length;i++) {
  for (let j=i;j<signs.length;j++) {
    const s1 = signs[i], s2 = signs[j];
    let cat = "medium";
    if (table[s1.id].best.includes(s2.id)) cat="best";
    else if (table[s1.id].hard.includes(s2.id)) cat="hard";
    else if (table[s1.id].medium.includes(s2.id)) cat="medium";
    const comp = makeDescription(cat, s1, s2);
    compatibilities.push({ sign1:s1.id, sign2:s2.id, compatibility:comp });
  }
}

fs.writeFileSync("./data/compatibilities.json", JSON.stringify(compatibilities,null,2),"utf-8");
console.log("✔ compatibilities.json згенеровано з розширеними описами!");
