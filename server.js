const errorHandler = require("./middlewares/errorHandler");
const db = require("./config/dbConnection");
const express = require('express');
const dotenv = require('dotenv').config();



db();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/intern", require("./routes/InternRoute"))
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

});