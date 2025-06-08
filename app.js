// app.js

// Shared user store
const usersKey = 'users';
let users = JSON.parse(localStorage.getItem(usersKey) || '{}');
let currentUser = localStorage.getItem('currentUser');
let isAdmin = false;

// UTILITIES
function saveUsers() {
  localStorage.setItem(usersKey, JSON.stringify(users));
}

function updateStats() {
  if (!currentUser || !users[currentUser]) return;
  const watched = users[currentUser].watched || 0;
  const earned = watched * 20;
  document.getElementById('watched').innerText = watched;
  document.getElementById('earned').innerText = earned.toFixed(2);
  document.getElementById('caps').innerText = watched;
}

// USER FUNCTIONS
function login() {
  const uname = document.getElementById('username').value;
  const pw = document.getElementById('password').value;
  // Admin shortcut
  if (uname === 'Admin' && pw === 'Admin123') {
    return adminLogin();
  }
  if (users[uname] && users[uname].password === pw) {
    currentUser = uname;
    localStorage.setItem('currentUser', currentUser);
    alert('Login successful');
    updateStats();
  } else {
    alert('Invalid credentials');
  }
}

function register() {
  const uname = document.getElementById('username').value;
  const pw = document.getElementById('password').value;
  if (uname === 'Admin') return alert('Cannot register as Admin');
  if (users[uname]) return alert('User already exists');
  users[uname] = { password: pw, watched: 0, balance: 0, wallet: '' };
  saveUsers();
  alert('Registered successfully');
}

function logoutUser() {
  if (isAdmin) return logoutAdmin();
  currentUser = null;
  localStorage.removeItem('currentUser');
  document.getElementById('watched').innerText = 0;
  document.getElementById('earned').innerText = '0.00';
  document.getElementById('caps').innerText = 0;
}

// VIDEO-WATCHING
function watchVideo() {
  if (!currentUser) return alert('Please log in first.');
  users[currentUser].watched = (users[currentUser].watched || 0) + 1;
  saveUsers();
  updateStats();
  // Example playlist
  const links = [
    'https://www.youtube.com/watch?v=ysz5S6PUM-U',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://www.youtube.com/watch?v=oHg5SJYRHA0',
    'https://www.youtube.com/watch?v=jNQXAC9IVRw'
  ];
  const url = links[Math.floor(Math.random() * links.length)];
  window.open(url, '_blank');
}

// ADMIN FUNCTIONS
function adminLogin() {
  const uname = document.getElementById('adminUsername').value;
  const pw = document.getElementById('adminPassword').value;
  if (uname === 'Admin' && pw === 'Admin123') {
    isAdmin = true;
    document.getElementById('adminLoginSection').style.display = 'none';
    document.getElementById('userAuthCard').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    renderAdminPanel();
  } else {
    alert('Invalid admin credentials');
  }
}

function logoutAdmin() {
  isAdmin = false;
  document.getElementById('adminPanel').style.display = 'none';
  document.getElementById('adminLoginSection').style.display = 'block';
  document.getElementById('userAuthCard').style.display = 'block';
}

// Build the admin panel user table
function renderAdminPanel() {
  users = JSON.parse(localStorage.getItem(usersKey) || '{}');
  const container = document.getElementById('adminUsersList');
  container.innerHTML = '';
  const table = document.createElement('table');
  table.style.width = '100%';
  table.style.borderCollapse = 'collapse';
  // Header
  table.innerHTML = `
    <thead>
      <tr style="background:#222;color:#0f0;">
        <th>User</th><th>Watched</th><th>Balance</th><th>Wallet</th><th>Action</th>
      </tr>
    </thead>
    <tbody>
      ${Object.keys(users).map(u => {
        const w = users[u].watched || 0;
        const b = users[u].balance !== undefined
          ? users[u].balance
          : w * 20;
        const wa = users[u].wallet || '';
        return `
          <tr style="border-top:1px solid #0f0;">
            <td>${u}</td>
            <td><input type="number" value="${w}" data-user="${u}" data-field="watched"></td>
            <td><input type="number" step="0.01" value="${b}" data-user="${u}" data-field="balance"></td>
            <td><input type="text" value="${wa}" data-user="${u}" data-field="wallet"></td>
            <td><button onclick="saveUserChanges(this)">Save</button></td>
          </tr>
        `;
      }).join('')}
    </tbody>
  `;
  container.appendChild(table);
}

function saveUserChanges(btn) {
  const row = btn.closest('tr');
  const inputs = row.querySelectorAll('input');
  inputs.forEach(input => {
    const u = input.dataset.user;
    const f = input.dataset.field;
    let v = input.value;
    if (f === 'watched') v = parseInt(v) || 0;
    if (f === 'balance') v = parseFloat(v) || 0;
    users[u][f] = v;
  });
  saveUsers();
  alert('User updated');
}

// INITIALIZE
if (currentUser && !isAdmin) updateStats();
