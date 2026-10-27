const admin = JSON.parse(window.localStorage.getItem("admin"))
const Realpassword = admin.password
const RealEmail = admin.email
const submit = document.getElementById("login")
const email = document.getElementById("email").value
const password = document.getElementById("password").value


submit.addEventListener("click", (event) => {
    event.preventDefault()

    if(password !== Realpassword || email !== RealEmail) {
        alert("mote pass or email is not correct")
        return;
    }


      window.location.href = "/dashboard.html"
})




