// Check if the user is logged in, and if so, display a welcome message
const currentUser = localStorage.getItem("currentUser");
if (currentUser) {
    document.getElementById("welcomeMessage").textContent = `Welcome, ${currentUser}!`;
} else {
    // If not logged in, redirect to the login page
    window.location.href = "login.html";
}

// Function to open a specific tab and hide others
function openTab(tabName) {
    const tabs = document.getElementsByClassName("tab");
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
    }

    document.getElementById(tabName).classList.add("active");
}

// Logout functionality
document.getElementById("logoutBtn").addEventListener("click", function() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
});


// // check health functionality
// document.getElementById("healthCheckForm").addEventListener("submit", function(event) {
//     event.preventDefault();

//     const bloodPressure = document.getElementById("bloodPressure").value.trim();
//     const heartRate = document.getElementById("heartRate").value.trim();
//     const temperature = document.getElementById("temperature").value.trim();

//     // Your health check logic here...
//     // You can implement the checks and display results based on the user's input.
//     // For this demonstration, let's just show a basic message indicating successful submission.

//     document.getElementById("healthCheckResult").textContent = "Health data submitted successfully!";
// });
