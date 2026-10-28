

 export  function phoneValidation(phoneInput, telErr) {
    phoneInput.addEventListener("blur", function () {
  const phonePattern = /^\+?[0-9]{8,15}$/;
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