const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Formde = require("./Formde");

const app = express();
const port = process.env.PORT || 8000;

// Middlewares
app.use(express.json());
app.use(cors());

// connection url

const connection_url =
  "mongodb+srv://amazclone:2813pratik@cluster0.c9lhu41.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) =>
  res.status(200).send("API by Pratik Kajare for form registration")
);

app.post("/formj", async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) {
    return res.status(422).json({ error: "plz filled the field property" });
  } else {
    const user = new Formde({ name, email, phone, password });

    await user.save();
    res.status(201).json({ message: "user registered successful" });
    console.log("documents added succefull");
  }
});

app.listen(port, () => console.log("listening on the port", port));
