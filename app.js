
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
  const links = ['https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://www.youtube.com/watch?v=ysz5S6PUM-U', 'https://www.youtube.com/watch?v=jNQXAC9IVRw', 'https://www.youtube.com/watch?v=aqz-KE-bpKQ', 'https://www.youtube.com/watch?v=ScMzIvxBSi4', 'https://www.youtube.com/watch?v=5NV6Rdv1a3I', 'https://www.youtube.com/watch?v=uelHwf8o7_U', 'https://www.youtube.com/watch?v=fLexgOxsZu0', 'https://www.youtube.com/watch?v=QtXby3twMmI', 'https://www.youtube.com/watch?v=8UVNT4wvIGY', 'https://www.youtube.com/watch?v=pRpeEdMmmQ0', 'https://www.youtube.com/watch?v=OPf0YbXqDm0', 'https://www.youtube.com/watch?v=2vjPBrBU-TM', 'https://www.youtube.com/watch?v=ktvTqknDobU', 'https://www.youtube.com/watch?v=YQHsXMglC9A', 'https://www.youtube.com/watch?v=RgKAFK5djSk', 'https://www.youtube.com/watch?v=XTvJBQUnVEW', 'https://www.youtube.com/watch?v=ckjAnekyMNn', 'https://www.youtube.com/watch?v=bTvTCX2svV6', 'https://www.youtube.com/watch?v=OI2UrnRrhir', 'https://www.youtube.com/watch?v=xALRS1aX3lh', 'https://www.youtube.com/watch?v=UwNI3RKlhV2', 'https://www.youtube.com/watch?v=IEMDF5qwUI2', 'https://www.youtube.com/watch?v=GRDMbETmsNP', 'https://www.youtube.com/watch?v=ATVQuruGkBM', 'https://www.youtube.com/watch?v=RxVTth3SIAY', 'https://www.youtube.com/watch?v=Qymq6ri1vHk', 'https://www.youtube.com/watch?v=E1XDRhfLQYt', 'https://www.youtube.com/watch?v=uVih3XwYVCC', 'https://www.youtube.com/watch?v=BN9TeEq0xbP', 'https://www.youtube.com/watch?v=pc26e2TkxIr', 'https://www.youtube.com/watch?v=bhZG4CCaKl3', 'https://www.youtube.com/watch?v=aJwYPFucay1', 'https://www.youtube.com/watch?v=c9GHDNvHtnM', 'https://www.youtube.com/watch?v=P7vewkvJxIw', 'https://www.youtube.com/watch?v=YSFo30rUIWX', 'https://www.youtube.com/watch?v=EFajNKPNIFW', 'https://www.youtube.com/watch?v=tcskkLwMQpD', 'https://www.youtube.com/watch?v=5VmS9JIuhif', 'https://www.youtube.com/watch?v=IpnZgo9tqlB', 'https://www.youtube.com/watch?v=lnmnkCRrDzH', 'https://www.youtube.com/watch?v=wQMr4fndRoT', 'https://www.youtube.com/watch?v=m8920HXi1E5', 'https://www.youtube.com/watch?v=rP43bWaLqzQ', 'https://www.youtube.com/watch?v=Qgq80gmy95Y', 'https://www.youtube.com/watch?v=XD35LHOtBiM', 'https://www.youtube.com/watch?v=vCEek1T0ZVt', 'https://www.youtube.com/watch?v=4BwaUFAhewT', 'https://www.youtube.com/watch?v=XF07I4kZU5i', 'https://www.youtube.com/watch?v=scFRPSvmrJv', 'https://www.youtube.com/watch?v=PvAu41iWzba', 'https://www.youtube.com/watch?v=oex3yEMc04n', 'https://www.youtube.com/watch?v=6SjzLaaFoIT', 'https://www.youtube.com/watch?v=fyuIB1HXid2', 'https://www.youtube.com/watch?v=b1Tbka8WGW2', 'https://www.youtube.com/watch?v=ZzUrg1ZobgL', 'https://www.youtube.com/watch?v=0EwPdeUTxTM', 'https://www.youtube.com/watch?v=KkfrdAFg18K', 'https://www.youtube.com/watch?v=iuCwfgc9m1K', 'https://www.youtube.com/watch?v=UWR9Ju7L45j', 'https://www.youtube.com/watch?v=JPIAJAujyga', 'https://www.youtube.com/watch?v=qrnzGlwzike', 'https://www.youtube.com/watch?v=RP3mt3p46dE', 'https://www.youtube.com/watch?v=xCY5LSsyjxD', 'https://www.youtube.com/watch?v=2Qqe5ILwI2E', 'https://www.youtube.com/watch?v=Rflzj3Hbs5x', 'https://www.youtube.com/watch?v=jzJA45l7k1u', 'https://www.youtube.com/watch?v=ZtyDyMUFhRF', 'https://www.youtube.com/watch?v=oN9ppXex8Pq', 'https://www.youtube.com/watch?v=Q3v3Y9hoJMr', 'https://www.youtube.com/watch?v=QHr02vcqE5k', 'https://www.youtube.com/watch?v=mtFL5JE6xRh', 'https://www.youtube.com/watch?v=CMBmD7j7HnX', 'https://www.youtube.com/watch?v=Qe9FLUHDnQM', 'https://www.youtube.com/watch?v=Suw4qJO35PM', 'https://www.youtube.com/watch?v=D3fZe6n5VpD', 'https://www.youtube.com/watch?v=yjPrJ25sIjX', 'https://www.youtube.com/watch?v=OsB7zSCrwxv', 'https://www.youtube.com/watch?v=9M83Feea2bu', 'https://www.youtube.com/watch?v=U5jyDUtJsKu', 'https://www.youtube.com/watch?v=G7vj3jTDPl4', 'https://www.youtube.com/watch?v=BOPJ025DAy9', 'https://www.youtube.com/watch?v=2wI5QTkJ0oh', 'https://www.youtube.com/watch?v=Bu1DDTDhKoR', 'https://www.youtube.com/watch?v=khJxosC9Ehb', 'https://www.youtube.com/watch?v=J0hHfBC0dd6', 'https://www.youtube.com/watch?v=mpePpkAJSoa', 'https://www.youtube.com/watch?v=T1Vd7Hh1Zhj', 'https://www.youtube.com/watch?v=7PgbgiZlagL', 'https://www.youtube.com/watch?v=KHAmSuWotmu', 'https://www.youtube.com/watch?v=VxF3H6SuTBg', 'https://www.youtube.com/watch?v=RegP5CPNZuh', 'https://www.youtube.com/watch?v=Gamjed3GjCr', 'https://www.youtube.com/watch?v=mQ0SX2QZzFd', 'https://www.youtube.com/watch?v=Am6yYuuaDIq', 'https://www.youtube.com/watch?v=lnQNU0xZWKg', 'https://www.youtube.com/watch?v=tO6TQLjNU6W', 'https://www.youtube.com/watch?v=VsxrCJvwSvq', 'https://www.youtube.com/watch?v=l30EZcUGNQr', 'https://www.youtube.com/watch?v=F2EeDsZqGFW'];
  const url = links[Math.floor(Math.random() * links.length)];
  window.open(url, "_blank");
};

if (currentUser) updateStats();
