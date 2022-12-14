const { initializeApp } = require("firebase/app");
const { getDatabase, ref, update, set, onValue } = require("firebase/database");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");

/**
 * Firebase config settings
 * @todo put these data in a JSON and avoid upload to git if possible
*/ 
const firebaseConfig = {
  apiKey: "AIzaSyCzRgRUgquTu51FZCl21QuArdx4zB10A7E",
  authDomain: "test-project-d8af9.firebaseapp.com",
  databaseURL: "https://test-project-d8af9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-project-d8af9",
  storageBucket: "test-project-d8af9.appspot.com",
  messagingSenderId: "902021330874",
  appId: "1:902021330874:web:fc6b971aa52a53762e8f83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Retrieve services via the defaultApp variable
let defaultAuth = getAuth(app);
let defaultDatabase = getDatabase(app);

// helper functions
/**
 * Reads the user data from database with userID and key
 * @param id The userID
 * @param key The key to read the value from
 * @returns The value of the key in a promise
 */
function readUserData(user, key) {
  return new Promise((resolve, reject) => {
    if (user != null) {
      const data = ref(defaultDatabase, "users/" + user.uid + "/" + key);
      onValue(data, (snapshot) => {
        resolve(snapshot.val());
      });
    }
  })
}

/**
 * Writes the user data from database with userID and fileds
 * This will overwrite all data pointed by the user.uid
 * @param id The userID
 * @param key The key to read the value from
 * @returns The value of the key in a promise
 */
function writeUserData(user, email, full_name, favourite_song, milk_before_cereal) {
  if (user != null) {
    set(ref(defaultDatabase, "users/" + user.uid), {
      email: email,
      full_name: full_name,
      favourite_song: favourite_song,
      milk_before_cereal: milk_before_cereal,
      max_score: 0,
      last_login: Date.now()
    });
  }
}

/**
 * Updates the user data from database with userID and data
 * @param id The userID
 * @param key The key to read the value from
 * @returns The value of the key in a promise
 */
function updateUserData(user, userData) {
  if (user != null) {
    update(ref(defaultDatabase, "users/" + user.uid), userData);
    return;
  }
}

const userLogin = (req, res) => {
  const { username, password } = req.body;

  signInWithEmailAndPassword(defaultAuth, username, password)
    .then(credentials => {
      // Get the user name with the uid
      readUserData(defaultAuth.currentUser, "full_name")
        .then(userName => {
          // saving the data to the cookies
          res.cookie("username", userName);
          
          // Create userData package with current time
          const userData = {
            last_login: String(Date.now())
          };
    
          // Passes the userData package and updates the database, redirects once function is finished
          updateUserData(defaultAuth.currentUser, userData);

          // Set the response status to success and send the response data
          res.status(200).send({
            success: true,
            message: "Login successful"
          });
      });
    })
    .catch(error => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}

const userRegister = (req, res) => {
  const { username, password, full_name, favourite_song, milk_before_cereal } = req.body;

  // Registers a new user with email and password authentication
  createUserWithEmailAndPassword(defaultAuth, username, password)
    .then(() => {
      writeUserData(defaultAuth.currentUser, username, full_name, favourite_song, milk_before_cereal);

      // Set the response status to success and send the response data
      res.status(200).send({
        success: true,
        message: "Registration successful"
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
  });
}

const userWelcome = (req, res) => {
  // get the username
  let username = req.cookies.username;

  // render welcome page
  return res.render("welcome", {
    username,
  });
}

module.exports = {
  userLogin,
  userRegister,
  userWelcome
};