// Main application logic
const users = JSON.parse(localStorage.getItem("users") || "{}");
let currentUser = localStorage.getItem("currentUser");

const saveUsers = () => localStorage.setItem("users", JSON.stringify(users));

function updateStats() {
  if (!currentUser || !users[currentUser]) return;
  document.getElementById("watched").innerText = users[currentUser].watched;
  document.getElementById("earned").innerText = (users[currentUser].watched * 20).toFixed(2);
  document.getElementById("caps").innerText = users[currentUser].watched;
  document.getElementById("balance").innerText = users[currentUser].balance.toFixed(2);
}

function login() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;
  if (users[u] && users[u].password === p) {
    currentUser = u;
    localStorage.setItem("currentUser", u);
    updateStats();
    alert("Login successful");
  } else {
    alert("Invalid credentials");
  }
}

function register() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;
  if (users[u]) return alert("User already exists");
  users[u] = { password: p, watched: 0, balance: 0, wallet: "" };
  saveUsers();
  alert("Registered successfully");
}

function logout() {
  currentUser = null;
  localStorage.removeItem("currentUser");
  document.getElementById("watched").innerText = 0;
  document.getElementById("earned").innerText = "0.00";
  document.getElementById("caps").innerText = 0;
  document.getElementById("balance").innerText = "0.00";
}

// Additional functions...
if (currentUser) {
  updateStats();
}