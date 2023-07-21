// Helper function to generate a random salt using Web Crypto API
async function generateSalt() {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return array;
}

// Helper function to derive a key from the password and salt
async function deriveKeyFromPassword(password, salt) {
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);

    const importedKey = await window.crypto.subtle.importKey(
        "raw",
        passwordBuffer,
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    );

    return window.crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: salt,
            iterations: 100000,
            hash: "SHA-256",
        },
        importedKey,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
}

// Helper function to encrypt data using AES-GCM
async function encryptData(data, key) {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);

    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encryptedData = await window.crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, dataBuffer);

    return { encryptedData, iv };
}

// Helper function to decrypt data using AES-GCM
async function decryptData(encryptedData, iv, key) {
    const decryptedData = await window.crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, encryptedData);

    const decoder = new TextDecoder();
    return decoder.decode(decryptedData);
}
