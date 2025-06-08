import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword,
         createUserWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js';
import { getFirestore, doc, setDoc, getDoc, updateDoc,
         collection, onSnapshot } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZJwv-o931FA_nRB68UiT7gHIuzx-e5rQ",
  authDomain: "rewardedtv-1e5b1.firebaseapp.com",
  projectId: "rewardedtv-1e5b1",
  storageBucket: "rewardedtv-1e5b1.firebasestorage.app",
  messagingSenderId: "188103901236",
  appId: "1:188103901236:web:4e968cbde9d01a03988a61",
  measurementId: "G-3W0Y6BTS35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);

// Admin credentials
const ADMIN_EMAIL = "admin@rewardedtv.com";
const ADMIN_PASS  = "Admin123";

// UI elements
const emailEl      = document.getElementById("email");
const passEl       = document.getElementById("pass");
const loginBtn     = document.getElementById("loginBtn");
const signupBtn    = document.getElementById("signupBtn");
const logoutBtn    = document.getElementById("logoutBtn");
const watchBtn     = document.getElementById("watchBtn");
const watchedEl    = document.getElementById("watched");
const earnedEl     = document.getElementById("earned");
const capsEl       = document.getElementById("caps");
const balanceEl    = document.getElementById("balance");
const adminEmailEl = document.getElementById("admin-email");
const adminPassEl  = document.getElementById("admin-pass");
const adminLoginBtn   = document.getElementById("adminLoginBtn");
const adminLogoutBtn  = document.getElementById("adminLogoutBtn");
const usersTableBody = document.querySelector("#usersTable tbody");

// Auth state observer
onAuthStateChanged(auth, async user => {
  if (user) {
    if (user.email === ADMIN_EMAIL && location.pathname.endsWith("admin-dashboard.html")) {
      onSnapshot(collection(db, "users"), snap => {
        usersTableBody.innerHTML = "";
        snap.forEach(docSnap => {
          const u = docSnap.data();
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${u.email}</td>
            <td contenteditable data-field="watched">${u.watched}</td>
            <td contenteditable data-field="caps">${u.caps}</td>
            <td contenteditable data-field="balance">${u.balance}</td>
            <td><button data-email="${u.email}">Save</button></td>`;
          tr.querySelector("button").onclick = async () => {
            const email = tr.querySelector("button").dataset.email;
            const updated = {
              watched: +tr.querySelector("[data-field=watched]").innerText,
              caps:    +tr.querySelector("[data-field=caps]").innerText,
              balance: +tr.querySelector("[data-field=balance]").innerText,
            };
            await updateDoc(doc(db, "users", email), updated);
            alert("Saved");
          };
          usersTableBody.append(tr);
        });
      });
    }
    if (location.pathname.endsWith("profile.html")) {
      const snap = await getDoc(doc(db, "users", user.email));
      const { watched, caps, balance } = snap.data();
      watchedEl.innerText = watched;
      capsEl.innerText     = caps;
      balanceEl.innerText  = balance.toFixed(2);
      earnedEl.innerText   = (watched * 0.20).toFixed(2);
    }
  } else {
    if (location.pathname.endsWith("admin-dashboard.html")) {
      location.href = "admin.html";
    }
  }
});

// Signup
signupBtn?.addEventListener("click", async () => {
  const email = emailEl.value, pw = passEl.value;
  await createUserWithEmailAndPassword(auth, email, pw);
  await setDoc(doc(db, "users", email), { email, watched: 0, caps: 0, balance: 0.00 });
});

// Login
loginBtn?.addEventListener("click", () =>
  signInWithEmailAndPassword(auth, emailEl.value, passEl.value)
);

// Logout
logoutBtn?.addEventListener("click", () => signOut(auth));

// Watch video
watchBtn?.addEventListener("click", async () => {
  const user = auth.currentUser;
  if (!user) return alert("Log in first");
  const ref = doc(db, "users", user.email);
  const snap = await getDoc(ref);
  const data = snap.data();
  await updateDoc(ref, {
    watched: data.watched + 1,
    caps:    data.caps + 1,
    balance: data.balance + 0.20
  });
  window.open("https://www.youtube.com/watch?v=ysz5S6PUM-U", "_blank");
});

// Admin login
adminLoginBtn?.addEventListener("click", async () => {
  try {
    await signInWithEmailAndPassword(auth, adminEmailEl.value, adminPassEl.value);
    if (auth.currentUser.email !== ADMIN_EMAIL) throw "Not admin";
    location.href = "admin-dashboard.html";
  } catch {
    alert("Invalid admin credentials");
  }
});

// Admin logout
adminLogoutBtn?.addEventListener("click", () => signOut(auth));
