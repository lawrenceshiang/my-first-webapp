/*
function welcomeFunction() {
  const id = localStorage.getItem("userid");
  if (id != null) {
    let userName = readUserData(id, "full_name");
    const nameField = document.getElementById('welcomename') as HTMLInputElement;
    nameField.innerHTML = "Welcome " + userName;
    const nameField2 = document.getElementById('welcomename2') as HTMLInputElement;
    nameField2.innerHTML = userName;


    let userMaxscore = readUserData(id, "max_score");
    const scoreField = document.getElementById('score') as HTMLInputElement;
    scoreField.innerHTML = "Your highest score is " + userMaxscore;
  }
}

document.addEventListener("load", function(){
  const id = localStorage.getItem("userid");
  if (id != null) {
    let userName = readUserData(id, "full_name");
    const nameField = document.getElementById('welcomename') as HTMLInputElement;
    nameField.innerHTML = "Welcome " + userName;
    const nameField2 = document.getElementById('welcomename2') as HTMLInputElement;
    nameField2.innerHTML = userName;


    let userMaxscore = readUserData(id, "max_score");
    const scoreField = document.getElementById('score') as HTMLInputElement;
    scoreField.innerHTML = "Your highest score is " + userMaxscore;
  }
});
*/