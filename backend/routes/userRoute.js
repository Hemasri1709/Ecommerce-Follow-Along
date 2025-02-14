const express = require("express");
const router = express.Router();

const signUp = require("../controllers/userController");
const login = require("../controllers/loginController");

router.post("/login", login);
router.post("/signup", signUp);

module.exports = router;