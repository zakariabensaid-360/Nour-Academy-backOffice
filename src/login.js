const admin = JSON.parse(window.localStorage.getItem("admin"));
const Realpassword = admin.password;
const RealEmail = admin.email;
const submit = document.getElementById("login");

submit.addEventListener("click", (event) => {
event.preventDefault()
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;


  console.log(password, email);

  if (password !== Realpassword || email !== RealEmail) {
    alert("mote pass or email is not correct");
    return;
  }
  window.location.href = "/dashboard.html";
});


