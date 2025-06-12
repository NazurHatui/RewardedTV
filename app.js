// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAZJwv-o931FA_nRB68UiT7gHIuzx-e5rQ",
  authDomain: "rewardedtv-1e5b1.firebaseapp.com",
  projectId: "rewardedtv-1e5b1",
  storageBucket: "rewardedtv-1e5b1.firebasestorage.app",
  messagingSenderId: "188103901236",
  appId: "1:188103901236:web:4e968cbde9d01a03988a61",
  measurementId: "G-3W0Y6BTS35"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db   = firebase.firestore();

window.onload = () => {
  // Grab elements
  const emailIn   = document.getElementById("email");
  const passIn    = document.getElementById("password");
  const loginBtn  = document.getElementById("login-btn");
  const regBtn    = document.getElementById("register-btn");
  const logoutBtn = document.getElementById("logout-btn");

  console.log("🚀 Elements:", {
    email: emailIn, password: passIn,
    loginBtn, regBtn, logoutBtn
  });

  // Login
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      console.log("🔑 Login clicked");
      const email = emailIn.value.trim();
      const pw    = passIn.value;
      console.log("🔑 Credentials:", email, pw ? "[password]" : "[no password]");
      auth.signInWithEmailAndPassword(email, pw)
        .then(() => console.log("✅ signIn success"))
        .catch(e => console.error("❌ signIn error", e));
    });
  }

  // Register
  if (regBtn) {
    regBtn.addEventListener('click', () => {
      console.log("🔐 Register clicked");
      const email = emailIn.value.trim();
      const pw    = passIn.value;
      auth.createUserWithEmailAndPassword(email, pw)
        .then(({ user }) => {
          console.log("✅ createUser success:", user.uid);
          return db.collection("users").doc(user.uid).set({
            email:    user.email,
            watched:  0,
            caps:     0,
            balance:  0,
            boost:    0,
            helpers:  []
          });
        })
        .then(() => console.log("✅ Firestore user doc created"))
        .catch(e => console.error("❌ register error", e));
    });
  }

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      console.log("🚪 Logout clicked");
      auth.signOut();
    });
  }
};
