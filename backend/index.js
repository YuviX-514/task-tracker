require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

 
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = process.env.PORT || 8000;


//Middlewares : 
app.use(cors());
app.use(express.json());

//Routes
app.use("/tasks", taskRoutes);

//DB connection : 
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));


app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });