

 export  function phoneValidation(phoneInput, telErr, subbtn) {
    phoneInput.addEventListener("blur", function () {
  const phonePattern = /^(\+|\d{2})\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,4}$/;
  if (phonePattern.test(this.value)) {
    this.style.borderColor = "green";
    subbtn.disabled = false;
    telErr.textContent = "";
  } else {
    this.style.borderColor = "red";
    telErr.textContent = "please entre a valid phone number";
    subbtn.disabled = true;
  }
});
}