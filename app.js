'use strict';
const users = JSON.parse(localStorage.getItem('users') || '{}');
let currentUser = localStorage.getItem('currentUser');

function saveUsers() {
  localStorage.setItem('users', JSON.stringify(users));
}

function login() {
  const u = document.getElementById('username').value;
  const p = document.getElementById('password').value;
  if (users[u] && users[u].password === p) {
    currentUser = u;
    localStorage.setItem('currentUser', currentUser);
    updateStats();
    alert('Login successful');
  } else {
    alert('Invalid credentials');
  }
}

function register() {
  const u = document.getElementById('username').value;
  const p = document.getElementById('password').value;
  if (users[u]) {
    alert('User already exists');
    return;
  }
  users[u] = { password: p, watched: 0 };
  saveUsers();
  alert('Registered successfully');
}

function logout() {
  currentUser = null;
  localStorage.removeItem('currentUser');
  document.getElementById('watched')?.innerText = 0;
  document.getElementById('earned')?.innerText = '0.00';
  document.getElementById('caps')?.innerText = 0;
}

function updateStats() {
  if (!currentUser || !users[currentUser]) return;
  document.getElementById('watched').innerText = users[currentUser].watched;
  const earned = (users[currentUser].watched * 0.2).toFixed(2);
  document.getElementById('earned').innerText = earned;
  document.getElementById('caps').innerText = users[currentUser].watched;
}

function watchVideo() {
  if (!currentUser) {
    alert('Please log in first.');
    return;
  }
  users[currentUser].watched++;
  saveUsers();
  updateStats();
  const links = [
    'https://www.youtube.com/watch?v=ysz5S6PUM-U',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://www.youtube.com/watch?v=oHg5SJYRHA0',
    'https://www.youtube.com/watch?v=jNQXAC9IVRw'
  ];
  const url = links[Math.floor(Math.random() * links.length)];
  window.open(url, '_blank');
}

function watchVideoFromList(url) {
  if (!currentUser) {
    alert('Please log in first.');
    return;
  }
  users[currentUser].watched++;
  saveUsers();
  window.open(url, '_blank');
}

function loginAdmin() {
  const u = document.getElementById('admin-username').value;
  const p = document.getElementById('admin-password').value;
  // Demo admin credentials
  if (u === 'admin' && p === 'password123') {
    window.location.href = 'admin-dashboard.html';
  } else {
    alert('Invalid admin credentials');
  }
}

if (currentUser) updateStats();