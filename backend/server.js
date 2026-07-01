const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const noteRoutes = require("./routes/noteRoutes");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => {
  res.send("Notes Keeper API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});