
const users = JSON.parse(localStorage.getItem("users") || "{}");
let currentUser = localStorage.getItem("currentUser");

// Existing watchVideo, login, register ...

function updateStats() { /* ... existing stats update ... */ }
function saveUsers() { localStorage.setItem("users", JSON.stringify(users)); }

// ADMIN PANEL LOGIC
const adminToggle = document.getElementById('admin-toggle');
const adminPanel = document.getElementById('admin-panel');
const loginForm = document.getElementById('admin-login-form');
const dashboard = document.getElementById('admin-dashboard');
const usersTableBody = document.querySelector('#users-table tbody');

adminToggle.addEventListener('click', () => {
  adminPanel.classList.toggle('hidden');
});

document.getElementById('admin-login-btn').addEventListener('click', () => {
  const u = document.getElementById('admin-username').value;
  const p = document.getElementById('admin-password').value;
  if (u === 'Admin' && p === 'Admin123') {
    loginForm.classList.add('hidden');
    dashboard.classList.remove('hidden');
    renderUsers();
  } else {
    alert('Invalid admin credentials');
  }
});

document.getElementById('admin-logout-btn').addEventListener('click', () => {
  dashboard.classList.add('hidden');
  loginForm.classList.remove('hidden');
  document.getElementById('admin-username').value = '';
  document.getElementById('admin-password').value = '';
});

function renderUsers() {
  usersTableBody.innerHTML = '';
  Object.keys(users).forEach(username => {
    const u = users[username];
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${username}</td>
      <td><input type="number" value="${u.watched}" data-user="${username}" data-field="watched" /></td>
      <td><input type="number" value="${u.balance||0}" data-user="${username}" data-field="balance" /></td>
      <td><button data-user="${username}" class="save-btn">Save</button></td>
    `;
    usersTableBody.appendChild(tr);
  });
  document.querySelectorAll('.save-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const username = btn.getAttribute('data-user');
      document.querySelectorAll(`input[data-user="${username}"]`).forEach(input => {
        const field = input.getAttribute('data-field');
        users[username][field] = Number(input.value);
      });
      saveUsers();
      alert('User updated');
    });
  });
}
