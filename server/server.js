const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("./models/User");
const authRoutes = require("./routes/auth");

const app = express();

const password = encodeURIComponent("cUxs2BVUdLgfvKv2");

const uri = `mongodb+srv://richardangka:${password}@cluster0.y2fu5kv.mongodb.net/?retryWrites=true&w=majority`;

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser());
app.use(cors());

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/auth", authRoutes);
