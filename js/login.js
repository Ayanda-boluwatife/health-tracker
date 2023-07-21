document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    // Basic validation checks
    if (!username || !password) {
        alert("Please enter your username and password.");
        return;
    }

    // Get the list of existing users from local storage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find the user with the provided username
    const user = users.find(user => user.username === username);

    if (user) {
        // Convert the salt to Uint8Array from the hexadecimal string
        const salt = new Uint8Array(user.password.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

        // Derive the key from the password and salt
        const key = await deriveKeyFromPassword(password, salt);

        try {
            // Decrypt the stored email using AES-GCM
            const decryptedEmail = await decryptData(user.email.encryptedData, user.email.iv, key);

            // Compare the decrypted email with the input email
            if (decryptedEmail === document.getElementById("email").value.trim()) {
                // If the email matches, login is successful
                localStorage.setItem("currentUser", username);
                alert("Login successful! Welcome, " + username + "!");
                window.location.href = "index.html"; // Redirect to the index page after successful login
            } else {
                alert("Invalid credentials. Please try again.");
            }
        } catch (error) {
            console.error("Error during decryption:", error);
            alert("Invalid credentials. Please try again.");
        }
    } else {
        alert("Invalid credentials. Please try again.");
    }
});
