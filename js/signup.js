document.getElementById("signupForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Basic validation checks
    if (!firstName || !lastName || !email || !username || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Generate a random salt for password hashing
    const salt = await generateSalt();

    // Derive the key from the password and salt
    const key = await deriveKeyFromPassword(password, salt);

    // Encrypt the data before storing it
    const encryptedFirstName = await encryptData(firstName, key);
    const encryptedLastName = await encryptData(lastName, key);
    const encryptedEmail = await encryptData(email, key);

    // Get the list of existing users or create an empty array if it doesn't exist
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the username already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        alert("Username already exists. Please choose a different username.");
        return;
    }

    // Convert the salt to a hexadecimal string for storage
    const saltHex = Array.from(new Uint8Array(salt))
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");

    // Add the new user to the list
    users.push({
        firstName: encryptedFirstName,
        lastName: encryptedLastName,
        email: encryptedEmail,
        username,
        password: saltHex, // Store the salt as part of the user data
    });

    // Save the updated list of users to local storage
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! Please login with your credentials.");
    window.location.href = "login.html";
});
