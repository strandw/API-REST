const express = require("express");
const router  = express.Router();
const ctrl    = require("../controllers/productsController");

// Lister tous les produits
router.get("/",       ctrl.getAll);

// Consulter un produit par ID
router.get("/:id",    ctrl.getOne);

// Ajouter un produit
router.post("/",      ctrl.create);

// Remplacer complètement un produit (PUT = remplacement total)
router.put("/:id",    ctrl.replace);

// Modifier partiellement un produit (PATCH = mise à jour partielle)
router.patch("/:id",  ctrl.update);

// Supprimer un produit
router.delete("/:id", ctrl.remove);

module.exports = router;
