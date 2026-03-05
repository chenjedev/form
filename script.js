// =========================
// Element References
// Cache all form and message elements once for reuse.
// =========================
const form = document.getElementById("signup");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("passwordconfirm");
const successText = document.getElementById("successText");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmError");

// =========================
// Validation Rules (Regex)
// =========================
// Basic email format: text@text.domain
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Strong password: 8+ chars with upper, lower, number, and symbol
const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

// =========================
// UI Helper Functions
// =========================
// Remove invalid styling and clear error message for one field.
function clearError(input, errorEl) {
    input.classList.remove("invalid");
    errorEl.textContent = "";
}

// Apply invalid styling and show a custom error message.
function showError(input, errorEl, message) {
    input.classList.add("invalid");
    errorEl.textContent = message;
}

// =========================
// Field Validation Functions
// Each function returns true (valid) or false (invalid).
// =========================
function validateName() {
    const value = nameInput.value.trim();
    if (value.length < 3) {
        showError(nameInput, nameError, "Enter at least 3 characters.");
        return false;
    }
    clearError(nameInput, nameError);
    return true;
}

function validateEmail() {
    const value = emailInput.value.trim();
    if (!emailPattern.test(value)) {
        showError(emailInput, emailError, "Enter a valid email address.");
        return false;
    }
    clearError(emailInput, emailError);
    return true;
}

function validatePassword() {
    const value = passwordInput.value;
    if (!strongPasswordPattern.test(value)) {
        showError(passwordInput, passwordError, "Password is not strong enough.");
        return false;
    }
    clearError(passwordInput, passwordError);
    return true;
}

function validateConfirmPassword() {
    if (confirmInput.value !== passwordInput.value || !confirmInput.value) {
        showError(confirmInput, confirmError, "Passwords do not match.");
        return false;
    }
    clearError(confirmInput, confirmError);
    return true;
}

// =========================
// Live Validation Events
// Validate fields while user types.
// =========================
nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", () => {
    validatePassword();
    // Re-check confirm field if user already typed in it.
    if (confirmInput.value) validateConfirmPassword();
});
confirmInput.addEventListener("input", validateConfirmPassword);

// =========================
// Form Submit Handler
// Prevent default submit, validate all fields, then show success.
// =========================
form.addEventListener("submit", (event) => {
    event.preventDefault();
    successText.textContent = "";

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmValid = validateConfirmPassword();

    if (isNameValid && isEmailValid && isPasswordValid && isConfirmValid) {
        successText.textContent = "Success! Your account has been created.";
        form.reset();
    }
});
