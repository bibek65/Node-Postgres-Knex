const asyncHandler = require("express-async-handler");
const db = require("../config/dbConnection");
//@desc get all interns
//@route GET /api/intern
const getInterns = asyncHandler(async (req, res) => {
    try {
        const interns = await db('interns').select('*');
        res.json(interns);
    } catch (error) {
        console.error(error);
    }
});


const denyAdminMiddleware = (req, res, next) => {
    const { name } = req.body;

    if (name && name.toLowerCase() === 'admin') {
        return res.status(400).json({ error: 'Entries with the name "admin" are not allowed.' });
    }

    next();
};

//@desc create intern
//@route POST /api/intern
const createIntern = asyncHandler(denyAdminMiddleware, async (req, res) => {
    console.log("The data", req.body);
    const { name, address, dob, selectionStatus } = req.body;
    if (!name || !address || !dob || !selectionStatus) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }

    try {
        const intern = await db('interns').insert(req.body)
        res.send('Intern added')
    } catch (e) {
        console.log(e)
    }

});

//@desc update intern
//@route PUT /api/intern/:id
const updateIntern = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.body);

        await db('interns')
            .where({ id })
            .update(req.body)
        res.send("Updated Sucessfully")
    }
    catch (e) {
        console.log(e)
    }


});

//@desc delete  intern
//@route DELETE /api/intern/:id
const deleteIntern = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        await db('interns')
            .where({ id })
            .del()
        res.send("Deleted Sucessfully")
    }
    catch (e) {
        console.log(e)
    }
});

module.exports = { getInterns, createIntern, updateIntern, deleteIntern };
