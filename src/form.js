/* getting the elements */ 
const phoneInput = document.getElementById("phone");
const submitButton = document.getElementById("sub");
const form = document.querySelector("form");
const telErr = document.getElementById("tel-error");
const passwordError = document.getElementById("password-error");
const conformError = document.getElementById("confirm-error")
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm");
import { DisplayCartItems } from "../components/DisplayCartItems.js";
import { phoneValidation } from "../validation/phoneValidate.js";
import { confirmValidation } from "../validation/confrimValidation.js";
import { passwordValidation } from "../validation/passwordValidation.js";
import { duplicateValidation } from "../validation/duplicateValidation.js";


/* import CartItems from localeStorage */
const items = JSON.parse(window.localStorage.getItem("CartItems"))


/*  validation */
phoneValidation(phoneInput, telErr, submitButton)
passwordValidation(passwordInput, passwordError)
confirmValidation(confirmInput, conformError, passwordInput)

/* getting the courses from the cart  &&  calculate the total */
let TotalPriceElement = document.getElementById("total-price");
let CartSection = document.getElementById("section-cart");

/* displaying items from localestorage to html */
DisplayCartItems(CartSection, TotalPriceElement, items)

/* action final */ 
submitButton.addEventListener("click", (event) => {
 /* checking is the form is valid */
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  event.preventDefault();
  const students = JSON.parse(window.localStorage.getItem("students"))
  const prenomVal = document.getElementById("prenom").value;
  const nomVal = document.getElementById("nom").value;
  const dobVal = document.getElementById("dob").value;
  const etablissementVal = document.getElementById("etablissement").value;
  const niveauVal = document.getElementById("niveau").value;
  const centreVal = document.getElementById("centre").value;
  const filiereVal = document.getElementById("filiere").value;
  const parentNomVal = document.getElementById("parent_nom").value;
  const parentLienVal = document.getElementById("parent_lien").value;
  const parentEmailVal = document.getElementById("parent_email").value;

if(duplicateValidation(phoneInput.value)) {
 console.log("test")
  alert("this phone number already exiss")
  return;
}

let CourseID = []

for (let i = 0; i < items.length; i++) {
  CourseID.push(items[i].id)
  
}
console.log(TotalPriceElement.textContent)
  const data = {
    id: "NA-" + String(crypto.randomUUID().split("-")[0]).toLocaleUpperCase(),
    prenom: prenomVal,
    nom: nomVal,
    date: dobVal,
    etablissement: etablissementVal,
    niveau: niveauVal,
    centre: centreVal,
    filiere: filiereVal,
    parentNom: parentNomVal,
    parentLien: parentLienVal,
    parentEmail: parentEmailVal,
    phone: phoneInput.value,
    CourseID: CourseID,
    totalPrice: Number(TotalPriceElement.textContent.split(" ")[0]),
    status: "En attente"
  }


  let courses = JSON.parse(window.localStorage.getItem("courses"));
  let allID = [];

  for (let i = 0; i < students.length; i++) {
    for (let j = 0; j < students[i].CourseID.length; j++) {
      allID.push(students[i].CourseID[j]);
    }
  }


  for(let i = 0; i < courses.length; i++) {
    for(let j = 0; j < allID.length; j++) {
      if(courses[i].id == allID[j]) {
        courses[i].remainingSeats -= 1
      }
    }
  }

  window.localStorage.setItem("courses", JSON.stringify(courses))

  /* CREATE STUDENT */ 

students.push(data)
window.localStorage.setItem("students", JSON.stringify(students))
alert("your forb has been submited  !");

});