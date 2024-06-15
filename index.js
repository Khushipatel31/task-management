const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { errorHandler } = require("./middleware/errorHandling.js");
const taskRoutes = require("./routes/taskRoutes.js");

dotenv.config();

const port = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1",taskRoutes)

require("./utils/dbConfig.js").getDBConnection();
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running at port ${port} `);
});
