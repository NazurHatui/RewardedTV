
function showAdminLogin() {
  const username = prompt("Enter Admin Username:");
  const password = prompt("Enter Admin Password:");
  if (username === "Admin" && password === "Admin123") {
    alert("Access granted to Admin Panel (demo)");
    // logic for showing admin UI can go here
  } else {
    alert("Invalid credentials");
  }
}
