# Products API

API REST de gestion de produits avec authentification JWT — Node.js / Express

## Structure

```
products-api/
├── src/
│   ├── app.js                              # Point d'entrée — serveur Express
│   ├── routes/
│   │   ├── auth.js                         # Route d'authentification
│   │   └── products.js                     # Routes produits
│   ├── controllers/
│   │   ├── authController.js               # Logique login + génération JWT
│   │   └── productsController.js           # Logique métier produits
│   ├── middlewares/
│   │   └── authMiddleware.js               # Vérification du token JWT
│   └── data/
│       ├── products.js                     # Store produits en mémoire
│       └── users.js                        # Store utilisateurs en mémoire
├── .gitignore
├── package.json
└── README.md
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

---

## Authentification

L'API utilise des tokens **JWT** (JSON Web Token) qui expirent après **30 minutes**.

Les routes de lecture (GET) sont publiques. Les routes d'écriture (POST, PUT, PATCH, DELETE) nécessitent un token valide.

### Se connecter

```
POST /auth/login
```

Corps de la requête :
```json
{
  "username": "admin",
  "password": "admin123"
}
```

Réponse :
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "30m"
}
```

### Utiliser le token

Ajouter le header suivant à chaque requête protégée :

```
Authorization: Bearer <token>
```

### Comptes disponibles

| Username | Password  |
|----------|-----------|
| admin    | admin123  |
| user     | user123   |

---

## Endpoints produits

| Méthode | Route            | Action                   | Accès   | Code succès |
|---------|------------------|--------------------------|---------|-------------|
| GET     | /products        | Lister tous les produits | Public  | 200         |
| GET     | /products/:id    | Consulter un produit     | Public  | 200         |
| POST    | /products        | Ajouter un produit       | 🔒 JWT  | 201         |
| PUT     | /products/:id    | Remplacer un produit     | 🔒 JWT  | 200         |
| PATCH   | /products/:id    | Modifier partiellement   | 🔒 JWT  | 200         |
| DELETE  | /products/:id    | Supprimer un produit     | 🔒 JWT  | 204         |

---

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

---

## Codes HTTP retournés

| Code | Signification                          |
|------|----------------------------------------|
| 200  | OK                                     |
| 201  | Ressource créée                        |
| 204  | Suppression réussie (pas de contenu)   |
| 400  | Données invalides ou manquantes        |
| 401  | Token manquant, invalide ou expiré     |
| 404  | Produit introuvable                    |

---

## Exemples de requêtes

### 1. Se connecter
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### 2. Lister les produits (public)
```bash
curl http://localhost:3000/products
```

### 3. Ajouter un produit (token requis)
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"name":"Clavier mécanique","description":"Switch Cherry MX Red","price":89.99,"category":"Périphériques"}'
```

### 4. Modifier partiellement (PATCH)
```bash
curl -X PATCH http://localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"price":999.99}'
```

### 5. Supprimer un produit
```bash
curl -X DELETE http://localhost:3000/products/1 \
  -H "Authorization: Bearer <token>"
```
