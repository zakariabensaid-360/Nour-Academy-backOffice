const info = document.getElementById("StudentsInfo");

function getStatusBadgeClass(status) {
  switch (status) {
    case "En attente": return "bg-amber-50 text-amber-700 border border-amber-200/50";
    case "Validées": return "bg-emerald-50 text-emerald-700 border border-emerald-200/50";
    case "Payées": return "bg-blue-50 text-blue-700 border border-blue-200/50";
    default: return;
  }
}

function renderInfo() {
  let students = JSON.parse(window.localStorage.getItem("students")) || [];
  info.innerHTML = "";

  for (let i = 0; i < students.length; i++) {
    let student = students[i];
    
    info.innerHTML += `
      <tr class="hover:bg-slate-50/50 transition">
        <td class="p-3.5 font-semibold text-slate-900">${student.id}</td>
        <td class="p-3.5 font-medium text-slate-800">${student.prenom} ${ student.nom}</td>
        <td class="p-3.5 text-slate-600">${student.niveau}</td>
        <td class="p-3.5 text-slate-600">${student.filiere}</td>
        <td class="p-3.5 text-slate-500">${student.centre}</td> 
        <td class="p-3.5 text-slate-600">${student.phone}</td>           
        
        <!-- Status Badge -->
        <td class="p-3.5">
          <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${getStatusBadgeClass(student.status)}">
            ${student.status}
          </span>
        </td>

        <!-- Actions -->
        <td class="p-3.5">
          <div class="flex gap-2">
            <button onclick="Deleting('${student.id}')" class="bg-red-500 hover:bg-red-700 px-3 py-1 text-white rounded font-bold text-xs">Delete</button>
            <button class="bg-blue-500 hover:bg-blue-700 px-3 py-1 text-white rounded font-bold text-xs">Edit</button>
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