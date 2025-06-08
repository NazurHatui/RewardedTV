const users = JSON.parse(localStorage.getItem("users") || "{}");
let currentUser = localStorage.getItem("currentUser");

function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

function updateStats() {
  if (!currentUser || !users[currentUser]) return;
  document.getElementById("watched").innerText = users[currentUser].watched;
  document.getElementById("earned").innerText = (users[currentUser].watched * 20).toFixed(2);
  document.getElementById("caps").innerText = users[currentUser].watched;
  const balEl = document.getElementById("balance");
  if (balEl) balEl.innerText = "$" + users[currentUser].balance.toFixed(2);
}

function register() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;
  if (users[u]) return alert("User already exists");
  users[u] = { password: p, watched: 0, balance: 0 };
  saveUsers();
  alert("Registered successfully");
}

function login() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;
  if (users[u] && users[u].password === p) {
    currentUser = u;
    localStorage.setItem("currentUser", currentUser);
    updateStats();
    alert("Login successful");
  } else {
    alert("Invalid credentials");
  }
}

function logout() {
  currentUser = null;
  localStorage.removeItem("currentUser");
  updateStats();
}

function watchVideo() {
  if (!currentUser) return alert("Please log in first to earn rewards.");
  users[currentUser].watched += 1;
  saveUsers();
  updateStats();
  const links = [
    "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "https://www.youtube.com/watch?v=oHg5SJYRHA0",
    "https://www.youtube.com/watch?v=jNQXAC9IVRw"
  ];
  const url = links[Math.floor(Math.random() * links.length)];
  window.open(url, "_blank");
}

if (currentUser) updateStats();