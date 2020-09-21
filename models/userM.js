import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  usuario: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  rol: { type: String, default: "cliente" },
});

userSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
userSchema.methods.comparePassword = (password, user) => {
  return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model("UserM", userSchema);
