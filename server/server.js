import express from "express";
import cors from "cors";
import signs from "./data/signs.json" with { type: "json" };
import compatibilities from "./data/compatibilities.json" with { type: "json" };


const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/signs", (req, res) => res.json(signs));

app.get("/api/compatibility/:sign1/:sign2", (req, res) => {
  const { sign1, sign2 } = req.params;
  const pair = compatibilities.find(
    c =>
      (c.sign1 === sign1 && c.sign2 === sign2) ||
      (c.sign1 === sign2 && c.sign2 === sign1)
  );
  if (!pair) return res.status(404).json({ error: "Немає даних" });
  res.json(pair);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/", (req, res) => {
  res.send("Astro API працює! Використовуй /api/signs або /api/compatibility/:sign1/:sign2");
});

