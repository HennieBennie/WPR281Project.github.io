function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Hardcoded admin login
    const adminUsername = "admin";
    const adminPassword = "admin";

    if (username.toLowerCase() === adminUsername && password === adminPassword) {
        // Optional: mark user as logged in
        localStorage.setItem("isLoggedIn", "true");

        window.location.href = "index.html";
    }
    else {
        alert("Invalid username or password. Please try again.");
    } 
}

function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
}