// Utilisateurs en mémoire — remplacer par une BDD en production
// Les mots de passe devraient être hashés (bcrypt) en production

const users = [
  { id: 1, username: "admin", password: "admin123" },
  { id: 2, username: "user",  password: "user123"  }
];

const findByUsername = (username) => users.find(u => u.username === username);

module.exports = { findByUsername };
