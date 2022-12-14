const express = require("express");
const userControllers = require("../controllers/userController");
const router = express.Router();

// middleware that will only be used in all routes here, i.e. /users
router.use(function(req, res, next) {
  console.log(req.url, "@", Date.now());
  next();
})

// /user/register - registration form page
router.get("/register", (req, res) => {
  return res.render("register")
});

// /user/welcome - welcome page
router.get("/welcome", userControllers.userWelcome);

// post calls to handle login and register to firebase
router.post("/process_login", userControllers.userLogin);
router.post("/process_register", userControllers.userRegister);

module.exports = router;