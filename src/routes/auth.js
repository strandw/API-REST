const express = require("express");
const router  = express.Router();
const ctrl    = require("../controllers/authController");

// POST /auth/login — point d'authentification
router.post("/login", ctrl.login);

module.exports = router;
