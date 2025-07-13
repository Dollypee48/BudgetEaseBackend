const express = require("express");
const router = express.Router();
const { getAll, create, remove, clearAll } = require("../controllers/transactionController");
const protect = require("../middleware/authMiddleware");

router.route("/")
  .get(protect, getAll)
  .post(protect, create)
  .delete(protect, clearAll); 

router.delete("/:id", protect, remove);

module.exports = router;
