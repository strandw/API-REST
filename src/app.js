const express = require("express");
const app     = express();
const PORT    = process.env.PORT || 3000;

// Parsing automatique du JSON dans req.body
app.use(express.json());

// Routes produits
app.use("/products", require("./routes/products"));

// Route racine
app.get("/", (req, res) => {
  res.json({ message: "API Produits — v1.0.0" });
});

// Gestion des routes inexistantes
app.use((req, res) => {
  res.status(404).json({ error: "Route introuvable" });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
