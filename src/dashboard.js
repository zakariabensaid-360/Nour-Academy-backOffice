const info = document.getElementById("StudentsInfo");
const ModalBackground = document.getElementById("modal-background");
const ModalForm = document.getElementById("modal-form");
const TotalStudents = document.getElementById("total-students")
const TotalValid = document.getElementById("total-valid")
const TotalPays = document.getElementById("total-pays")
const TotalWait = document.getElementById("total-wait")
const TotalMoney = document.getElementById("total-money")
const filiereTelephone = document.getElementById("filiereTelephone")
 function renderCards() {

 }

function getStatusBadgeClass(status) {
  switch (status) {
    case "En attente":
      return "bg-amber-50 text-amber-700 border border-amber-200/50";
    case "Validées":
      return "bg-emerald-50 text-emerald-700 border border-emerald-200/50";
    case "Payées":
      return "bg-blue-50 text-blue-700 border border-blue-200/50";
    default:
      return;
  }
}
function countStatus() {
    let students = JSON.parse(window.localStorage.getItem("students")) || [];

  let valide = 0
  let payee = 0
  let wait = 0
  let totalmoney = 0

  for (let i = 0; i < students.length; i++) {
   totalmoney += students[i].totalPrice
    if(students[i].status == "En attente") {
wait++
    } else if(students[i].status == "Validées") {
valide++
    } else {
payee++
    }
    
  }

  return [wait, valide, payee, totalmoney]
  
}
function renderInfo() {
  let students = JSON.parse(window.localStorage.getItem("students")) || [];
  let statusCount = countStatus()
    TotalStudents.textContent = students.length 
    TotalWait.textContent = statusCount[0]
    TotalValid.textContent = statusCount[1]
    TotalPays.textContent = statusCount[2]
    TotalMoney.textContent = String(statusCount[3]) + " / MAD"
  info.innerHTML = "";
console.log("test")
  for (let i = 0; i < students.length; i++) {
    
    let student = students[i];
    if(!student.phone.startsWith(filiereTelephone.value)) continue;

    info.innerHTML += `
      <tr class="hover:bg-slate-50/50 transition">
        <td class="p-3.5 font-semibold text-slate-900">${student.id}</td>
        <td class="p-3.5 font-medium text-slate-800">${student.prenom} ${student.nom}</td>
        <td class="p-3.5 text-slate-600">${student.niveau}</td>
        <td class="p-3.5 text-slate-600">${student.filiere}</td>
        <td class="p-3.5 text-slate-500">${student.centre}</td> 
        <td class="p-3.5 text-slate-600">${student.phone}</td>           
        
      
        <td class="p-3.5">
          <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${getStatusBadgeClass(student.status)}">
            ${student.status}
          </span>
        </td>


        <td class="p-3.5">
          <div class="flex gap-2">
            <button onclick="Deleting('${student.id}')" class="bg-red-500 hover:bg-red-700 px-3 py-1 text-white rounded font-bold text-xs">Delete</button>
            <button onclick="Edit('${student.id}')" class="bg-blue-500 hover:bg-blue-700 px-3 py-1 text-white rounded font-bold text-xs">Edit</button>
          </div>
        </td>
      </tr>
    `;
  }
}

renderInfo();

function Deleting(id) {
  let students = JSON.parse(window.localStorage.getItem("students")) || [];
  let safeStudents = [];

  for (let i = 0; i < students.length; i++) {
    if (students[i].id != id) {
      safeStudents.push(students[i]);
    }
  }

  window.localStorage.setItem("students", JSON.stringify(safeStudents));
  renderInfo();
}

function Edit(id) {
  ModalBackground.classList.remove("hidden");
  ModalForm.classList.remove("hidden");
  ModalForm.innerHTML = "";
  ModalForm.innerHTML = `<div class="w-full max-w-xs mx-auto">
  <button id="close" class="block text-sm font-medium text-gray-700 mb-1.5">
   Click here to close
  </button>
  <select 
    name="status" 
    id="status" 
    class="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
  >
    <option value="" disabled selected class="text-gray-400">Select a status</option>
    <option value="En attente" class="text-black">En attente</option>
    <option value="Payées" class="text-black">Payées</option>
    <option value="Validées" class="text-black">Validées</option>
  </select>
</div>
`;


const statuss = document.getElementById("status")
const close  = document.getElementById("close")
statuss.addEventListener("change", () => {
 let students = JSON.parse(window.localStorage.getItem("students")) || [];
  function UpdateStatus(id, status) {
   let UpdateStudents = [];
   let student;
   for (let i = 0; i < students.length; i++) {
     student = students[i];
 
     if (student.id == id) {
       student.status = status;
       UpdateStudents.push(student);
       continue;
     }
     UpdateStudents.push(student);
   }
 
   window.localStorage.setItem("students", JSON.stringify(UpdateStudents))
 }

 UpdateStatus(id, statuss.value)
 renderInfo()
})

close.addEventListener("click", () => {
    ModalBackground.classList.add("hidden");
  ModalForm.classList.add("hidden");
  ModalForm.innerHTML = "";
})
}


filiereTelephone.addEventListener("input", () => {
  renderInfo()
})