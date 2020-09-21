import express from "express";
import passport from "passport";
const router = express.Router();

router.post(
  "/register",
  passport.authenticate("local-register", {
    passReqToCallback: true,
  }),
  (req, res) => {
    res.json(req.user);
  }
);

router.post(
  "/login",
  passport.authenticate("local-login", {
    passReqToCallback: true,
  }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
