document.getElementById("registrationForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Clear previous errors
  document.querySelectorAll(".error").forEach(el => el.textContent = "");

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;

  let valid = true;

  // Validation
  if (name.length < 3) {
    document.getElementById("nameError").textContent = "Name must be at least 3 characters.";
    valid = false;
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    document.getElementById("emailError").textContent = "Invalid email format.";
    valid = false;
  }

  const passPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
  if (!password.match(passPattern)) {
    document.getElementById("passwordError").textContent = "Password must be at least 6 characters with a number and a special character.";
    valid = false;
  }

  if (!dob) {
    document.getElementById("dobError").textContent = "Date of birth is required.";
    valid = false;
  }

  if (valid) {
    const newUser = { name, email, password, dob };

    // Retrieve existing users
    let users = JSON.parse(localStorage.getItem("userDataList")) || [];

    // Add new user
    users.push(newUser);

    // Save updated list
    localStorage.setItem("userDataList", JSON.stringify(users));

    alert("Registration successful!");
    document.getElementById("registrationForm").reset();
  }
});

function loadData() {
  const users = JSON.parse(localStorage.getItem("userDataList"));

  if (users && users.length > 0) {
    let html = "<h3>Stored User Data:</h3>";
    users.forEach((user, index) => {
      html += `
        <div style="border:1px solid #ccc; padding:10px; margin:10px 0;">
          <p><strong>User ${index + 1}</strong></p>
          <p><strong>Name:</strong> ${user.name}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>DOB:</strong> ${user.dob}</p>
        </div>
      `;
    });
    document.getElementById("output").innerHTML = html;
  } else {
    document.getElementById("output").innerHTML = "No data found.";
  }
}
