# Products API

API REST de gestion de produits — Node.js / Express

## Structure

```
products-api/
├── src/
│   ├── app.js                          # Point d'entrée — serveur Express
│   ├── routes/
│   │   └── products.js                 # Déclaration des routes
│   ├── controllers/
│   │   └── productsController.js       # Logique métier
│   └── data/
│       └── products.js                 # Store en mémoire
├── .gitignore
└── package.json
```

## Installation

```bash
npm install
```

## Démarrage

```bash
npm run dev    # développement (nodemon, rechargement auto)
npm start      # production
```

## Endpoints

| Méthode  | Route            | Action                       | Code succès |
|----------|------------------|------------------------------|-------------|
| GET      | /products        | Lister tous les produits     | 200         |
| GET      | /products/:id    | Consulter un produit         | 200         |
| POST     | /products        | Ajouter un produit           | 201         |
| PUT      | /products/:id    | Remplacer un produit         | 200         |
| PATCH    | /products/:id    | Modifier partiellement       | 200         |
| DELETE   | /products/:id    | Supprimer un produit         | 204         |

## Format d'un produit

```json
{
  "id": 1,
  "name": "Laptop Pro 15",
  "description": "Ordinateur portable haute performance",
  "price": 1299.99,
  "category": "Informatique"
}
```

## Exemples de requêtes

### Lister tous les produits
```bash
curl http://localhost:3000/products
```

### Consulter un produit
```bash
curl http://localhost:3000/products/1
```

### Ajouter un produit
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Clavier mécanique","description":"Switch Cherry MX Red","price":89.99,"category":"Périphériques"}'
```

### Remplacer un produit (PUT)
```bash
curl -X PUT http://localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop Pro 16","description":"Nouvelle version","price":1499.99,"category":"Informatique"}'
```

### Modifier partiellement (PATCH)
```bash
curl -X PATCH http://localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price":1199.99}'
```

### Supprimer un produit
```bash
curl -X DELETE http://localhost:3000/products/1
```

## Codes HTTP retournés

| Code | Signification                          |
|------|----------------------------------------|
| 200  | OK                                     |
| 201  | Ressource créée                        |
| 204  | Suppression réussie (pas de contenu)   |
| 400  | Données invalides ou manquantes        |
| 404  | Produit introuvable                    |
