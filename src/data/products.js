// Stockage en mémoire — remplacer par une BDD en production

const products = [
  {
    id: 1,
    name: "Laptop Pro 15",
    description: "Ordinateur portable haute performance",
    price: 1299.99,
    category: "Informatique"
  },
  {
    id: 2,
    name: "Souris sans fil",
    description: "Souris ergonomique Bluetooth",
    price: 39.99,
    category: "Périphériques"
  }
];

let nextId = 3;

const getAll    = ()       => products;
const getById   = (id)     => products.find(p => p.id === id);

const create    = (data)   => {
  const product = { id: nextId++, ...data };
  products.push(product);
  return product;
};

// PUT : remplacement complet (écrase toutes les propriétés)
const replace   = (id, data) => {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  products[index] = { id, ...data };
  return products[index];
};

// PATCH : mise à jour partielle (fusionne)
const update    = (id, data) => {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  products[index] = { ...products[index], ...data };
  return products[index];
};

const remove    = (id)     => {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  return true;
};

module.exports = { getAll, getById, create, replace, update, remove };
