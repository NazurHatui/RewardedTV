import { auth, db } from "./index.html";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import {
  doc, setDoc, getDoc,
  updateDoc, increment, collection, getDocs
} from "firebase/firestore";

const ui = {
  watchedElem: document.getElementById("watched"),
  earnedElem:  document.getElementById("earned"),
  capsElem:    document.getElementById("caps"),
  balanceElem: document.getElementById("balance"),
  emailInput:  document.getElementById("emailInput"),
  passInput:   document.getElementById("passwordInput"),
  watchBtn:    document.getElementById("watchBtn"),
  loginBtn:    document.getElementById("loginBtn"),
  registerBtn: document.getElementById("registerBtn"),
  logoutBtn:   document.getElementById("logoutBtn"),
};

async function register() {
  const email = ui.emailInput.value.trim();
  const pw    = ui.passInput.value;
  const cred  = await createUserWithEmailAndPassword(auth, email, pw);
  await setDoc(doc(db, "users", cred.user.uid), {
    email:   email,
    watched: 0,
    caps:    0,
    balance: 1000
  });
}

async function login() {
  const email = ui.emailInput.value.trim();
  const pw    = ui.passInput.value;
  const cred  = await signInWithEmailAndPassword(auth, email, pw);
  loadUserData(cred.user.uid);
}

async function logout() {
  await signOut(auth);
  ui.watchedElem.innerText = 0;
  ui.earnedElem.innerText  = "0.00";
  ui.capsElem.innerText    = 0;
  ui.balanceElem.innerText = "0.00";
}

async function loadUserData(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return;
  const data = snap.data();
  ui.watchedElem.innerText = data.watched;
  ui.earnedElem.innerText  = (data.watched * 20).toFixed(2);
  ui.capsElem.innerText    = data.caps;
  ui.balanceElem.innerText = data.balance.toFixed(2);
}

async function watchVideo() {
  const user = auth.currentUser;
  if (!user) return alert("Please log in first.");
  const ref = doc(db, "users", user.uid);
  await updateDoc(ref, {
    watched:  increment(1),
    caps:      increment(1),
    balance:   increment(20)
  });
  loadUserData(user.uid);
}

onAuthStateChanged(auth, user => {
  if (user) loadUserData(user.uid);
});

ui.registerBtn.onclick = register;
ui.loginBtn.onclick    = login;
ui.logoutBtn.onclick   = logout;
ui.watchBtn.onclick    = watchVideo;
