/**
 * Main entry point for backend server.
 *
 * Configuration and starting the express application.
 *
 * @link   URL
 * @file   This files defines the main entry point for the NodeJS application.
 * @author AuthorName.Lawrence
 * @since  13.12.2022
 */

// import all the modules/packages
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cookieparser = require("cookie-parser");

// allow the app to use express
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "build", "views"));
app.set("view engine", "ejs");

// allow the app to use cookieparser
app.use(helmet());

// allow the app to use cookieparser
app.use(cookieparser());

// allow the express server to process POST request rendered by the ejs files 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// allow the express server to read and render the static css file
app.use(express.static(path.join(__dirname, "build")));

// a port number to expose the server
const PORT = process.env.PORT || 4000;

// define all routers here
// the app.use route have to be here! order matters
var usersRouter = require("./routes/userRoute");
app.use("/user", usersRouter);

app.get("/", (req, res) => {
  // check if user is logged in, by checking cookie
  let username = req.cookies.username;

  // render the home page
  return res.render("index", {
    username,
  });
});

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));