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

    
    await connectDB();

    
    app.use("/api", analyzeRoute);

    app.use(
      "/api/auth",
      authRoutes
    );

    
    app.get("/", (req, res) => {

      res.send(
        "Backend Running"
      );
    });

   
    app.listen(5000, () => {

      console.log(
        "Server Running on https://resume-analyser-prld.onrender.com"
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