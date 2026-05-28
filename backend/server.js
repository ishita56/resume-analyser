require("dotenv").config();

const express = require("express");

const cors = require("cors");

const connectDB =
  require("./config/db");

const analyzeRoute =
  require("./routes/analyze");

const authRoutes =
  require("./routes/auth");

const app = express();

app.use(cors());

app.use(express.json());

const startServer = async () => {

  try {

    // CONNECT DATABASE
    await connectDB();

    // ROUTES
    app.use("/api", analyzeRoute);

    app.use(
      "/api/auth",
      authRoutes
    );

    // TEST ROUTE
    app.get("/", (req, res) => {

      res.send(
        "Backend Running"
      );
    });

    // SERVER START
    app.listen(5000, () => {

      console.log(
        "Server Running on http://localhost:5000"
      );
    });

  } catch (error) {

    console.log(
      "Server Error:",
      error.message
    );
  }
};

startServer();