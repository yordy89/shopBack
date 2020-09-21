import mongoose from "mongoose";
require("dotenv").config();

mongoose
  .connect(process.env.URLDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a Base de Datos"))
  .catch((e) => console.log(e));
