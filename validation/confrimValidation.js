function confirmValidation(confirmInput, conformError) {
  confirmInput.addEventListener("blur", () => {
    const password = passwordInput.value;
    const confirmPassword = confirmInput.value;
    if (password !== confirmPassword) {
      confirmInput.style.borderColor = "red";
      conformError.textContent = "Passwords do not match.";
    } else {
      confirmInput.style.borderColor = "green";
      conformError.textContent = "";
    }
  });
}
