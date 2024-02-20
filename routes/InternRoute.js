const express = require("express");
const router = express.Router();
const { getInterns, createIntern, updateIntern, deleteIntern } = require("../controllers/InternController");


router.route("/").get(getInterns).post(createIntern);
router.route("/:id").put(updateIntern).delete(deleteIntern);


module.exports = router;