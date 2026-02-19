const usernameInput = document.getElementById("username");
const feedback = document.getElementById("feedback");
const form = document.getElementById("registerForm");

let isAvailable = false;
let debounceTimer;

// Store newly registered usernames
let registeredUsers = [];

usernameInput.addEventListener("input", function () {

    clearTimeout(debounceTimer);

    const username = usernameInput.value.trim();

    if (username === "") {
        feedback.innerHTML = "";
        return;
    }

    debounceTimer = setTimeout(() => {
        checkUsername(username);
    }, 500);
});

function checkUsername(username) {

    feedback.innerHTML = "<span class='loading'>Checking...</span>";

    fetch("users.json")
        .then(response => response.json())
        .then(data => {

            // Combine JSON users + newly registered users
            const allUsers = [
                ...data.map(u => u.username.toLowerCase()),
                ...registeredUsers.map(u => u.toLowerCase())
            ];

            const exists = allUsers.includes(username.toLowerCase());

            if (exists) {
                feedback.innerHTML = "<span class='error'>Username already taken ❌</span>";
                isAvailable = false;
            } else {
                feedback.innerHTML = "<span class='success'>Username available ✅</span>";
                isAvailable = true;
            }
        })
        .catch(() => {
            feedback.innerHTML = "<span class='error'>Error checking username</span>";
        });
}

form.addEventListener("submit", function (e) {

    if (!isAvailable) {
        e.preventDefault();
        feedback.innerHTML = "<span class='error'>Please choose another username</span>";
    } else {
        e.preventDefault(); // prevent actual submission (since no backend)

        // Add username to registered list
        const newUser = usernameInput.value.trim();
        registeredUsers.push(newUser);

        feedback.innerHTML = "<span class='success'>Registration successful 🎉</span>";

        usernameInput.value = "";
        isAvailable = false;
    }
});
