const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 3001;
const app = express();
app.use(express.json());


require("./utils/dbConfig.js").getDBConnection();

const server = app.listen(port, () => {
    console.log(`Server is running at port ${port} `);
});
