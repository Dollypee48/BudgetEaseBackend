const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const corsOptions = require("./config/corsOptions");
const mongoose = require("mongoose");

require("dotenv").config(); 

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 4000; 

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("BudegetEase backend is running ✅");
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));


mongoose.connection.once("open", () => {
  console.log("✅ Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
