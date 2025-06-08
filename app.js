
const users = JSON.parse(localStorage.getItem("users") || "{}");
let currentUser = localStorage.getItem("currentUser");

const updateStats = () => {
  if (!currentUser || !users[currentUser]) return;
  document.getElementById("watched").innerText = users[currentUser].watched;
  document.getElementById("earned").innerText = (users[currentUser].watched * 20).toFixed(2);
  document.getElementById("caps").innerText = users[currentUser].watched;
};

const saveUsers = () => localStorage.setItem("users", JSON.stringify(users));

const login = () => {
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
};

const register = () => {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;
  if (users[u]) return alert("User already exists");
  users[u] = { password: p, watched: 0 };
  saveUsers();
  alert("Registered successfully");
};

const logout = () => {
  currentUser = null;
  localStorage.removeItem("currentUser");
  document.getElementById("watched").innerText = 0;
  document.getElementById("earned").innerText = "0.00";
  document.getElementById("caps").innerText = 0;
};

const watchVideo = () => {
  if (!currentUser) return alert("Please log in first.");
  users[currentUser].watched += 1;
  saveUsers();
  updateStats();
  const links = ['https://www.youtube.com/watch?v=2Vv-BfVoq4g', 'https://www.youtube.com/watch?v=3JZ4pnNtyxQ', 'https://www.youtube.com/watch?v=OPf0YbXqDm0', 'https://www.youtube.com/watch?v=kJQP7kiw5Fk', 'https://www.youtube.com/watch?v=ktvTqknDobU', 'https://www.youtube.com/watch?v=Z0zConOPZ8Y', 'https://www.youtube.com/watch?v=FzwgkSzkbTo', 'https://www.youtube.com/watch?v=VD6DJf-2hxg', 'https://www.youtube.com/watch?v=UxxajLWwzqY', 'https://www.youtube.com/watch?v=owZ3iJ9mD4k', 'https://www.youtube.com/watch?v=V1qWb3oQ4nQ', 'https://www.youtube.com/watch?v=VYOjWnS4cMY', 'https://www.youtube.com/watch?v=z3v3Ww2bMoo', 'https://www.youtube.com/watch?v=UJe7F2zQvPI', 'https://www.youtube.com/watch?v=0qP4l3R8UjI', 'https://www.youtube.com/watch?v=kcdxhubt0n0', 'https://www.youtube.com/watch?v=Zc8zvtX_GTc', 'https://www.youtube.com/watch?v=rQvOAnNvcNw', 'https://www.youtube.com/watch?v=Pf0I9qQeIPY', 'https://www.youtube.com/watch?v=Vr_L28Mle-s', 'https://www.youtube.com/watch?v=jNQXAC9IVRw', 'https://www.youtube.com/watch?v=ysz5S6PUM-U', 'https://www.youtube.com/watch?v=hY7m5jjJ9mM', 'https://www.youtube.com/watch?v=MtN1YnoL46Q', 'https://www.youtube.com/watch?v=G5qvSPqhFZk'];
  const url = links[Math.floor(Math.random() * links.length)];
  window.open(url, "_blank");
};

if (currentUser) updateStats();


// Admin login handler
function loginAdmin() {
  const u = document.getElementById("admin-username").value;
  const p = document.getElementById("admin-password").value;
  if (u === "Admin" && p === "Admin123") {
    window.location.href = "admin-dashboard.html";
  } else {
    alert("Invalid admin credentials");
  }
}
