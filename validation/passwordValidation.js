function passwordValidation(passwordInput, passwordError) {
  passwordInput.addEventListener("blur", () => {
    const password = passwordInput.value;
    if (password.length < 10) {
      passwordInput.style.borderColor = "red";
      passwordError.textContent = "Password must be at least 10 characters long.";
    } else {
      passwordInput.style.borderColor = "green";
      passwordError.textContent = "";
    }
  });
}
