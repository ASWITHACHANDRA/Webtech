const form = document.getElementById('regForm');
const roleSelect = document.getElementById('role');
const skillsContainer = document.getElementById('skillsContainer');

// 1. DOM Manipulation: Show/Hide fields based on role 
roleSelect.addEventListener('change', () => {
    if (roleSelect.value === 'Admin') {
        skillsContainer.classList.add('hidden');
    } else {
        skillsContainer.classList.remove('hidden');
    }
});

// 2. Helper function to manage validation UI [cite: 15, 16]
function updateUI(element, errorId, isValid) {
    const errorSpan = document.getElementById(errorId);
    if (isValid) {
        element.classList.remove('invalid');
        element.classList.add('valid');
        errorSpan.style.display = 'none';
    } else {
        element.classList.remove('valid');
        element.classList.add('invalid');
        errorSpan.style.display = 'block';
    }
    return isValid;
}

// 3. Email Domain Validation [cite: 14]
function validateEmail(email) {
    const allowedDomains = ['.com', '.in', '.edu', '.ac.in'];
    return allowedDomains.some(domain => email.toLowerCase().endsWith(domain)) && email.includes('@');
}

// 4. Role-based Password Strength [cite: 13, 14]
function validatePassword(pass, role) {
    if (role === 'Admin') {
        // Admin: Min 10 chars, 1 number, 1 special char
        return pass.length >= 10 && /[0-9]/.test(pass) && /[^A-Za-z0-9]/.test(pass);
    }
    // Student/Teacher: Min 6 chars
    return pass.length >= 6;
}

// 5. Submit Handler with validation logic [cite: 17]
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const age = document.getElementById('age');
    const pwd = document.getElementById('password');
    const cpwd = document.getElementById('confirmPassword');
    const role = roleSelect.value;

    let isFormValid = true;

    // Execute all validations
    if (!updateUI(name, 'nameError', name.value.trim() !== "")) isFormValid = false;
    if (!updateUI(email, 'emailError', validateEmail(email.value))) isFormValid = false;
    if (!updateUI(age, 'ageError', age.value >= 18)) isFormValid = false;
    if (!updateUI(pwd, 'passwordError', validatePassword(pwd.value, role))) isFormValid = false;
    if (!updateUI(cpwd, 'confirmError', cpwd.value === pwd.value && cpwd.value !== "")) isFormValid = false;

    if (isFormValid) {
        alert("Form submitted successfully for role: " + role);
        form.reset();
        // Reset styles
        document.querySelectorAll('input').forEach(i => i.classList.remove('valid'));
    }
});