import passport from "passport";
import User from "../models/userM";
const userModel = new User();

const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  return done(null, user);
});

passport.use(
  "local-register",
  new LocalStrategy(
    {
      usernameField: "usuario",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, usuario, password, done) => {
      const user = await User.findOne({ usuario: usuario });
      if (user) {
        done(null, false, { mensaje: "Ya existe el Usuario" });
      } else {
        const newUser = new User();
        newUser.usuario = usuario;
        newUser.password = newUser.encryptPassword(password);
        (newUser.nombre = req.body.nombre),
          (newUser.apellido = req.body.apellido);
        await newUser.save();
        done(null, newUser);
      }
    }
  )
);

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "usuario",
      passwordField: "password",
    },
    async (usuario, password, done) => {
      const user = await User.findOne({ usuario: usuario });
      if (user) {
        if (userModel.comparePassword(password, user)) {
          done(null, user);
        } else {
          done(null, false, { mensaje: "La contraseña es incorrecta" });
        }
      } else {
        done(null, false, { mensaje: "El usuario no existe" });
      }
    }
  )
);
