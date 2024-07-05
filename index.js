const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { errorHandler } = require("./middleware/errorHandling.js");
const taskRoutes = require("./routes/taskRoutes.js");
const userRoutes=require("./routes/userRoutes.js")
dotenv.config();

const port = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:4200', // Your frontend URL
    credentials: true, // Allow credentials (cookies) to be sent
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
  };
app.use(cors(corsOptions));
app.use("/api/v1",taskRoutes);
app.use("/api/v1",userRoutes)

require("./utils/dbConfig.js").getDBConnection();
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running at port ${port} `);
});