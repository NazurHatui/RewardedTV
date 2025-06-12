// Initialize Firebase (only here)
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
  const emailIn    = document.getElementById("email");
  const passIn     = document.getElementById("password");
  const loginBtn   = document.getElementById("login-btn");
  const regBtn     = document.getElementById("register-btn");
  const logoutBtn  = document.getElementById("logout-btn");

  // Debug
  console.log("🔧 LoginBtn:", loginBtn, "RegBtn:", regBtn, "LogoutBtn:", logoutBtn);

  // Register
  if (regBtn) {
    regBtn.onclick = () => {
      const email = emailIn.value.trim();
      const pw    = passIn.value;
      auth.createUserWithEmailAndPassword(email, pw)
        .then(({ user }) =>
          db.collection("users").doc(user.uid).set({
            email:   user.email,
            watched: 0,
            caps:    0,
            balance: 0,
            boost:   0,
            helpers: []
          })
        )
        .then(() => alert("✅ Registered!"))
        .catch(e => alert("❌ Register failed: " + e.message));
    };
  }

  // Login
  if (loginBtn) {
    loginBtn.onclick = () => {
      const email = emailIn.value.trim();
      const pw    = passIn.value;
      auth.signInWithEmailAndPassword(email, pw)
        .then(() => alert("✅ Logged in!"))
        .catch(e => alert("❌ Login failed: " + e.message));
    };
  }

  // Logout
  if (logoutBtn) {
    logoutBtn.onclick = () => auth.signOut();
  }

  // Fetch initial data
  auth.onAuthStateChanged(user => {
    if (user) {
      db.collection("users").doc(user.uid).get()
        .then(doc => {
          const d = doc.data() || {};
          document.getElementById("watched").innerText      = d.watched  || 0;
          document.getElementById("earned").innerText       = (d.watched   || 0).toFixed(2);
          document.getElementById("caps").innerText         = d.caps      || 0;
          document.getElementById("balance").innerText      = (d.balance   || 0).toFixed(2);
          document.getElementById("boost").innerText        = (d.boost     || 0) + "%";
          document.getElementById("helpersCount").innerText = (d.helpers   || []).length;
        })
        .catch(console.error);
    } else {
      document.getElementById("watched").innerText      = 0;
      document.getElementById("earned").innerText       = "0.00";
      document.getElementById("caps").innerText         = 0;
      document.getElementById("balance").innerText      = "0.00";
      document.getElementById("boost").innerText        = "0%";
      document.getElementById("helpersCount").innerText = 0;
    }
  });

  // Watch video
  function watchVideo() {
    const user = auth.currentUser;
    if (!user) return alert("Please log in first.");
    const links = [
      "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "https://www.youtube.com/watch?v=oHg5SJYRHA0",
      "https://www.youtube.com/watch?v=jNQXAC9IVRw"
    ];
    const url = links[Math.floor(Math.random() * links.length)];
    const docRef = db.collection("users").doc(user.uid);
    db.runTransaction(tx =>
      tx.get(docRef).then(doc => {
        const data = doc.data();
        tx.update(docRef, {
          watched: data.watched + 1,
          caps:    data.caps    + 1
        });
      })
    );
    window.open(url, "_blank");
  }
  window.watchVideo = watchVideo;

  // Real-time updates
  auth.onAuthStateChanged(user => {
    if (!user) return;
    const ref = db.collection("users").doc(user.uid);
    ref.onSnapshot(doc => {
      const d = doc.data() || {};
      document.getElementById("watched").innerText      = d.watched  || 0;
      document.getElementById("earned").innerText       = (d.watched   || 0).toFixed(2);
      document.getElementById("caps").innerText         = ((d.watched || 0) * 0.1).toFixed(1);
      document.getElementById("balance").innerText      = (d.balance   || 0).toFixed(2);
      document.getElementById("boost").innerText        = (d.boost     || 0) + "%";
      document.getElementById("helpersCount").innerText = (d.helpers   || []).length;
    });
  });
};
