const express = require("express");
const router  = express.Router();
const ctrl    = require("../controllers/productsController");
const auth    = require("../middlewares/authMiddleware");

// ── Routes publiques (lecture seule) ──────────────────────────────────────────
router.get("/",       ctrl.getAll);   // GET  /products
router.get("/:id",    ctrl.getOne);   // GET  /products/:id

// ── Routes protégées (écriture — token requis) ────────────────────────────────
router.post("/",      auth, ctrl.create);   // POST   /products
router.put("/:id",    auth, ctrl.replace);  // PUT    /products/:id
router.patch("/:id",  auth, ctrl.update);   // PATCH  /products/:id
router.delete("/:id", auth, ctrl.remove);   // DELETE /products/:id

module.exports = router;
