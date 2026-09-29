const store = require("../data/products");

// Validation des champs obligatoires
const validate = (data, requireAll = true) => {
  const errors = [];
  const { name, description, price, category } = data;

  if (requireAll) {
    if (!name)        errors.push("name est obligatoire");
    if (!description) errors.push("description est obligatoire");
    if (price === undefined || price === null) errors.push("price est obligatoire");
    if (!category)    errors.push("category est obligatoire");
  }

  if (price !== undefined && (typeof price !== "number" || price < 0)) {
    errors.push("price doit être un nombre positif");
  }

  return errors;
};

// GET /products — lister tous les produits
exports.getAll = (req, res) => {
  res.status(200).json(store.getAll());
};

// GET /products/:id — consulter un produit
exports.getOne = (req, res) => {
  const id = parseInt(req.params.id);
  const product = store.getById(id);

  if (!product) {
    return res.status(404).json({ error: `Produit #${id} introuvable` });
  }

  res.status(200).json(product);
};

// POST /products — ajouter un produit
exports.create = (req, res) => {
  const errors = validate(req.body, true);
  if (errors.length) {
    return res.status(400).json({ errors });
  }

  const { name, description, price, category } = req.body;
  const product = store.create({ name, description, price, category });

  res.status(201).json(product);
};

// PUT /products/:id — remplacer un produit (toutes les propriétés)
exports.replace = (req, res) => {
  const id = parseInt(req.params.id);
  const errors = validate(req.body, true);
  if (errors.length) {
    return res.status(400).json({ errors });
  }

  const { name, description, price, category } = req.body;
  const product = store.replace(id, { name, description, price, category });

  if (!product) {
    return res.status(404).json({ error: `Produit #${id} introuvable` });
  }

  res.status(200).json(product);
};

// PATCH /products/:id — modifier partiellement un produit
exports.update = (req, res) => {
  const id = parseInt(req.params.id);

  if (!Object.keys(req.body).length) {
    return res.status(400).json({ error: "Le corps de la requête est vide" });
  }

  const errors = validate(req.body, false);
  if (errors.length) {
    return res.status(400).json({ errors });
  }

  const { name, description, price, category } = req.body;
  const product = store.update(id, { name, description, price, category });

  if (!product) {
    return res.status(404).json({ error: `Produit #${id} introuvable` });
  }

  res.status(200).json(product);
};

// DELETE /products/:id — supprimer un produit
exports.remove = (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = store.remove(id);

  if (!deleted) {
    return res.status(404).json({ error: `Produit #${id} introuvable` });
  }

  res.status(204).send();
};
