const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "secret_dev";

module.exports = (req, res, next) => {
  // Le token doit être dans le header Authorization: Bearer <token>
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token manquant ou mal formaté" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // disponible dans les controllers suivants
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expiré" });
    }
    return res.status(401).json({ error: "Token invalide" });
  }
};
