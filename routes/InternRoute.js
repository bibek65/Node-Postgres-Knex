const express = require("express");
const router = express.Router();
const { getInterns, createIntern, updateIntern, deleteIntern } = require("../controllers/InternController");

const denyAdminMiddleware = (req, res, next) => {
    const { name } = req.body;

    if (name && name.toLowerCase() === 'admin') {
        return res.status(400).json({ error: 'Entries with the name "admin" are not allowed.' });
    }

    next();
};


router.route("/").get(getInterns).post(denyAdminMiddleware, createIntern);
router.route("/:id").put(updateIntern).delete(deleteIntern);


module.exports = router;