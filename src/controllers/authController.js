const jwt            = require("jsonwebtoken");
const { findByUsername } = require("../data/users");

const SECRET  = process.env.JWT_SECRET || "secret_dev";
const EXPIRES = "30m"; // expiration du token

// POST /auth/login — génère et retourne un token JWT
exports.login = (req, res) => {
  const { username, password } = req.body;

  // Vérification des champs obligatoires
  if (!username || !password) {
    return res.status(400).json({ error: "username et password sont obligatoires" });
  }

  // Vérification des identifiants
  const user = findByUsername(username);

  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Identifiants incorrects" });
  }

  // Génération du token
  const token = jwt.sign(
    { id: user.id, username: user.username }, // payload (données dans le token)
    SECRET,                                    // clé secrète de signature
    { expiresIn: EXPIRES }                     // expiration : 30 minutes
  );

  res.status(200).json({
    token,
    expiresIn: EXPIRES
  });
};
