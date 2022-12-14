const form = document.getElementById("my-form") as HTMLFormElement | null;
form?.addEventListener("submit", event => {
  // Prevent the form from submitting and refreshing the page
  event.preventDefault();

  // Get the form data
  const emailInput = document.getElementById("emailForm") as HTMLInputElement | null;
  const passwordInput = document.getElementById("passwordForm") as HTMLInputElement | null;
  if (emailInput != null && passwordInput != null) {
    
    const userData = {
      username: emailInput.value,
      password: passwordInput.value
    };

    fetch("user/process_login", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((res) => {
      // Read the data from the stream and convert it to a JavaScript object
      res.json().then((data) => {
        // Log the data
        console.log(data);
        window.location.href = "user/welcome";
      });
    });
  }
});

const regbutton = document.getElementById("my-registration-form") as HTMLButtonElement | null;
regbutton?.addEventListener("submit", e => {
  // Prevent the form from submitting and refreshing the page
  e.preventDefault()

  // Get all our input fields
  const emailInput = document.getElementById("emailForm") as HTMLInputElement | null;
  const passwordInput = document.getElementById("passwordForm") as HTMLInputElement | null;
  const fullNameInput = document.getElementById("nameForm") as HTMLInputElement | null;
  const songInput = document.getElementById("songForm") as HTMLInputElement | null;
  const milkInput = document.getElementById("milkForm") as HTMLInputElement | null;

  if (emailInput != null &&
    passwordInput != null &&
    fullNameInput != null &&
    songInput != null &&
    milkInput != null) {
    
    const userData = {
      username: emailInput.value,
      password: passwordInput.value,
      full_name: fullNameInput.value,
      favourite_song: songInput.value,
      milk_before_cereal: milkInput.value
    };

    fetch("user/process_register", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((res) => {
      // Read the data from the stream and convert it to a JavaScript object
      res.json().then((data) => {
        // Log the data
        console.log(data);
      });
    });
  }
})