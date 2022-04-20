const express = require("express");
const router = express.Router();

const monsterController = require("../../controller/monsters");

// gets all the monsters info
router.get("/", monsterController.getAllMonster);

// creates a new monster
router.post("/create", monsterController.addMonster);

// updates the monsters
router.put("/update/:id", monsterController.updateMonster);

// deletes the monsters
router.delete("/destroy/:id", monsterController.deleteMonster);

module.exports = router;
