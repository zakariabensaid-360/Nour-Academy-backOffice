const page = document.getElementById("page")

function Board() {
  page.innerHTML = `
    <header class="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shadow-xs sticky top-0 z-10">
      <div class="flex items-center gap-3">
        <span class="text-xs uppercase tracking-wider font-bold text-slate-400">Centre :</span>
        <select name="centre" id="centre" class="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition">
          <option value="massira">Centre Al Massira</option>
          <option value="nador" selected>Nador Centre</option>
          <option value="selouane">Selouane</option>
        </select>
      </div>

      <div class="flex items-center gap-3 pl-4 border-l border-slate-200">
        <div class="h-10 w-10 rounded-full bg-cyan-100 text-cyan-700 font-bold flex items-center justify-center shadow-inner">K</div>
        <div class="text-sm">
          <p class="font-bold text-slate-800">Khadija</p>
          <p class="text-xs text-slate-500">Secrétaire</p>
        </div>
        <span class="text-slate-400 ml-1">▾</span>
      </div>
    </header>

    <main class="flex-1 p-8 space-y-8 max-w-7xl w-full mx-auto">
      <div class="flex flex-col gap-1">
        <h2 class="text-2xl font-black text-slate-900 tracking-tight">Tableau de bord</h2>
        <p class="text-sm text-slate-500">Vue d'ensemble de votre centre et des inscriptions récentes.</p>
      </div>

      <section class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-5">
        <article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition">
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-slate-500">Total des inscrits</p>
          </div>
          <p id="total-students" class="mt-4 text-3xl font-extrabold text-slate-900">124</p>
        </article>

        <article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition">
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-slate-500">En attente</p>
          </div>
          <p id="total-wait" class="mt-4 text-3xl font-extrabold text-amber-600">28</p>
        </article>

        <article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition">
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-slate-500">Validées</p>
          </div>
          <p id="total-valid" class="mt-4 text-3xl font-extrabold text-emerald-600">72</p>
        </article>

        <article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition">
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-slate-500">Payées</p>
          </div>
          <p id="total-pays" class="mt-4 text-3xl font-extrabold text-cyan-600">24</p>
        </article>

        <article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition">
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-slate-500">Money</p>
          </div>
          <p id="total-money" class="mt-4 text-3xl font-extrabold text-red-600">24</p>
        </article>
      </section>

      <section>
        <div class="flex flex-col gap-3 mb-3 sm:flex-row">
          <select id="filiereNiveau" class="border border-slate-200 rounded-lg p-3 bg-white">
            <option value="">All Levels</option>
            <option value="1ère Bac">1ère Bac</option>
            <option value="2ème Bac">2ème Bac</option>
            <option value="Primaire">Primaire</option>
            <option value="Collège">Collège</option>
          </select>

          <input type="text" id="filiereTelephone" placeholder="Rechercher par telephone" class="border border-slate-200 rounded-lg p-3 flex-1" />
        </div>
      </section>

      <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs relative overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-bold text-slate-900">Dernières inscriptions</h3>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full min-w-[800px] text-left text-sm">
            <thead class="bg-slate-50 text-slate-500 uppercase tracking-wider text-xs font-semibold">
              <tr>
                <th class="p-3.5 rounded-l-xl">N° dossier</th>
                <th class="p-3.5">Élève</th>
                <th class="p-3.5">Niveau</th>
                <th class="p-3.5">Cours</th>
                <th class="p-3.5">Centre</th>
                <th class="p-3.5">Phone</th>
                <th class="p-3.5">Statut</th>
                <th class="p-3.5">Settings</th>
              </tr>
            </thead>
            <tbody id="StudentsInfo" class="divide-y divide-slate-100"></tbody>
          </table>
        </div>
      </section>

      <div id="modal-background" class="w-full h-full bg-black absolute z-11 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25 hidden"></div>
      <div id="modal-form" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white p-4 z-12 hidden"></div>
    </main>
  `;

  const info = document.getElementById("StudentsInfo");
  const ModalBackground = document.getElementById("modal-background");
  const ModalForm = document.getElementById("modal-form");
  const TotalStudents = document.getElementById("total-students");
  const TotalValid = document.getElementById("total-valid");
  const TotalPays = document.getElementById("total-pays");
  const TotalWait = document.getElementById("total-wait");
  const TotalMoney = document.getElementById("total-money");
  const filiereTelephone = document.getElementById("filiereTelephone");

  function getStatusBadgeClass(status) {
    switch (status) {
      case "En attente":
        return "bg-amber-50 text-amber-700 border border-amber-200/50";
      case "Validées":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200/50";
      case "Payées":
        return "bg-blue-50 text-blue-700 border border-blue-200/50";
      default:
        return "";
    }
  }

  function countStatus() {
    let students = JSON.parse(window.localStorage.getItem("students")) || [];
    let valide = 0;
    let payee = 0;
    let wait = 0;
    let totalmoney = 0;

    for (let i = 0; i < students.length; i++) {
      totalmoney += students[i].totalPrice || 0;
      if (students[i].status == "En attente") {
        wait++;
      } else if (students[i].status == "Validées") {
        valide++;
      } else {
        payee++;
      }
    }
    return [wait, valide, payee, totalmoney];
  }

  function renderInfo() {
    let students = JSON.parse(window.localStorage.getItem("students")) || [];
    let statusCount = countStatus();
    TotalStudents.textContent = students.length;
    TotalWait.textContent = statusCount[0];
    TotalValid.textContent = statusCount[1];
    TotalPays.textContent = statusCount[2];
    TotalMoney.textContent = String(statusCount[3]) + " / MAD";
    
    info.innerHTML = "";
    
    for (let i = 0; i < students.length; i++) {
      let student = students[i];
      if (filiereTelephone.value && !student.phone.startsWith(filiereTelephone.value)) continue;

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
              <button onclick="window.Deleting('${student.id}')" class="bg-red-500 hover:bg-red-700 px-3 py-1 text-white rounded font-bold text-xs">Delete</button>
              <button onclick="window.Edit('${student.id}')" class="bg-blue-500 hover:bg-blue-700 px-3 py-1 text-white rounded font-bold text-xs">Edit</button>
            </div>
          </td>
        </tr>
      `;
    }
  }

  window.Deleting = function(id) {
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

  window.Edit = function(id) {
    ModalBackground.classList.remove("hidden");
    ModalForm.classList.remove("hidden");
    ModalForm.innerHTML = `
      <div class="w-full max-w-xs mx-auto">
        <button id="close" class="block text-sm font-medium text-white mb-1.5 underline cursor-pointer">
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

    const statuss = document.getElementById("status");
    const close = document.getElementById("close");

    statuss.addEventListener("change", () => {
      let students = JSON.parse(window.localStorage.getItem("students")) || [];
      let UpdateStudents = [];
      
      for (let i = 0; i < students.length; i++) {
        let student = students[i];
        if (student.id == id) {
          student.status = statuss.value;
        }
        UpdateStudents.push(student);
      }

      window.localStorage.setItem("students", JSON.stringify(UpdateStudents));
      renderInfo();
    });

    close.addEventListener("click", () => {
      ModalBackground.classList.add("hidden");
      ModalForm.classList.add("hidden");
      ModalForm.innerHTML = "";
    });
  }

  filiereTelephone.addEventListener("input", () => {
    renderInfo();
  });

  renderInfo();
}

Board();

const boardPage = document.getElementById("BoardPage");
const formPage = document.getElementById("FormPage");
const classPage = document.getElementById("ClassPage")

boardPage.addEventListener("click", () => {
  Board();
});

formPage.addEventListener("click", () => {
  page.innerHTML = `
    <main class="py-8 px-4">
      <div class="w-full max-w-5xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100">
        
        <div class="mb-8 border-b border-slate-100 pb-6">
          <h2 class="text-2xl font-black text-slate-900 tracking-tight">Formulaire d'inscription</h2>
          <p class="text-sm text-slate-500 mt-1">Remplissez les informations ci-dessous pour inscrire l'élève à l'académie.</p>
        </div>

        <form id="registration-form" class="space-y-10">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            
            <div class="space-y-5">
              <div class="flex items-center gap-3">
                <span class="flex items-center justify-center w-8 h-8 rounded-xl bg-cyan-50 text-cyan-700 font-bold text-sm shadow-inner">
                  01
                </span>
                <h3 class="text-lg font-bold text-slate-900">Informations de l'élève</h3>
              </div>

              <div>
                <label for="prenom" class="block text-sm font-bold text-slate-700 mb-1.5">
                  Prénom <span class="text-cyan-600">*</span>
                </label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  placeholder="Yasmine"
                  required
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition text-slate-800 placeholder-slate-400"
                />
              </div>

              <div>
                <label for="nom" class="block text-sm font-bold text-slate-700 mb-1.5">
                  Nom <span class="text-cyan-600">*</span>
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  placeholder="El Amrani"
                  required
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition text-slate-800 placeholder-slate-400"
                />
              </div>

              <div>
                <label for="dob" class="block text-sm font-bold text-slate-700 mb-1.5">
                  Date de naissance <span class="text-cyan-600">*</span>
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  required
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition text-slate-800 bg-white"
                />
              </div>

              <div>
                <label for="etablissement" class="block text-sm font-bold text-slate-700 mb-1.5">
                  Établissement scolaire <span class="text-cyan-600">*</span>
                </label>
                <input
                  type="text"
                  id="etablissement"
                  name="etablissement"
                  placeholder="Lycée Abdelkrim El Khattabi"
                  required
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition text-slate-800 placeholder-slate-400"
                />
              </div>

              <div>
                <label for="niveau" class="block text-sm font-bold text-slate-700 mb-1.5">
                  Niveau scolaire <span class="text-cyan-600">*</span>
                </label>
                <select
                  id="niveau"
                  name="niveau"
                  required
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition text-slate-800 bg-white"
                >
                  <option value="" disabled selected>Sélectionner un niveau</option>
                  <option value="1ere Bac">1ère Bac</option>
                  <option value="2eme Bac">2ème Bac</option>
                  <option value="Tronc Commun">Tronc Commun</option>
                </select>
              </div>

              <div>
                <label for="centre" class="block text-sm font-bold text-slate-700 mb-1.5">
                  Centre souhaité <span class="text-cyan-600">*</span>
                </label>
                <select
                  id="centre"
                  name="centre"
                  required
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition text-slate-800 bg-white"
                >
                  <option value="" disabled selected>Sélectionner un centre</option>
                  <option value="Nador">Nador</option>
                  <option value="Oujda">Oujda</option>
                  <option value="Berkane">Berkane</option>
                </select>
              </div>

              <div>
                <label for="filiere" class="block text-sm font-bold text-slate-700 mb-1.5">
                  Filière
                </label>
                <select
                  id="filiere"
                  name="filiere"
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition text-slate-800 bg-white"
                >
                  <option value="" disabled selected>Sélectionner une filière</option>
                  <option value="Sciences physiques">Sciences physiques</option>
                  <option value="Sciences mathématiques">Sciences mathématiques</option>
                  <option value="SVT">SVT</option>
                </select>
              </div>
            </div>

            <div class="space-y-5">
              <div class="flex items-center gap-3">
                <span class="flex items-center justify-center w-8 h-8 rounded-xl bg-cyan-50 text-cyan-700 font-bold text-sm shadow-inner">
                  02
                </span>
                <h3 class="text-lg font-bold text-slate-900">Parent ou responsable</h3>
              </div>

              <div>
                <label for="parent_nom" class="block text-sm font-bold text-slate-700 mb-1.5">
                  Nom complet <span class="text-cyan-600">*</span>
                </label>
                <input
                  type="text"
                  id="parent_nom"
                  name="parent_nom"
                  placeholder="Samira El Amrani"
                  required
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition text-slate-800 placeholder-slate-400"
                />
              </div>

              <div>
                <label for="parent_lien" class="block text-sm font-bold text-slate-700 mb-1.5">
                  Lien avec l'élève <span class="text-cyan-600">*</span>
                </label>
                <select
                  id="parent_lien"
                  name="parent_lien"
                  required
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition text-slate-800 bg-white"
                >
                  <option value="" disabled>Sélectionner un lien</option>
                  <option value="Mère" selected>Mère</option>
                  <option value="Père">Père</option>
                  <option value="Tuteur légal">Tuteur légal</option>
                </select>
              </div>

              <div>
                <label for="phone" class="block text-sm font-bold text-slate-700 mb-1.5">
                  Téléphone mobile <span class="text-cyan-600">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  maxlength="10"
                  placeholder="0612345678"
                  required
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition text-slate-800"
                />
                <span id="tel-error" class="text-xs text-red-500 mt-1 block font-medium"></span>
              </div>

              <div>
                <label for="password" class="block text-sm font-bold text-slate-700 mb-1.5">
                  Mot de passe <span class="text-cyan-600">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition text-slate-800"
                />
                <span id="password-error" class="text-xs text-red-500 mt-1 block font-medium"></span>
              </div>

              <div>
                <label for="confirm" class="block text-sm font-bold text-slate-700 mb-1.5">
                  Confirmer le mot de passe <span class="text-cyan-600">*</span>
                </label>
                <input
                  type="password"
                  id="confirm"
                  name="confirm"
                  placeholder="••••••••"
                  required
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition text-slate-800"
                />
                <span id="confirm-error" class="text-xs text-red-500 mt-1 block font-medium"></span>
              </div>

              <div>
                <label for="parent_email" class="block text-sm font-bold text-slate-700 mb-1.5">
                  Adresse e-mail
                </label>
                <input
                  type="email"
                  id="parent_email"
                  name="parent_email"
                  placeholder="samira.elamrani@gmail.com"
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition text-slate-800 placeholder-slate-400"
                />
                <p class="text-xs text-slate-400 mt-1.5">
                  Facultatif · Pour recevoir une copie de la demande.
                </p>
              </div>

              <!-- Submit Button and Price Section -->
              <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6">
                <button
                  id="sub"
                  type="submit"
                  class="w-full sm:w-auto px-8 py-3.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition duration-200 cursor-pointer"
                >
                  Soumettre la demande
                </button>
                <span id="total-price" class="font-bold text-cyan-700 text-lg text-center sm:text-right"></span>
              </div>

            </div>

          </div>
        </form>
      </div>
    </main>
  `;
});

classPage.addEventListener("click", ()=> {
    let courses  = JSON.parse(window.localStorage.getItem("courses"))
page.innerHTML = ""

  for (let i = 0; i < courses.length; i++) {
    console.log(courses[i].remainingSeats)
    page.innerHTML += `${courses[i].remainingSeats} <br>`
    
  }
  
})
// document.getElementById("page").innerHTML = ""