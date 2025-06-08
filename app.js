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
const db = firebase.firestore();

// Elements
const emailIn = document.getElementById("email");
const passIn  = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const regBtn   = document.getElementById("register-btn");
const logoutBtn= document.getElementById("logout-btn");

// Register
regBtn.onclick = () => {
  const email = emailIn.value.trim();
  const pw = passIn.value;
  auth.createUserWithEmailAndPassword(email, pw)
    .then(({ user }) => {
      return db.collection("users").doc(user.uid).set({
        email: user.email,
        watched: 0,
        caps: 0,
        balance: 0
      });
    })
    .then(() => alert("✅ Registered!"))
    .catch(e => alert("❌ Register failed: " + e.message));
};

// Login
loginBtn.onclick = () => {
  const email = emailIn.value.trim();
  const pw = passIn.value;
  auth.signInWithEmailAndPassword(email, pw)
    .then(() => alert("✅ Logged in!"))
    .catch(e => alert("❌ Login failed: " + e.message));
};

// Logout
logoutBtn.onclick = () => auth.signOut();

// Auth state change
auth.onAuthStateChanged(user => {
  if (user) {
    db.collection("users").doc(user.uid).get()
      .then(doc => {
        const d = doc.data();
        document.getElementById("watched").innerText = d.watched;
        document.getElementById("earned").innerText  = (d.watched * 1).toFixed(2);
        document.getElementById("caps").innerText    = d.caps;
        document.getElementById("balance").innerText= `$${d.balance.toFixed(2)}`;
      })
      .catch(console.error);
  } else {
    document.getElementById("watched").innerText = 0;
    document.getElementById("earned").innerText  = "0.00";
    document.getElementById("caps").innerText    = 0;
    document.getElementById("balance").innerText= "$0.00";
  }
});

// Watch video logic (random links)
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
  // increment watched and caps
  const docRef = db.collection("users").doc(user.uid);
  db.runTransaction(tx => {
    return tx.get(docRef).then(doc => {
      const data = doc.data();
      tx.update(docRef, {
        watched: data.watched + 1,
        caps: data.caps + 1
      });
    });
  });
  window.open(url, "_blank");
}


firebase.auth().onAuthStateChanged(user => {
  if (!user) return;
  const ref = firebase.firestore().collection("users").doc(user.uid);
  ref.onSnapshot(doc => {
    const d = doc.data() || {};
    document.getElementById("watched").innerText = d.watched || 0;
    document.getElementById("earned").innerText  = ((d.watched || 0) * 1).toFixed(2);
    document.getElementById("caps").innerText    = ((d.watched || 0) * 0.1).toFixed(1);
    document.getElementById("balance").innerText = "$" + (d.balance || 0).toFixed(2);
  });
});
